const initialState = {
  model: {},
  loading: false,
};

function isHotdog(state = initialState, action) {
  switch (action.type) {
    case 'POST_IMAGE_REQUEST':
      return Object.assign({}, state, {
        loading: true,
      });
    case 'POST_IMAGE_SUCCESS':
      return Object.assign({}, state, {
        model: action.result,
        loading: false,
      });
    default:
      return state;
  }
}

export default isHotdog;
