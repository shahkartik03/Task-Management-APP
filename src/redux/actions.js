import actions from "./actionType";

export const addNewItem = (itemName, id) => (dispatch) => {
  dispatch({ type: actions.CREATE_ITEM, payload: itemName });
};

export const addNewCard = (cardName, id) => (dispatch, getState) => {
  const { items } = getState();
  items.forEach((item) => {
    if (item.id === id) {
      if (!item.cards) {
        item.cards = [];
      }
      item.cards.push({ id: cardName.split(" ").join("_"), name: cardName });
    }
  });
  dispatch({ type: actions.ADD_CARD, payload: items });
};

export const deleteItem = (itemId) => (dispatch) => {
  dispatch({ type: actions.REMOVE_ITEM, payload: itemId });
};

export const deleteCard = (itemId, index) => (dispatch, getState) => {
  const { items } = getState();
  items.forEach((item) => item.id === itemId && item.cards.splice(index, 1));
  dispatch({ type: actions.REMOVE_CARD, payload: items });
};


export const dragCard = (dragEvent) => (dispatch, getState) => {
  const { items } = getState();
  let draggedCard;
  items.forEach((item) => {
    if (item.id === dragEvent.source.droppableId) {
      // draggedCard = item.cards.splice(dragEvent.source.index, 1);
      draggedCard = item.cards.filter((card, index) => index === dragEvent.source.index);
    }
  });
  items.forEach((item) => {
    if (item.id === dragEvent.source.droppableId) {
      draggedCard = item.cards.splice(dragEvent.source.index, 1);
    }
  });
  items.forEach((item) => {
    if (item.id === dragEvent.destination.droppableId) {
      if (!item.cards) {
        item.cards = [];
        item.cards.push(draggedCard[0]);
      } else {
        item.cards.splice(dragEvent.destination.index, 0, draggedCard[0]);
      }
    }
  });
  dispatch({ type: actions.UPDATE_CARD_STATUS, payload: items });
};
