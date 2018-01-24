import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { Camera, Permissions, Font } from 'expo';

import { setImageURI, postImage } from '../store/items/actions';

export class CameraComp extends Component {
  state = {
    hasCameraPermission: null,
    fontLoaded: false,
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
          {this.state.fontLoaded && <Text style={ styles.header }>HOTDOG SLAYER</Text> }
          <TouchableOpacity onPress={() => this.takePicture()} style={{ borderRadius: 175, overflow: 'hidden' }} >
            <Camera style={ styles.camera }
                    type={ this.state.type }
                    ref={ ref => { this.camera = ref; }}
            >
            <View style={[ styles.container, { backgroundColor: 'transparent' } ]} >
              <Image source={require('../assets/crosshair.png')} style={{ width: 200, height: 200 }} />
            </View>
          </Camera>
        </TouchableOpacity>
          <View style={ styles.buttonWrapper }>
            {/* <Button
              color='blue'
              onPress={() => this.takePicture()}
              title='PEW PEW'
            /> */}
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    marginTop: 50,
    borderWidth: 1,
    borderColor: 'blue',
  },
  smallText: {
    fontSize: 18,
    color: 'blue',
  },
  camera: {
    height: 350,
    width: 350,
    borderRadius: 175,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  header: {
    fontSize: 32,
    backgroundColor: 'transparent',
    marginBottom: 20,
    fontFamily: 'Frontman',
    color: 'pink'
  }
});

const mapStateToProps = (state) => ({
  uri: state.photoURI.uri,
});

const mapDispatchToProps = (dispatch) => ({
  postImage: image => dispatch(postImage(image)),
  setImageURI: uri => dispatch(setImageURI(uri)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CameraComp);
