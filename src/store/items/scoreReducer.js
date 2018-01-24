const initialState = {
  points: 0,
  lastScore: 0,
}

function score(state = initialState, action) {
  switch (action.type) {
    case 'POST_IMAGE_SUCCESS':
      var lastScore = 0;
      if (action.result.what === 'hotdog') {
        lastScore = Math.floor(Math.random() * 100000);
      } else {
        lastScore = Math.floor(Math.random() * -15000);
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
