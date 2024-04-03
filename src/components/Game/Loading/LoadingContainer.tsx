import { connect } from 'react-redux';
import Loading from './Loading';
import {
  loadDataAction,
  setDataAction,
  setEndLoadData,
} from '../../../redux/loading-reducer';
import { setGenerateDefauldField } from '../../../redux/game-reducer';

const mapStateToProps = (state: any) => {
  return {
    isLoadData: state.loading.isLoadData,
    isEndLoadData: state.loading.isEndLoadData,
    loadField: state.loading.loadField,
    data: state.loading.data,
  };
};

export default connect(mapStateToProps, {
  setDataAction,
  loadDataAction,
  setGenerateDefauldField,
  setEndLoadData,
})(Loading);
