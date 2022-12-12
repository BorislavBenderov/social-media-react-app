import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { PostContextProvider } from './contexts/PostContext';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Footer } from './components/footer/Footer';
import { Posts } from './components/posts/Posts';
import { CreatePost } from './components/posts/create-edit/CreatePost';
import { PostDetails } from './components/posts/post-details/PostDetails';
import { UserProfile } from './components/user-profile/UserProfile';
import { UserContextProvider } from './contexts/UserContext';
import { Chat } from './components/chat/Chat';
import { Messanger } from './components/chat/Messanger';
import { HeaderLayout } from './components/react-router/HeaderLayout';
import { ProtectedRoutes } from './components/react-router/ProtectedRoutes';
import { EditUser } from './components/user-profile/EditUser';
import { EditPost } from './components/posts/create-edit/EditPost';
import { UserFollowers } from './components/user-profile/UserFollowers';
import { UserFollowing } from './components/user-profile/UserFollowing';
import { PostLikes } from './components/posts/likes/PostLikes';
import { Users } from './components/users/Users';
import { NotFound } from './components/not-found/NotFound';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <PostContextProvider>
          <UserContextProvider>
            <Routes>
            <Route path='*' element={<NotFound />} />
              <Route element={<ProtectedRoutes />}>
                <Route element={<HeaderLayout />}>
                  <Route path='/profile/:userId' element={<UserProfile />} />
                  <Route path='/followers/:userId' element={<UserFollowers />} />
                  <Route path='/following/:userId' element={<UserFollowing />} />
                  <Route path='/edit/profile/:userId' element={<EditUser />} />
                  <Route path='/messages/:chatId' element={<Chat />} />
                  <Route path='/messages' element={<Messanger />} />
                  <Route path='/posts' element={<Posts />} />
                  <Route path='/users' element={<Users />} />
                  <Route path='/posts/:postId' element={<PostDetails />} />
                  <Route path='/likes/:postId' element={<PostLikes />} />
                  <Route path='/edit/posts/:postId' element={<EditPost />} />
                  <Route path='/create' element={<CreatePost />} />
                </Route>
              </Route>
              <Route path='/' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes>
            <Footer />
          </UserContextProvider>
        </PostContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
