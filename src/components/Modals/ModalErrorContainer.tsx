import { connect } from 'react-redux';
import { setShowModalAuthError } from '../../redux/auth-reducer';
import ModalError from './ModalError';

const ModalErrorContainer = (props: any) => {
  return <ModalError {...props} />;
};

const mapStateToProps = (state: any) => {
  return {};
};

export default connect(mapStateToProps, {
  setShowModalAuthError,
})(ModalErrorContainer);
