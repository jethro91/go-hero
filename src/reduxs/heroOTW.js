// Const
export const HERO_HELP_ASSIGN = 'HERO_HELP_ASSIGN';
export const HERO_HELP_REJECTED = 'HERO_HELP_REJECTED';
export const HERO_HELP_ACCEPTED = 'HERO_HELP_ACCEPTED';
export const HERO_HELP_SUCCESS = 'HERO_HELP_SUCCESS';

// Action Creators
export function getHelp(charId, charName, charImg) {
  const date = new Date();
  const requestID = date.valueOf();
  const newHero = {};
  return dispatch => {
    newHero[requestID] = {
      id: requestID,
      charId,
      imgPath: charImg,
      name: charName,
      status: 30,
      requestAt: date,
    };
    dispatch({
      type: HERO_HELP_ASSIGN,
      payload: newHero,
    });

    setTimeout(() => {
      if (requestID % 3 === 0) {
        // DUMMY CONDITION HERO REJECT
        newHero[requestID].status = 31;
        dispatch({
          type: HERO_HELP_REJECTED,
          payload: newHero,
        });
        return;
      }
      // HERO ACCEPT THE REQUEST
      newHero[requestID].status = 32;
      dispatch({
        type: HERO_HELP_ACCEPTED,
        payload: newHero,
      });
      setTimeout(() => {
        // DONE OFFER HELP
        newHero[requestID].status = 33;
        dispatch({
          type: HERO_HELP_SUCCESS,
          payload: newHero,
        });
      }, 15000);
    }, 10000);
  };
}

// Reducer
const initialState = {
  // status 30 = request, status 31 = reject , status 32 = progress, status 33 = success
  // 1510395198119: {
  //   id: 1510395198119,
  //   charId: 1017109,
  //   imgPath: 'http://i.annihil.us/u/prod/marvel/i/mg/a/03/523219743a99b.jpg',
  //   name: 'Natasha Romanov',
  //   status: 33,
  //   requestAt: new Date(),
  // },
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case HERO_HELP_ASSIGN: {
      return Object.assign({}, state, payload);
    }
    case HERO_HELP_REJECTED: {
      return Object.assign({}, state, payload);
    }
    case HERO_HELP_ACCEPTED: {
      return Object.assign({}, state, payload);
    }
    case HERO_HELP_SUCCESS: {
      return Object.assign({}, state, payload);
    }
    default: {
      return state;
    }
  }
}
