import React, { Component } from 'react';
import { withRouter } from 'react-router';
import io from 'socket.io-client';
import request from 'request';

const socketUrl = 'http://192.168.0.105:3231';

export class Spotify extends Component {
  static propTypes = {};
  constructor() {
    super();
    this.state = {
      socket: null,
      song: null,
      access_token: null
    };
  }
  componentDidMount() {
    this.initSocket();
    let hashArray = this.props.location.hash.slice(1).split('&');
    let hashObject = hashArray.reduce((all, part) => {
      return {
        ...all,
        [part.split('=')[0]]: part.split('=')[1]
      };
    }, {});
    this.setState({ access_token: hashObject.access_token });
    getCurrentlyPlaying(hashObject.access_token, res => {
      const song = res.item;
      const duration = song.duration_ms;
      const progress = res.progress_ms;
      this.setCurrentSong(song);
      if (duration > progress)
        setTimeout(() => {
          this.updateSong();
        }, duration - progress);
    });
  }
  updateSong = () => {
    const { access_token } = this.state;
    if (access_token) {
      getCurrentlyPlaying(access_token, res => {
        if (!res.item) return;
        console.log(res);
        const song = res.item;
        const duration = song.duration_ms;
        const progress = res.progress_ms;
        this.setCurrentSong(song);
        if (duration > progress)
          setTimeout(() => {
            this.updateSong();
          }, duration - progress);
      });
    }
  };
  setCurrentSong = song => {
    this.setState({ song });
    this.state.socket.emit('CURRENT_SONG', song);
  };
  initSocket = () => {
    const socket = io(socketUrl);

    this.setState({ socket });
  };
  render() {
    const { song } = this.state;
    return (
      <div>
        <h2>Spotify</h2>
        <i
          className='material-icons'
          onClick={this.updateSong}
          style={{ color: 'black' }}
        >
          music_note
        </i>
        {song && (
          <div>
            <h2>
              {song.name} - {song.artists[0].name}
            </h2>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Spotify);

function getCurrentlyPlaying(access_token, cb) {
  var options = {
    url: 'https://api.spotify.com/v1/me/player/currently-playing',
    headers: { Authorization: 'Bearer ' + access_token },
    json: true
  };
  console.log('Requesting');
  // use the access token to access the Spotify Web API
  request.get(options, function(error, response, body) {
    console.log('Got it', body, error);
    if (error) {
      console.log(error);
    } else {
      cb(body);
    }
  });
}
