import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const K_WIDTH = 20;
const K_HEIGHT = 20;

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  border: '1px solid #FFFF00',
  borderRadius: K_HEIGHT,
  backgroundColor: 'blue',
  textAlign: 'center',
  color: '#FFFF00',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4
};

// @ts-ignore
const AnyReactComponent = (props: { lat: number, lng: number, text:string }) => <div style={greatPlaceStyle}>{props.text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '65vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBEBKFCaUXt3sUYcd91VauZjaEoi9uiiGA" }}
          defaultCenter={{
            lat: 43.6756834,
            lng: -79.4102601
          }}
          defaultZoom={19}
        >
        
        <AnyReactComponent
            lat={43.6756834}
            lng={-79.4102601}
            text=""
        />

        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;