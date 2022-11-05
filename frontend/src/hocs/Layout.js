import React from 'react';
import NavigationBar from '../components/Navigationbar';

const Layout = (props) =>(
    <div>
        <NavigationBar />
        {props.children()}
    </div>
)

export default Layout;

