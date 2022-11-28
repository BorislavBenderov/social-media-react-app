import { Routes, Route } from 'react-router-dom';

import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Footer } from './components/footer/Footer';
import { Posts } from './components/Posts/Posts';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/posts' element={<Posts />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
