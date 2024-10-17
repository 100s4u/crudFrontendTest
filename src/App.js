import React, { useEffect, useState } from 'react';
import styles from './App.module.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Posts from './components/Posts';
import PostView from './components/PostView';
import PostCreate from './components/PostCreate';
import PostEdit from './components/PostEdit';
import HeaderComp from './components/Header';


function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [me, setMe] = useState({});

  useEffect(()=>{
    if(localStorage.getItem('token')){
      setIsAuth(true);
    }
  }, [localStorage]);


  return (
    <div className={styles.App}>
      <Router>
        <HeaderComp
          isAuth={isAuth}
          setIsAuth={setIsAuth}
          me={me}
          setMe={setMe}
          />
        <div className={styles.Wrapper}>
          <Routes>
            <Route path="/register" element={<Register isAuth={isAuth} setIsAuth={setIsAuth} />} />
            <Route path="/login" element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />} />
            <Route path="/" exec element={isAuth ? <Posts isAuth={isAuth} me={me} /> : <Navigate to="/login" />} />
            <Route path="/create" element={isAuth ? <PostCreate /> : <Navigate to="/login" />} />
            <Route path="/edit/:id" element={isAuth ? <PostEdit /> : <Navigate to="/login" />} />
            <Route path="/view/:id" element={<PostView me={me}  />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;