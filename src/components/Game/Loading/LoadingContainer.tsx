import { connect } from 'react-redux';
import Loading from './Loading';
import {
  setLoadData,
  setEndLoadData,
  loadingThunk,
} from '../../../redux/loading-reducer';
import { setGenerateDefauldField } from '../../../redux/game-reducer';
import { useEffect } from 'react';

const LoadingContainer = (props: any) => {
  useEffect(() => {
    if (!props.isEndLoadData) {
      props.loadingThunk();
    }
  }, []);

  return <Loading {...props} />;
};

const mapStateToProps = (state: any) => {
  return {
    isShowPreloader: state.loading.isShowPreloader,
    isShowLoadProgress: state.loading.isShowLoadProgress,
    isEndLoadData: state.loading.isEndLoadData,
    loadProgress: state.loading.loadProgress,
  };
};

export default connect(mapStateToProps, {
  loadingThunk,
  setLoadData,
  setEndLoadData,
  setGenerateDefauldField,
})(LoadingContainer);
