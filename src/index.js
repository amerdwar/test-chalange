import React from 'react';
import { render } from 'react-dom';
import './index.css';


import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './App';



//import reportWebVitals from './reportWebVitals';

// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
