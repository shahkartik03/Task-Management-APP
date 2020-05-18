# Task-Management-APP
Task Management APP is created using CRA. This is enabled with drag and drop features using `react-beautiful-dnd` package.

In order to demonstrate React-Redux, Redux Middleware and API integration, All crud operation are done using REST API calls.
CRUD also update redux store in order to showcase the usage of React Hooks, and React-Redux, Data is demonstrated by reading data from redux store.

Here I am using `json-server` which act as a backend server which holds data.
To run the project follow below steps in sequence.

1. run json project using command `npm run serve`.
2. run UI project using command `npm start`.

`json-server` is expected to run on port `3000`. If by chance it is running on any other port, kindly change port in the request object at 
`Task-Management-APP\ui\src\api\request.js`.


This Project is upgraded to `react-app-rewired` so as to update the `webpack` configs in `config-override.js` file.
Also this enables EsLint for the entire project.
