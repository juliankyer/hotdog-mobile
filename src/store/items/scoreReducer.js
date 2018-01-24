const initialState = {
  points: 0,
}

function score(state = initialState, action) {
  switch (action.type) {
    case 'POST_IMAGE_SUCCESS':
      var score = state.points;
      if (action.result.what === 'hotdog') {
        score = score + 500;
      } else {
        score = score - 50;
      }
      return Object.assign({}, state, {
        points: score,
      });
    default:
      return state;
  }
}

export default score;
