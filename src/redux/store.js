import { applyMiddleware, configureStore } from '@reduxjs/toolkit';

import thunk from "redux-thunk";
import reducers from './reducers/index.js'
const store = configureStore({reducer:reducers},applyMiddleware({thunk})
);

export default store; 

