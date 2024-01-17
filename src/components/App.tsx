import { Route, Routes } from 'react-router-dom';
import HeaderContainer from './Header/HeaderContainer';
import WelcomeContainer from './Welcome/WelcomeContainer';
import GameContainer from './Game/GameContainer';
import ProfileContainer from './Profile/ProfileContainer';
import ScoreContainer from './Score/ScoreContainer';
import LoginContainer from './Login/LoginContainer';

const App = () => {
  return (
    <div className='app'>
      <HeaderContainer />

      <Routes>
        <Route path='/' element={<WelcomeContainer />} />
        <Route path='/login' element={<LoginContainer />} />
        <Route path='/game' element={<GameContainer />} />
        <Route path='/profile' element={<ProfileContainer />} />
        <Route path='/score' element={<ScoreContainer />} />
      </Routes>
    </div>
  );
};

export default App;
