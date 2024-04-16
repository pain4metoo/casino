import { connect } from 'react-redux';
import Loading from './Loading';
import {
  loadDataAction,
  setDataAction,
  setEndLoadData,
  setVideoSettings,
} from '../../../redux/loading-reducer';
import { setGenerateDefauldField } from '../../../redux/game-reducer';

const LoadingContainer = (props: any) => {
  return <Loading {...props} />;
};

const mapStateToProps = (state: any) => {
  return {
    isLoadData: state.loading.isLoadData,
    isEndLoadData: state.loading.isEndLoadData,
    loadField: state.loading.loadField,
    gameData: state.loading.gameData,
  };
};
export default connect(mapStateToProps, {
  setDataAction,
  loadDataAction,
  setVideoSettings,
  setGenerateDefauldField,
  setEndLoadData,
})(LoadingContainer);
