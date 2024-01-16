import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = (props: any) => {
  const changeLogin: any = React.createRef();
  const changePassword: any = React.createRef();

  return (
    <Form>
      <Form.Group className='mb-3 fs-1' controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          ref={changeLogin}
          onInput={() => props.changeLoginAction(changeLogin.current.value)}
          className='fs-3'
          value={props.login}
          type='email'
          placeholder='Enter email'
        />
        <Form.Text className='text-muted'>
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className='mb-3 fs-1' controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          ref={changePassword}
          onInput={() =>
            props.changePasswordAction(changePassword.current.value)
          }
          value={props.password}
          className='fs-3'
          type='password'
          placeholder='Password'
        />
      </Form.Group>
      <Form.Group className='mb-3 fs-3' controlId='formBasicCheckbox'>
        <Form.Check type='checkbox' label='Check me out' />
      </Form.Group>
      <Button
        onClick={() =>
          props.loginUserThunk(
            changeLogin.current.value,
            changePassword.current.value,
          )
        }
        className='fs-3'
        variant='primary'
        type='button'>
        login
      </Button>
    </Form>
  );
};

export default Login;
