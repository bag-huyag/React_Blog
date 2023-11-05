import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import articleListReducer from './redux/store/articleListSlice';
import articleSliceReducer from './redux/store/articleSlice';
import userSliceReducer from './redux/store/userSlice';

const store = configureStore({
    reducer: {
        articleList: articleListReducer,
        article: articleSliceReducer,
        account: userSliceReducer,
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
