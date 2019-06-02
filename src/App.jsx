import React, { Component } from "react";
import { Container, Dropdown } from "react-bootstrap";
import SongSearch from "./components/SongSearch";
import { Lyric } from "./components/Lyric";
import { History } from "./components/History";
import { addLyrics } from "./components/Add";
import {Route} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lyrics: "",
      title: "",
      history: []
    };
  }

  callbackFromSongSearch = (title, lyrics, artist, song) => {
    const newHistory = this.state.history;

    newHistory.push({ artist: artist, song: song });

    this.setState({
      history: newHistory,
      title,
      lyrics
    });
  };

  render() {
    return (
      <Container>
        <h1>Lyrics App</h1>
        <SongSearch toApp={this.callbackFromSongSearch} /> 
        <Dropdown.Divider />
        <Lyric song={this.state.song} lyrics={this.state.lyrics} />
        <History history={this.state.history} />
       

      </Container>
    );
  }
}

export default App;
