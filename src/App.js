import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';

const particlesOptions = {
    particles: {
      number: {
        value: 70,
        density: {
          enable: true,
          value_area: 800
        }
      }
    }
  
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

onInputChange = (event) => {
  console.log(event.target.value);
}

onSubmit = () => {
  console.log('submit');
}


  render() {
    return (
      <div className="App">
            <Particles className='particles'
                params={particlesOptions} 
                />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onChange={this.onInputChange} onSubmit={this.onSubmit}/>
        {/*
        <FaceRecogntion /> */}
      </div>
    );
  }
}

export default App;
