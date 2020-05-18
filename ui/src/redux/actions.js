import actions from "./actionType";
import { addItem, addRemoveCard, removeItem } from "../api/request";

// All the action are updating redux-store and also calling rest api to create / update data
export const addNewItem = (itemName, id) => (dispatch) => {
  dispatch({ type: actions.API_INTERACTION_ERR, payload: "" });
  dispatch({ type: actions.CREATE_ITEM, payload: itemName });
  const newItem = {
    id: itemName.split(" ").join("_"),
    name: itemName,
  };
  addItem(newItem)
    .then((res) => {
      console.log("res ", res);
    })
    .catch((err) => {
      dispatch({ type: actions.API_INTERACTION_ERR, payload: err });
    });
};

export const addNewCard = (cardName, id) => (dispatch, getState) => {
  dispatch({ type: actions.API_INTERACTION_ERR, payload: "" });
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
  addRemoveCard(items.filter((item) => item.id === id)[0])
    .then((res) => {
      console.log("res ", res);
    })
    .catch((err) => {
      dispatch({ type: actions.API_INTERACTION_ERR, payload: err });
    });
};

export const deleteItem = (itemId) => (dispatch) => {
  dispatch({ type: actions.API_INTERACTION_ERR, payload: "" });
  dispatch({ type: actions.REMOVE_ITEM, payload: itemId });
  removeItem(itemId)
    .then((res) => {
      console.log("res ", res);
    })
    .catch((err) => {
      dispatch({ type: actions.API_INTERACTION_ERR, payload: err });
    });
};

export const deleteCard = (itemId, index) => (dispatch, getState) => {
  dispatch({ type: actions.API_INTERACTION_ERR, payload: "" });
  const { items } = getState();
  items.forEach((item) => item.id === itemId && item.cards.splice(index, 1));
  dispatch({ type: actions.REMOVE_CARD, payload: items });
  addRemoveCard(items.filter((item) => item.id === itemId)[0])
    .then((res) => {
      console.log("res ", res);
    })
    .catch((err) => {
      dispatch({ type: actions.API_INTERACTION_ERR, payload: err });
    });
};


export const dragCard = (dragEvent) => (dispatch, getState) => {
  dispatch({ type: actions.API_INTERACTION_ERR, payload: "" });
  const { items } = getState();
  let draggedCard;
  /* items.forEach((item) => {
    if (item.id === dragEvent.source.droppableId) {
      // draggedCard = item.cards.splice(dragEvent.source.index, 1);
      draggedCard = item.cards.filter((card, index) => index === dragEvent.source.index);
    }
  }); */
  items.forEach((item) => {
    if (item.id === dragEvent.source.droppableId) {
      draggedCard = item.cards.splice(dragEvent.source.index, 1);
    }
  });
  addRemoveCard(items.filter((item) => item.id === dragEvent.source.droppableId)[0])
    .then((res) => {
      console.log("res ", res);
    })
    .catch((err) => {
      dispatch({ type: actions.API_INTERACTION_ERR, payload: err });
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
  addRemoveCard(items.filter((item) => item.id === dragEvent.destination.droppableId)[0])
    .then((res) => {
      console.log("res ", res);
    })
    .catch((err) => {
      dispatch({ type: actions.API_INTERACTION_ERR, payload: err });
    });
  dispatch({ type: actions.UPDATE_CARD_STATUS, payload: items });
};
