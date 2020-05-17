import actions from "./actionType";

export const initState = {
  items: [
    /* {
            id: 'To_Do',
            name: 'To Do',
            cards: [
                {
                    id: 'card_1',
                    name: 'card 1',
                },
                {
                    id: 'card_2',
                    name: 'card 2',
                },
                {
                    id: 'card_3',
                    name: 'card 3',
                },
            ]
        },
        {
            id: 'In_Progress',
            name: 'In Progress',
            cards: [
                {
                    id: 'card_11',
                    name: 'card 11',
                },
                {
                    id: 'card_22',
                    name: 'card 22',
                },
                {
                    id: 'card_33',
                    name: 'card 33',
                },
            ]
        }, */
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
        items: action.payload,
      };
    case actions.ADD_CARD:
      return {
        items: JSON.parse(JSON.stringify(action.payload)),
      };
    case actions.REMOVE_ITEM:
      return {
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case actions.REMOVE_CARD:
      return {
        items: JSON.parse(JSON.stringify(action.payload)),
      };
    default:
      return state;
  }
}
