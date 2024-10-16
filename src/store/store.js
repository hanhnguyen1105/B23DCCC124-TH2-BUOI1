// src/store/store.js
import { createStore, combineReducers } from 'redux';
import todoReducer from '../reducers/todoReducer';
import imageSearchReducer from '../reducers/imageSearchReducer';
import randomColorReducer from '../reducers/randomColorReducer';

// Kết hợp các reducer
const rootReducer = combineReducers({
    todos: todoReducer,
    imageSearch: imageSearchReducer,
    randomColor: randomColorReducer,
});

// Tạo store
const store = createStore(rootReducer);

export default store;
