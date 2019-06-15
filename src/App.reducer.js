import * as Events from './Events';

export const INITIAL_STATE = {
  socket: null,
  connected: false,
  latestFollower: '',
  recentSubscriber: '',
  allTimeCheer: '',
  isBigChristmas: true,
  text: 'Starting Stream',
  allTimeDono: '',
  wins: '',
  lights: [],
  isDarkMode: false,
  gameImageUrl: false,
  currentKanji: null,
  answerCounts: {}
};
export const AppReducer = (state, action) => {
  switch (action.type) {
    case Events.SOCKET_CHANGE:
      return {
        ...state,
        socket: action.payload
      };
    case Events.CONNECTION_CHANGE:
      return {
        ...state,
        connected: action.payload
      };
    case Events.NEW_FOLLOWER:
      return {
        ...state,
        latestFollower: action.payload
      };
    case Events.MOST_RECENT_SUBSCRIBER:
      return {
        ...state,
        recentSubscriber: action.payload
      };
    case Events.ALL_TIME_TOP_CHEERS:
      return {
        ...state,
        allTimeCheer: action.payload
      };
    case Events.ALL_TIME_DONO:
      return {
        ...state,
        allTimeDono: action.payload
      };
    case Events.TEXT_CHANGE:
      return {
        ...state,
        text: action.payload
      };
    case Events.TODAYS_WINS:
      return {
        ...state,
        wins: action.payload
      };
    case Events.CHANGE_CHRISTMAS:
      return {
        ...state,
        isBigChristmas: action.payload
      };
    case Events.DARK_MODE:
      return {
        ...state,
        isDarkMode: action.payload
      };
    case Events.GAME_IMAGE_URL:
      return {
        ...state,
        gameImageUrl: action.payload
      };
    case Events.LIGHTS:
      return {
        ...state,
        lights: action.payload
      };
    case Events.CURRENT_KANJI:
      return {
        ...state,
        currentKanji: action.payload
      };
    case Events.ANSWER_COUNTS:
      return {
        ...state,
        answerCounts: action.payload
      };
    default:
      return state;
  }
};
