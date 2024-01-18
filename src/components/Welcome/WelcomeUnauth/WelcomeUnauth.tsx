import styles from './WelcomeUnauth.module.scss';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const WelcomeUnauth = (props: any) => {
  const newEmail: any = React.createRef();
  const newPassword: any = React.createRef();
  const newNickname: any = React.createRef();

  return (
    <Form className={styles.form}>
      <Form.Group className='mb-3 fs-1'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          ref={newEmail}
          onInput={() => props.changeEmailAction(newEmail.current.value)}
          value={props.email}
          className='fs-3'
          type='email'
          placeholder='Enter email'
        />
      </Form.Group>

      <Form.Group className='mb-3 fs-1'>
        <Form.Label>Nickname</Form.Label>
        <Form.Control
          ref={newNickname}
          onInput={() => props.changeLoginAction(newNickname.current.value)}
          value={props.login}
          className='fs-3'
          placeholder='Enter nickname'
        />
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
      <Button
        onClick={() =>
          props.registerUserThunk(props.email, props.password, props.login)
        }
        className='fs-3'
        size='lg'
        variant='primary'
        type='button'>
        register
      </Button>
    </Form>
  );
};

export default WelcomeUnauth;
