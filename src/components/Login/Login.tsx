import styles from './Login.module.scss';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ModalErrorContainer from '../Modals/ModalErrorContainer';

const Login = (props: any) => {
  const changeEmail: any = React.createRef();
  const changePassword: any = React.createRef();

  return (
    <div className={styles.login_page}>
      {props.isShowModalError ? <ModalErrorContainer /> : null}

      <Form className={styles.form}>
        <Form.Group className='mb-3 fs-1' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            ref={changeEmail}
            onInput={() =>
              props.loginPageEmail({ email: changeEmail.current.value })
            }
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
              props.loginPagePassword({
                password: changePassword.current.value,
              })
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
