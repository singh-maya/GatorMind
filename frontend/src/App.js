import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Register from './pages/Regsitration';
import Default from "./pages/Default";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Layout from './hocs/Layout';

import {Provider} from 'react-redux';
import store from './store';

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route exact path ='/' element = {<Default/>}/>
                    <Route path ='/home' element = {<Home/>}/>
                    <Route path ='/login' element = {<LoginPage/>}/>
                    <Route path ='/register' element = {<Register/>}/>
                    <Route path ='/Settings' element = {<Settings/>}/>
                    <Route path ='/Profile' element = {<Profile/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    </Provider>

)

export default App;
