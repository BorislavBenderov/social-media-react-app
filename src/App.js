import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Footer } from './components/footer/Footer';
import { Posts } from './components/Posts/Posts';

function App() {
  return (
    <div className="App">
      <Posts />
      <Footer />
    </div>
  );
}

export default App;
