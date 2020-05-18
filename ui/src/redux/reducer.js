import actions from "./actionType";

export const initState = {
  fetchingErr: "",
  items: [
  ],
};

export function reducer(state = initState, action) {
  switch (action.type) {
    case actions.CREATE_ITEM:
      return {
        ...state,
        items: state.items.concat(
          {
            id: action.payload.split(" ").join("_"),
            name: action.payload,
          },
        ),
      };
    case actions.UPDATE_CARD_STATUS:
      return {
        ...state,
        items: action.payload,
      };
    case actions.ADD_CARD:
      return {
        ...state,
        items: JSON.parse(JSON.stringify(action.payload)),
      };
    case actions.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case actions.REMOVE_CARD:
      return {
        ...state,
        items: JSON.parse(JSON.stringify(action.payload)),
      };
    case actions.API_INTERACTION_ERR:
      return {
        ...state,
        fetchingErr: action.payload,
      }
    default:
      return state;
  }
}
