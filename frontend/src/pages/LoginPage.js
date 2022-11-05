import { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { login } from '../actions/auth';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LoginPage = ({login}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formData;

    const onChange = e =>setFormData({...formData, [e.target.name] : e.target.value});
    const onSubmit = e => {
        e.preventDefault();

        login(email, password)
    };

    // is the user auth
    // redirect to home page
  return (
    <div className = "color-overlay d-flex justify-content-center align-items-center">
          <Form className={"rounded p-4 p-sm-3"} onSubmit={e=>onSubmit(e)}>
              <h1>Sign In</h1>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  placeholder = "Enter Email"
                  type = "text"
                  name = 'email'
                  value = {email}
                  onChange = {e=>onChange(e)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                      type = "password"
                      name = "password"
                      placeholder = "Enter Password"
                      value = {password}
                      onChange = {e=>onChange(e)}
                   />
              </Form.Group>

              <Button>
                Login
              </Button>
              <p>Don't have an account? <Link to={'/register'}>Sign up</Link></p>{''}
          </Form>

      </div>
  );
};
/*
const mapStateToProps = state => ({

})
*/


export default connect(null, { })(LoginPage);
