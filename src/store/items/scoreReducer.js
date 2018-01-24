const initialState = {
  points: 0,
  lastScore: 0,
}

function score(state = initialState, action) {
  switch (action.type) {
    case 'POST_IMAGE_SUCCESS':
      var lastScore = 0;
      if (action.result.what === 'hotdog') {
        lastScore = Math.floor(Math.random() * 150);
      } else {
        lastScore = Math.floor(Math.random() * -15);
      }
      return Object.assign({}, state, {
        points: state.points + lastScore,
        lastScore: lastScore,
      });
    default:
      return state;
  }
}

export default score;
