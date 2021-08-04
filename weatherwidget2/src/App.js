import { Typography } from '@material-ui/core';
import React from 'react';
import './App.css';
import WeatherComponent from './customComponents/WeatherComponent';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
    };
  }

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude })
    });
  }

  render() {
    const { latitude, longitude } = this.state;
    return (
      <div className="App">
        {latitude === null ? <Typography >Loading</Typography> :
          <WeatherComponent location={{ latitude: latitude, longitude: longitude }} />
        }
      </div>
    );
  }
}



export default App