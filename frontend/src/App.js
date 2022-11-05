import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Register from './pages/Regsitration';
import Activate from './pages/Activate'
import Layout from './hocs/Layout';

import {Provider} from 'react-redux';
import store from './store';
import Default from "./pages/Default";

const App = () => (
    <Provider store={store}>
        <BrowserRouter>

            <Routes>
                <Route exact path ='/' element = {<Default/>}/>
                <Route path ='/home' element = {<Home/>}/>
                <Route path ='/login' element = {<LoginPage/>}/>
                <Route path ='/register' element = {<Register/>}/>
                <Route path ='/activate/:uid/:token' element = {<Activate/>}/>
            </Routes>

        </BrowserRouter>
    </Provider>

)

export default App;
