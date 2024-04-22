import styles from './Login.module.scss';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ModalErrorContainer from '../Modals/ModalErrorContainer';

const Login = (props: any) => {
  function handleInputEmail(e: React.FormEvent<HTMLInputElement>): void {
    const target = e.currentTarget;

    props.loginPageEmail({ email: target.value });
  }

  function handleInputPassword(e: React.FormEvent<HTMLInputElement>): void {
    const target = e.currentTarget;

    props.loginPagePassword({ password: target.value });
  }

  return (
    <div className={styles.login_page}>
      {props.isShowModalError ? <ModalErrorContainer /> : null}

      <Form className={styles.form}>
        <Form.Group className='mb-3 fs-1' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onInput={handleInputEmail}
            className='fs-3'
            value={props.email}
            type='email'
            placeholder='Enter email'
          />
        </Form.Group>

        <Form.Group className='mb-3 fs-1' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            onInput={handleInputPassword}
            value={props.password}
            className='fs-3'
            type='password'
            placeholder='Password'
          />
        </Form.Group>
        <Button
          onClick={() => props.loginUserThunk(props.email, props.password)}
          className='fs-3'
          size='lg'
          variant='primary'
          type='button'>
          login
        </Button>
        {props.errorTextLogin ? (
          <div
            className={`${styles.alert_error} alert alert-danger`}
            role='alert'>
            {props.errorTextLogin}
          </div>
        ) : null}
      </Form>
    </div>
  );
};

export default Login;
