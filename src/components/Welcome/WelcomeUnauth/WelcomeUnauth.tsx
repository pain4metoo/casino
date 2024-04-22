import styles from './WelcomeUnauth.module.scss';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const WelcomeUnauth = (props: any) => {
  function handleInputEmail(e: React.FormEvent<HTMLInputElement>): void {
    const target = e.currentTarget;

    props.changeEmail({ email: target.value });
  }

  function handleInputLogin(e: React.FormEvent<HTMLInputElement>): void {
    const target = e.currentTarget;

    props.changeLogin({ login: target.value });
  }

  function handleInputPassword(e: React.FormEvent<HTMLInputElement>): void {
    const target = e.currentTarget;

    props.changePassword({ password: target.value });
  }

  return (
    <Form className={styles.form}>
      <Form.Group className='mb-3 fs-1'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          onInput={handleInputEmail}
          value={props.email}
          className='fs-3'
          type='email'
          placeholder='Enter email'
        />
      </Form.Group>

      <Form.Group className='mb-3 fs-1'>
        <Form.Label>Nickname</Form.Label>
        <Form.Control
          onInput={handleInputLogin}
          value={props.login}
          className='fs-3'
          placeholder='Enter nickname'
        />
      </Form.Group>

      <Form.Group className='mb-3 fs-1' controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={props.password}
          onInput={handleInputPassword}
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
      {props.errorTextRegister ? (
        <div
          className={`${styles.alert_error} alert alert-danger`}
          role='alert'>
          {props.errorTextRegister}
        </div>
      ) : null}
    </Form>
  );
};

export default WelcomeUnauth;
