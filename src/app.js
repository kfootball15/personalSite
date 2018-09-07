import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

import AppRouter from './routers/AppRouter.js';
import configureStore from './store/configureStore';

//Actions
import { setProjectData } from './actions/projects'

//Init Store:
const store = configureStore();
store.subscribe(()=>{
    console.log('Store State', store, store.getState())
})

//Set Data to store:
store.dispatch(setProjectData());

//Render DOM:
ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>
, document.getElementById('app'));
