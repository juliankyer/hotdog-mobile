function photoURI(state = {}, action) {
  console.log(action);
  switch (action.type) {
    case 'NEW_URI':
      return Object.assign({}, state, {
        image: action.image,
      });
    case 'RESET_IMAGE':
      return Object.assign({}, state, {
        image: {},
      });
    default:
      return state;
  }
}

export default photoURI;
