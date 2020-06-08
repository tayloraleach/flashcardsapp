export const ADD_CARD_STACK = 'ADD_CARD_STACK';
export const UPDATE_CARD_STACK = 'UPDATE_CARD_STACK';
export const DELETE_CARD_STACK = 'DELETE_CARD_STACK';

const initialState = {
  cardStacks: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CARD_STACK:
      return {
        ...state,
        cardStacks: [...state.cardStacks, action.payload.cardStack],
      };
    case DELETE_CARD_STACK:
      return {
        ...state,
        cardStacks: state.cardStacks.filter(value => {
          return value.id !== action.payload.cardStack.id;
        }),
      };
    case UPDATE_CARD_STACK:
      const updatedStack = action.payload.cardStack;
      const existingStacks = [...state.cardStacks];
      for (let x = 0; x < existingStacks.length; x++) {
        if (existingStacks[x].id === updatedStack.id) {
          existingStacks[x] = updatedStack;
        }
      }
      return {
        ...state,
        cardStacks: existingStacks,
      };
    default:
      return state;
  }
}

export function addCardStack(cardStack) {
  return {
    type: ADD_CARD_STACK,
    payload: {
      cardStack,
    },
  };
}

export function updateCardStack(cardStack) {
  return {
    type: UPDATE_CARD_STACK,
    payload: {
      cardStack,
    },
  };
}

export function deleteCardStack(cardStack) {
  return {
    type: DELETE_CARD_STACK,
    payload: {
      cardStack,
    },
  };
}
