import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import styles from '../App.module.css'
import { Button, Input } from 'antd';

const Login = ({ isAuth, setIsAuth }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      if(response.data){
        localStorage.setItem('token', response.data.result.access_token);
        setIsAuth(true);
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      alert('Ошибка авторизации');
    }
  };
  useEffect(()=>{
    if(isAuth){
        navigate('/');
    }
  },[isAuth]);
  return (
    <form className={styles.FormLogin} onSubmit={handleSubmit}>
      <h2>Вход</h2>
      <Input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <Input name="password" type="password" placeholder="Пароль" onChange={handleChange} required />
      <Button htmlType="submit">Войти</Button>
      <Link to='/register'>Зарегестрироваться</Link>
    </form>
  );
};

export default Login;
