import styles from './App.module.scss';
import { Route, Routes } from 'react-router-dom';
import HeaderContainer from './Header/HeaderContainer';
import WelcomeContainer from './Welcome/WelcomeContainer';
import GameContainer from './Game/GameContainer';
import ProfileContainer from './Profile/ProfileContainer';
import ScoreContainer from './Score/ScoreContainer';
import LoginContainer from './Login/LoginContainer';
import Footer from './Footer/Footer';

const App = () => {
  return (
    <div className={styles.wrapper}>
      <HeaderContainer />
      <div className={styles.main}>
        <Routes>
          <Route path='/' element={<WelcomeContainer />} />
          <Route path='/login' element={<LoginContainer />} />
          <Route path='/game' element={<GameContainer />} />
          <Route path='/profile' element={<ProfileContainer />} />
          <Route path='/score' element={<ScoreContainer />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
