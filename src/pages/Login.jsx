import React, { useContext, useState } from 'react';
import '../style/login.css';
import { Container, Row, Col, Form,  FormGroup, Button } from 'reactstrap';
import {Link, useNavigate} from "react-router-dom";
import loginImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';
import { AuthContext } from '../context/AuthContext';
import { API_URL } from '../utils/config';


// login
const Login = () => {


  const [credentials , setCredentials] = useState({
    email : undefined,
    password:undefined,
    
});


const {dispatch} = useContext(AuthContext);
const navigate = useNavigate();



  const handleChange = (event) => {
    setCredentials(prev => ({...prev,[event.target.id]:event.target.value}))
}

const handleClick = async event => {
  event.preventDefault();
dispatch({type: 'LOGIN_START'})
  try {
const res = await fetch(`${API_URL}/api/auth/login`, {
  method : 'post',
    headers:{
      'content-type':'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(credentials)
});

const result = await res.json();

if(!res.ok) {
  alert(result.message);
}

console.log(result.data);
dispatch({type: 'LOGIN_SUCCESS', payload:result.data})
navigate('/');

  } catch(err) {

dispatch({type: 'LOGIN_FAILURE', payload:err.message});

  } 
}


  return<section>
    <Container>
      <Row>
        <Col lg='8' className='m-auto'>
          <div className="login__container d-flex justify-content-between">
            <div className="login__img">
              <img src={loginImg} alt="login" />
            </div>


            <div className="login__form">
              <div className="user">
                <img src={userIcon} alt="n" />
              </div>
              <h2>login</h2>
              <Form onSubmit={handleClick}>
                <FormGroup>
                  <input type="email" placeholder='Email' required id='email' onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                  <input type="password" placeholder='Password' required id='password' onChange={handleChange} />
                </FormGroup>

                <Link to='/forgot-password' >
                  Forgot password?
                </Link>
                <Button className='btn secondary__btn auth__btn' type='submit'>Login</Button>
              </Form>
              <p>Don't have an account? <Link to='/register'>Create</Link></p>
            </div>
          </div>

        </Col>
      </Row>
    </Container>
  </section>
}

export default Login;
