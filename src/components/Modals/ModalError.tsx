import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './ModalError.module.scss';

const ModalError = (props: any) => {
  return (
    <div
      className={`modal show ${styles.modal_error}`}
      style={{ display: 'block', position: 'initial' }}>
      <Modal.Dialog className={styles.modal_dialog}>
        <Modal.Body className='fs-1 text-secondary'>
          <p>
            “Oops, something went wrong. Please revisit the website with grace.”
          </p>
        </Modal.Body>

        <Modal.Footer className={styles.modal_footer}>
          <Button
            onClick={() => props.setShowModalAuthError(false)}
            variant='btn btn-primary btn-lg'>
            OK
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default ModalError;
