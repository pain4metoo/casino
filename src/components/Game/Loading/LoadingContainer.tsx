import { connect } from 'react-redux';
import Loading from './Loading';
import { setLoadData, setEndLoadData } from '../../../redux/loading-reducer';
import { setGenerateDefauldField } from '../../../redux/game-reducer';

const LoadingContainer = (props: any) => {
  return <Loading {...props} />;
};

const mapStateToProps = (state: any) => {
  return {
    isLoadData: state.loading.isLoadData,
    isEndLoadData: state.loading.isEndLoadData,
  };
};
export default connect(mapStateToProps, {
  setLoadData,
  setEndLoadData,
  setGenerateDefauldField,
})(LoadingContainer);
