import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

class SongSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: "",
      song: "",
      lyrics: "",
      title: "",
      loading: false,
      showForm: false
    };
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  submitForm2 = (event) => {
    event.preventDefault();

    const BODY = {
      artist: this.state.artist,
      title: this.state.title,
      lyrics: this.state.lyrics
    }
    const FETCH_URL = "http://localhost:8080/lyrics";
    fetch(FETCH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(BODY)
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          proposals: [
            ...this.state.proposals,
            {
              id: json.id,
              artist: json.artist,
              title: json.title,
              lyrics: json.lyrics

            }
          ],
          title: '', artist: '', lyrics: '', showForm: false
          
        })
      })
      .catch(error => console.error('catch response', error))

  }

  submitForm = event => {
    event.preventDefault();

    this.setState({ loading: true });

    console.log('STATE', this.state);

    const artist = this.state.artist;
    const song = this.state.song;

    artist.replace(' ', '%20');
    song.replace(' ', '%20');

    const FETCH_URL = "http://localhost:8080/lyrics/" + artist + "/" + song;

    fetch(FETCH_URL, {
      method: "GET"
    })
      .then(response => response.json())
      .then(json => {
        let lyrics;

        if (json.lyrics) {
          lyrics = json.lyrics;
        } else if (json.error) {
          lyrics = "Letra no encontrada";
        }
        this.props.toApp(artist + " - " + song, lyrics, this.state.artist, this.state.song);
        this.setState({ loading: false });
      });

      fetch(this.fetchURL(), {
        method: "GET"
      })
        .then(response => response.json())
        .then(json => {
          let lyrics;
          console.log('LETRA', json.lyrics);
          if (json.lyrics) {
            lyrics = json.lyrics;
           
          } else if (json.error) {
            lyrics = "Letra no encontrada";
          }
          this.props.toApp(artist + " - " + song, lyrics, this.state.artist, this.state.song);
          this.setState({ loading: false });
        });
    

  };
  fetchURL = () => {
    console.log('STATE', this.state);

    const artist1 = this.state.artist;
    const title1 = this.state.song;
    const FETCH_URL = "http://localhost:8080/lyrics/";
    let url = FETCH_URL + "?";
  
    url += "&artist=" + artist1 +"&title=" + title1;


    return url
};


  render() {
    return (
      <div>
        <Form onSubmit={this.submitForm}  >
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Artista</Form.Label>
                <Form.Control name="artist" onChange={this.changeHandler}
                  value={this.state.artist} required type="text" placeholder="Introduce nombre de artista" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Canción</Form.Label>
                <Form.Control name="song" onChange={this.changeHandler}
                  value={this.state.song} required type="text" placeholder="Introduce nombre de canción" />
              </Form.Group>
            </Col>
          </Row>
          <Button disabled={this.state.loading} variant="outline-light" type="submit">
            {this.state.loading ? 'Buscando...' : 'Buscar letra'}
          </Button>
        </Form>
        
        
        <Form onSubmit={this.submitForm2}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Artista</Form.Label>
                <Form.Control name="artist" onChange={this.changeHandler}
                  value={this.state.artist} required type="text" placeholder="Introduce nombre de artista" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Canción</Form.Label>
                <Form.Control name="title" onChange={this.changeHandler}
                  value={this.state.title} required type="text" placeholder="Introduce nombre de canción" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>letras</Form.Label>
                <Form.Control name="lyrics" onChange={this.changeHandler}
                  value={this.state.lyrics} required type="text" placeholder="Introduce letra de canción" />
              </Form.Group>
            </Col>
          </Row>
          <Button disabled={this.state.loading}  variant="outline-light" type="submit">
            {this.state.loading ? 'Añadiendo...' : 'Añadir letra'}
            
          </Button>
        </Form>
      </div>
    );
  }
}

export default SongSearch;
