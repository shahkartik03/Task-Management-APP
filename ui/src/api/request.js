import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 60000,
  headers: {
    "content-type": "application/json",
  },
});

// Not using this method for now, as ll the data in app is fetched from redux-store
export function getMaxAllowedCount() {
  return request({
    url: "maxCountItem",
    method: "get",
  });
}
export function getItems() {
  return request({
    url: "items",
    method: "get",
  });
}

// All methods below this are posting/updating data on server from actions
export function addItem(item) {
  return request({
    url: "items",
    method: "post",
    data: item,
  });
}

export function addRemoveCard(item) {
  return request({
    url: `items/${item.id}`,
    method: "put",
    data: item,
  });
}

export function removeItem(itemId) {
  return request({
    url: `items/${itemId}`,
    method: "delete",
  });
}
