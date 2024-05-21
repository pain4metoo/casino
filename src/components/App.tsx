import styles from './App.module.scss';
import { Route, Routes } from 'react-router-dom';
import HeaderContainer from './Header/HeaderContainer';
import WelcomeContainer from './Welcome/WelcomeContainer';
import GameContainer from './Game/GameContainer';
import LoginContainer from './Login/LoginContainer';
import Footer from './Footer/Footer';

const App = () => {
  return (
    <div className={styles.wrapper}>
      <HeaderContainer />
      <div className={styles.main}>
        <Routes>
          <Route path='/' element={<WelcomeContainer />} />
          <Route path='/casino/login' element={<LoginContainer />} />
          <Route path='/casino/game' element={<GameContainer />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
