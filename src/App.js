import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { PostContextProvider } from './contexts/PostContext';

import { Header } from './components/header/Header';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Footer } from './components/footer/Footer';
import { Posts } from './components/posts/Posts';
import { Create } from './components/posts/create-edit/Create';
import { PostDetails } from './components/posts/post-details/PostDetails';
import { UserProfile } from './components/user-profile/UserProfile';
import { UserContextProvider } from './contexts/UserContext';
import { Chat } from './components/chat/Chat';
import { Messanger } from './components/chat/Messanger';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <PostContextProvider>
          <UserContextProvider>
            <Header />
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/profile/:userId' element={<UserProfile />} />
              <Route path='/messages/:chatId' element={<Chat />} />
              <Route path='/messages' element={<Messanger />} />
              <Route path='/posts' element={<Posts />} />
              <Route path='/posts/:postId' element={<PostDetails />} />
              <Route path='/create' element={<Create />} />
            </Routes>
            <Footer />
          </UserContextProvider>
        </PostContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
