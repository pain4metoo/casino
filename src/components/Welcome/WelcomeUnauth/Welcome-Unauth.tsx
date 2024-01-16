import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const WelcomeUnauth = (props: any) => {
  const newLoginText: any = React.createRef();
  const newPassword: any = React.createRef();

  return (
    <Form>
      <Form.Group className='mb-3 fs-1' controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          ref={newLoginText}
          onInput={() => props.changeLoginAction(newLoginText.current.value)}
          value={props.login}
          className='fs-3'
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
          ref={newPassword}
          value={props.password}
          onInput={() => props.changePasswordAction(newPassword.current.value)}
          className='fs-3'
          type='password'
          placeholder='Password'
        />
      </Form.Group>
      <Form.Group className='mb-3 fs-3' controlId='formBasicCheckbox'>
        <Form.Check type='checkbox' label='Check me out' />
      </Form.Group>
      <Button
        onClick={() => props.registerUserThunk(props.login, props.password)}
        className='fs-3'
        variant='primary'
        type='button'>
        register
      </Button>
    </Form>
  );
};

export default WelcomeUnauth;
