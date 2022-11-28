import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { PostContextProvider } from './contexts/PostContext';

import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Footer } from './components/footer/Footer';
import { Posts } from './components/posts/Posts';
import { Create } from './components/create-edit/Create';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <PostContextProvider>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/posts' element={<Posts />} />
            <Route path='/create' element={<Create />} />
          </Routes>
          <Footer />
        </PostContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
