import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, Animated } from 'react-native';
import { Camera, Permissions, Font } from 'expo';

import CameraComp from './CameraComp';
import {resetImage} from '../store/items/actions';

export class AppWrapper extends React.Component {
  state = {
    fontLoaded: false,
    blink: new Animated.Value(0),
  };

  async componentDidMount() {
    await Font.loadAsync({
      'Frontman': require('../assets/fonts/Frontman.ttf'),
    });

    this.setState({ fontLoaded: true });

    Animated.timing(
      this.state.blink,
      {
        toValue: 1,
        duration: 100,
      }
    ).start();
  }

  goHome() {
    this.props.resetImage();
  }

  renderResult(result) {
    if (result === 'hotdog') {
      return 'SLAYERRR! THAT\'S A HOTDOG';
    } else {
      return 'Better luck next time, noob';
    }
  }

  renderLoading() {
    if (!this.props.loading) {
      return (
        <Animated.View style={ [styles.resultWrapper, { opacity: this.state.blink}] }>
          {this.state.fontLoaded &&
            <Text style={ styles.result }>Analyzing</Text>}
        </Animated.View>
      )
    } else {
      return (
        <View style={styles.resultWrapper }>
          {this.props.model && this.state.fontLoaded &&
            <Text style={ styles.result }>{this.renderResult(this.props.model.what)}</Text>}
        </View>
      )
    }
  }

  render() {
    if (this.props.image && this.props.image.uri) {
      const { uri, height, width } = this.props.image;

      return (
        <View style={ styles.container }>

          <Image source={require('../assets/snoop-dooog.jpg')}
                 resizeMode="repeat"
                 style={ styles.background }
          />

          { this.renderLoading() }

          <Image source={{ uri: uri }} style={styles.preview}/>

          <TouchableOpacity style={ styles.button }>
            <Text style={ styles.buttonText } onPress={() => this.goHome()}>Respawn</Text>
          </TouchableOpacity>

        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Image source={require('../assets/snoop-dooog.jpg')}
                 resizeMode="repeat"
                 style={ styles.background }
          />
          <CameraComp />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallText: {
    fontSize: 18,
    color: 'white',
  },
  preview: {
    width: 350,
    height: 350,
    marginBottom: 30,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  result: {
    fontFamily: 'Frontman',
    backgroundColor: 'transparent',
    fontSize: 18,
  },
  resultWrapper: {
    backgroundColor: 'purple',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    padding: 7,
  },
  button: {
    padding: 10,
    backgroundColor: 'red',
  },
  buttonText: {
    fontFamily: 'Frontman',
    fontSize: 30,
  }
});

const mapStateToProps = (state) => ({
  loading: state.isHotdog.loading,
  model: state.isHotdog.model,
  image: state.photoURI.image,
});

const mapDispatchToProps = (dispatch) => ({
  sendImage: image => dispatch(postImage(image)),
  resetImage: () => dispatch(resetImage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);
