import React, {
  useEffect,
  useContext,
  useReducer,
  lazy,
  Suspense
} from 'react';
import { Route } from 'react-router-dom';
import { AppReducer, INITIAL_STATE } from './App.reducer';
import { ThemeProvider } from 'styled-components';
import SocketContext, { Provider } from './Provider';
import { theme } from './styled-components';
import { createSocketEvent } from './func';
import * as Events from './Events';
import io from 'socket.io-client';
import './styles/night-scene.scss';

import Dashboard from './components/Dashboard';
import Text from './components/Text';
import ControlScreen from './components/ControlScreen/ControlScreen';
import ShoutoutContainer from './components/ShoutoutContainer';
import ObsScreen from './components/fullScreens/ObsScreen';
import ObsCamScreen from './components/fullScreens/ObsCamScreen';
import WitchRoom from './components/fullScreens/WitchRoom';
import ParticlesScreen from './components/fullScreens/ParticlesScreen';
import ChristmasScene from './components/christmas/ChristmasScene';
import { Spotify } from './components/Spotify/Spotify';
import CurrentSong from './components/Spotify/CurrentSong';
import Timer from './components/Timer';
import WebcamOutline from './components/outlines/WebcamOutline';
import SleepyBear from './components/SleepyBear';
import PictureGame from './components/PictureGame/PictureGame';
import Greetings from './components/TypistsComponents/Greetings';
import CurrentKanji from './components/kanji/CurrentKanji';
import KanjiAnswers from './components/kanji/KanjiAnswers';

const socketUrl = 'http://192.168.0.107:3231';

export const App = props => {
  const [state, dispatch] = useReducer(AppReducer, INITIAL_STATE);
  useEffect(() => {
    initSocket();
  }, []);

  /*
   *	Connect to and initializes the socket.
   */
  function initSocket() {
    const socket = io(socketUrl);
    const setSocketEvent = createSocketEvent(socket, dispatch);

    setSocketEvent('connect', () => {
      dispatch({ type: Events.SOCKET_CHANGE, payload: true });
    });
    setSocketEvent('disconnect', () => {
      dispatch({ type: Events.SOCKET_CHANGE, payload: false });
    });
    setSocketEvent(Events.NEW_FOLLOWER);
    setSocketEvent(Events.MOST_RECENT_SUBSCRIBER);
    setSocketEvent(Events.ALL_TIME_TOP_CHEERS);
    setSocketEvent(Events.ALL_TIME_DONO);
    setSocketEvent(Events.TEXT_CHANGE);
    setSocketEvent(Events.TODAYS_WINS);
    setSocketEvent(Events.CHANGE_CHRISTMAS);
    setSocketEvent(Events.DARK_MODE);
    setSocketEvent(Events.GAME_IMAGE_URL);
    setSocketEvent(Events.LIGHTS);
    setSocketEvent(Events.CURRENT_KANJI);
    setSocketEvent(Events.ANSWER_COUNTS);
    dispatch({ type: Events.SOCKET_CHANGE, payload: socket });
  }

  const currentLabels = [
    { title: 'Latest Follower', value: state.latestFollower },
    {
      title: 'Latest Subscriber',
      value: state.recentSubscriber,
      isGoal: false
    },
    { title: 'Top Cheerer', value: state.allTimeCheer },
    { title: 'Top Dono', value: state.allTimeDono }
  ];
  return (
    <ThemeProvider theme={theme(state.isDarkMode || true)}>
      <Provider value={state}>
        <div className='my-container'>
          <Route exact path='/' component={ControlScreenSocket} />
          <Route
            exact
            path='/dashboard'
            render={props => (
              <Dashboard
                {...props}
                socket={state.socket}
                connected={state.connected}
              />
            )}
          />
          <Route
            exact
            path='/obs'
            render={props => (
              <ObsScreen
                {...props}
                socket={state.socket}
                labels={currentLabels}
                wins={state.wins}
              />
            )}
          />
          <Route
            exact
            path='/text'
            render={props => <Text text={state.text} />}
          />
          <Suspense fallback={'Hello'}>
            <Route
              component={lazy(() =>
                import('./components/ForniteVids/TwitchVids')
              )}
              exact
              path='/multitwitch'
            />
          </Suspense>
          <Route component={ObsCamScreen} exact path='/mainscreen' />
          <Route
            exact
            path='/shoutouts'
            render={props => <ShoutoutContainer labels={currentLabels} />}
          />
          <Route exact path='/witch' component={WitchRoom} />
          <Route
            exact
            path='/christmas'
            render={props => <ChristmasScene isBig={state.isBigChristmas} />}
          />
          <Route exact path='/spotify' component={Spotify} />
          <Route exact path='/outline' component={WebcamOutline} />
          <Route exact path='/currentsong' component={CurrentSong} />
          <Route exact path='/timer' component={Timer} />
          <Route exact path='/sleepybear' component={SleepyBear} />
          <Suspense fallback={'Hello'}>
            <Route
              exact
              path='/nightscene'
              component={lazy(() =>
                import('./components/fullScreens/NightScene')
              )}
            />
          </Suspense>
          <Route exact path='/currentkanji' component={CurrentKanji} />
          <Route exact path='/answercards' component={KanjiAnswers} />
          <Route
            exact
            path='/picturegame'
            render={props => (
              <PictureGameSocket imageUrl={state.gameImageUrl} />
            )}
          />
          <Route
            exact
            path='/particles'
            render={props => <ParticlesScreen imageUrl={state.gameImageUrl} />}
          />
          <Route
            exact
            path='/typist/greeting'
            render={props => <Greetings />}
          />
        </div>
      </Provider>
    </ThemeProvider>
  );
};
export const withSocket = ComposedComponent => {
  return props => {
    const { socket } = useContext(SocketContext);
    return <ComposedComponent socket={socket} {...props} />;
  };
};

const ControlScreenSocket = withSocket(ControlScreen);
const PictureGameSocket = withSocket(PictureGame);

export default App;
