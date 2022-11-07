import React, { useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from "axios";
import {signup} from "../actions/auth";

const Register =  ({signup, isAuthenticated}) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
      email : '',
      first_name: '',
      last_name: '',
      password: '',
      c_password: ''
    });
    const{email, first_name, last_name, password, c_password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e =>{
      e.preventDefault();

      if(password === c_password){
          signup(first_name, last_name, email, password, c_password);
          setAccountCreated(true);
      }
    }

    if (isAuthenticated) {
        return <Navigate to='/' />
    }
    if (accountCreated) {
        return <Navigate to='/login' />
    }


  return (
      <div className = "color-overlay d-flex justify-content-center align-items-center">
      <Form className={"rounded p-4 p-sm-3"} onSubmit={e => onSubmit(e)}>
          <h1>Register</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              placeholder="Enter Email"
              type="email"
              name = "email"
              onChange={e => onChange(e)}
              value = {email}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              className="firstName"
              placeholder="Enter First Name"
              name = "first_name"
              onChange={e => onChange(e)}
              value = {first_name}
              type="text"
            />
          </Form.Group>

           <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              className="lastName"
              placeholder="Enter Last Name"
              name = "last_name"
              onChange={e => onChange(e)}
              value = {last_name}
              type="text"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                  type="password"
                  id="password"
                  name = "password"
                  onChange={e => onChange(e)}
                  value = {password}
                  placeholder="Enter Password"
                  required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                  type="password"
                  id="password"
                  name = "c_password"
                  onChange={e => onChange(e)}
                  value = {c_password}
                  placeholder="Confirm Password"
                  required />
          </Form.Group>

          <Button>
            Submit
          </Button>
      </Form>
      </div>
  );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Register);
