export function postImageSuccess(result) {
  return {
    type: 'POST_IMAGE_SUCCESS',
    result,
  };
}

export function postImageRequest() {
  return {
    type: 'POST_IMAGE_REQUEST',
  };
}

export function postImageFailure(result) {
  return {
    type: 'POST_IMAGE_FAILURE',
    result,
  };
}

export function postImage(formData) {
  return function(dispatch) {
    // const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    const apiURL = 'http://hotdog.local:5000'
    // const apiURL = 'https://hotdog-server-team07.herokuapp.com';

    dispatch(postImageRequest());
    fetch(`${apiURL}/is_hotdog`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(response => {
        dispatch(postImageSuccess(response));
      })
      .catch(error => {
        console.log(error);
        dispatch(postImageFailure(error));
      });
  };
}

export function setImageURI(image) {
  return {
    type: 'NEW_URI',
    image,
  };
}

export function resetImage() {
  return {
    type: 'RESET_IMAGE',
  }
}
