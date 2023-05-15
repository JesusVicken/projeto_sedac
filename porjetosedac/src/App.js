//CSS
import './App.css';

//rotas do react
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'

//firebase
import { onAuthStateChanged } from 'firebase/auth'; //mapeia a auth do usuário com sucesso

//hooks
import { useEffect, useState } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

//context
import { AuthProvider } from './context/AuthContext';

//pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';
import Search from './pages/Search/Search';
import Post from './pages/Post/Post';


//components
import Footer from './components/Footer';
import Navbar from './components/Navbar';





function App() {

  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/search' element={<Search />} />
              <Route path='/post/id:' element={<Post />} />
              <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path='/register' element={!user ? <Register /> : <Navigate to="/" />} />
              <Route path='/posts/create' element={user ? <CreatePost /> : <Navigate to="/login" />} />
              <Route path='dashboard' element={user ? <Dashboard /> : <Navigate to="/login" />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;