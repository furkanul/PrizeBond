import {createStore} from 'redux';

export const initialState = {
  bondSerials: [
  ],
  totalBondSerials: 0,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      if (
        0 in
        state['bondSerials'].filter((i) =>
          i.bondSerial.includes(action.bondSerial),
        )
      ) {
        return state;
      } else {
        return {
          ...state,
          totalBondSerials: state.totalBondSerials + 1,
          bondSerials: [
            ...state['bondSerials'],
            {
              key: Date.now().toString() + action.bondSerial,
              bondSerial: action.bondSerial,
            },
          ],
        };
      }

    case 'DELETE':
      return {
        ...state,
        totalBondSerials: state.totalBondSerials - 1,
        bondSerials: state['bondSerials'].filter((d) => d !== action.item),
      };

    default:
      return state;
  }
};
