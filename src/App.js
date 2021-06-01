import React, { Component } from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';

const app = new Clarifai.App({
  apiKey: '5bb5417a478343909ef766110fed2e4f'
 });

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
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignin: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }

  }


  displayFaceBox = (box) => {
    this.setState({box: box});
  }

onInputChange = (event) => {
  this.setState({input: event.target.value})
}

onSubmit = () => {
  this.setState({imageUrl: this.state.input});

  app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
  .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
  .catch(err => console.log(err));
}

onRouteChange = (route) => {
  if(route === 'signout') {
    this.setState({isSignin: false})
  } else {
    this.setState({isSignin: true})
  }
  this.setState({route: route})
}


  render() {
    const {isSignin, imageUrl, route, box} = this.state
    return (
      <div className="App">
      
          <Particles className='particles'
          params={particlesOptions} 
          />
        <Navigation isSignin={isSignin} onRouteChange={this.onRouteChange}/>
        { route === 'home' 
          ? 
          <div>
          <Logo />
          <Rank />
          <ImageLinkForm onChange={this.onInputChange} onSubmit={this.onSubmit}/>
          <FaceRecognition box={box} imageUrl={imageUrl}/>
        </div>
        : (
          route === 'signin' ? 
          <Signin onRouteChange={this.onRouteChange}/>
          :
          <Register onRouteChange={this.onRouteChange} />
        )

          
          
        
      }
      </div>
    );
  }
}

export default App;


