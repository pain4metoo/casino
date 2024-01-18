import styles from './Login.module.scss';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = (props: any) => {
  const changeEmail: any = React.createRef();
  const changePassword: any = React.createRef();

  return (
    <Form className={styles.form}>
      <Form.Group className='mb-3 fs-1' controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          ref={changeEmail}
          onInput={() => props.loginPageEmailAction(changeEmail.current.value)}
          className='fs-3'
          value={props.email}
          type='email'
          placeholder='Enter email'
        />
      </Form.Group>

      <Form.Group className='mb-3 fs-1' controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          ref={changePassword}
          onInput={() =>
            props.loginPagePasswordAction(changePassword.current.value)
          }
          value={props.password}
          className='fs-3'
          type='password'
          placeholder='Password'
        />
      </Form.Group>
      <Button
        onClick={() =>
          props.loginUserThunk(
            changeEmail.current.value,
            changePassword.current.value,
          )
        }
        className='fs-3'
        size='lg'
        variant='primary'
        type='button'>
        login
      </Button>
    </Form>
  );
};

export default Login;
