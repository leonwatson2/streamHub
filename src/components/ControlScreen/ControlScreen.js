import React, { useState, useContext } from 'react';
import {
  RESET_WINS,
  INCREMENT_WINS,
  CHANGE_CHRISTMAS,
  DARK_MODE,
  GAME_IMAGE_URL
} from '../../Events';

import { Card, Button, Col, Row } from 'react-materialize';
import Input from 'react-materialize/lib/Input';
import socketContext from '../../Provider';
import CurrentKanji from '../kanji/CurrentKanji';
import KanjiAnswers from '../kanji/KanjiAnswers';
import WinsCounter from './WinsCounter';
import DisplayText from './DisplayText';

export default function ControlScreen(props) {
  const [selectedLight, setSelectedLight] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const state = useContext(socketContext);

  const updateImageUrl = () => {
    props.socket.emit(GAME_IMAGE_URL, imageUrl);
  };
  const changeImageUrl = newUrl => {
    setImageUrl(newUrl);
  };
  const selectLight = light => () => {
    setSelectedLight(light);
  };
  const toggleLight = light => {
    props.socket.emit('LIGHT_TOGGLE', light.id, light.state.on);
  };
  const changeChristmasSizeBig = value => () => {
    props.socket.emit(CHANGE_CHRISTMAS, value);
  };
  const updateColor = () => {
    if (selectedLight)
      props.socket.emit('LIGHT_COLOR', selectedLight.id, [+red, +green, +blue]);
  };
  const changeDarkMode = (value = false) => () => {
    props.socket.emit(DARK_MODE, value);
  };
  const { lights, isBigChristmas, isDarkMode, gameImageUrl } = state;
  return (
    <div className='container control-container'>
      <h1 className='white-text'>Control Screen</h1>
      <Row>
        <Col l={6} m={12}>
          <Col l={6} m={6}>
            <WinsCounter />
          </Col>
          <Col l={6} m={6}>
            <DisplayText />
          </Col>

          <Col l={6}>
            <Card textClassName={'white-text'} title={`Kanji List`}>
              <CurrentKanji controlScreen={true} />
              <KanjiAnswers controlScreen={true} />
            </Card>
          </Col>
          <Col l={12}>
            <iframe
              src='https://player.twitch.tv/?channel=LFurLeon'
              height='400'
              width='100%'
              frameBorder='0'
              scrolling='true'
              allowfullscreen='false'
            />
          </Col>
        </Col>
        <Col m={12} l={6}>
          <iframe
            frameBorder='0'
            scrolling='yes'
            id='lfurleon'
            src='https://www.twitch.tv/embed/lfurleon/chat?darkpopout'
            height='600'
            width='100%'
          />
        </Col>
        <Col m={6}>
          <iframe
            src='https://streamlabs.com/dashboard/recent-events'
            width='100%'
            height='600'
            frameBorder='0'
            allowtransparency='true'
            allow='encrypted-media'
          />
        </Col>
      </Row>
      <Row>
        <Col m={6}>
          <iframe
            src='https://open.spotify.com/embed/user/spotify/playlist/37i9dQZEVXcOiMl8U2QTWW'
            width='100%'
            height='600'
            frameBorder='0'
            allowtransparency='true'
            allow='encrypted-media'
          />
        </Col>

        <Col m={6}>
          <Card
            textClassName={'white-text'}
            title={`Current Game URL: ${gameImageUrl}`}
          >
            <textarea onChange={event => changeImageUrl(event.target.value)} />
            <Button key='reset' onClick={updateImageUrl}>
              Update Image Url
            </Button>
            ,
          </Card>
        </Col>
        <Col m={6}>
          <Card title={`Lights: ${selectedLight ? selectedLight.name : ''}`}>
            {lights.map(l => (
              <button
                key={l.id}
                className={`btn ${'btn-outline'}`}
                onClick={selectLight(l)}
              >
                {l.name}
              </button>
            ))}

            <Button
              floating
              icon='wb_sunny'
              onClick={() => toggleLight(selectedLight)}
            />
            <Row>
              <Input
                type='number'
                s={4}
                label='red'
                onChange={({ target }) => setRed(target.value)}
              />
              <Input
                type='number'
                s={4}
                label='green'
                onChange={({ target }) => setGreen(target.value)}
              />
              <Input
                type='number'
                s={4}
                label='blue'
                onChange={({ target }) => setBlue(target.value)}
              />
            </Row>
            <Button onClick={updateColor}>Update Color</Button>
          </Card>
        </Col>

        <Col m={6}>
          <Card textClassName={'white-text'} title={`Change Christmas`}>
            <Button
              disabled={isBigChristmas}
              onClick={changeChristmasSizeBig(true)}
            >
              Make Big
            </Button>
            <Button
              disabled={!isBigChristmas}
              onClick={changeChristmasSizeBig(false)}
            >
              Make Small
            </Button>
          </Card>
        </Col>
        <Col m={6}>
          <Card textClassName={'white-text'} title={`Change To Dark Mode`}>
            <Button disabled={!isDarkMode} onClick={changeDarkMode(false)}>
              Light Mode
            </Button>
            <Button disabled={isDarkMode} onClick={changeDarkMode(true)}>
              Dark Mode
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
