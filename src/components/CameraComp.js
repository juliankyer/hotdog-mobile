import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { Camera, Permissions, Font } from 'expo';

import { setImageURI, postImage } from '../store/items/actions';

export class CameraComp extends Component {
  state = {
    hasCameraPermission: null,
    fontLoaded: false,
    zoom: 0,
  }

  async compnentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Frontman': require('../assets/fonts/Frontman.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  convertImage(photo) {
    const formData = new FormData();
    formData.append('file', {
      uri: photo.uri,
      type: 'image/jpeg',
      name: 'upload.jpg',
    });
    return formData;
  }

  async takePicture() {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      console.log(photo.uri);
      this.props.setImageURI(photo);
      this.props.postImage(this.convertImage(photo));
    }
  }

  toggleZoom() {
    if (this.state.zoom === 1) {
      this.setState({zoom: 0})
    } else {
      this.setState({zoom: this.state.zoom + 0.5})
    }
  }

  render() {
    const { hasCameraPermission, displayPhoto } = this.state;

    if (hasCameraPermission === false) {
      return (
        <View style={{ flex: 1 }}>
          <Image source={require('../assets/snoop-dooog.jpg')}
                 resizeMode="repeat"
                 style={ styles.background }
          />
          { this.state.fontLoaded && <Text>No access to camera</Text> }
        </View>
      );
    } else {
      return (
        <View style={[ styles.container, { borderWidth: 1 } ]}>

          { this.state.fontLoaded && <Text style={ styles.header }>HOTDOG SLAYER</Text> }

          <TouchableOpacity onPress={() => this.takePicture()} style={{ borderRadius: 175, overflow: 'hidden',  borderWidth: 2, borderColor: 'purple'  }} >
            <Camera style={ styles.camera }
                    type={ this.state.type }
                    zoom={ this.state.zoom }
                    ref={ ref => { this.camera = ref; }}
            >
              <View style={{ backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center'}} >
                <Image source={require('../assets/target.png')} style={{ width: 240, height: 240 }} />
              </View>
            </Camera>
          </TouchableOpacity>

          <Button onPress={() => this.toggleZoom() } title='Zoom' />

          <View style={ styles.instructions }>
            { this.state.fontLoaded && <Text style={ styles.instructionsText }>Tap those crosshairs!</Text> }
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  smallText: {
    fontSize: 18,
    color: 'blue',
  },
  camera: {
    height: 350,
    width: 350,
    borderRadius: 175,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  header: {
    fontSize: 32,
    backgroundColor: 'purple',
    marginBottom: 20,
    fontFamily: 'Frontman',
    color: 'pink',
    width: '100%',
    textAlign: 'center',
    padding: 5,
    paddingTop: 28,
  },
  instructions: {
    backgroundColor: 'purple',
    padding: 8,
    paddingBottom: 14,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionsText: {
    fontFamily: 'Frontman',
    fontSize: 18,
    color: 'pink',
  },
});

const mapStateToProps = (state) => ({
  uri: state.photoURI.uri,
});

const mapDispatchToProps = (dispatch) => ({
  postImage: image => dispatch(postImage(image)),
  setImageURI: uri => dispatch(setImageURI(uri)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CameraComp);
