import React, { useEffect, useState } from 'react';
import { registerUser } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../App.module.css'
import { Button, Input } from 'antd';

const Register = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      localStorage.setItem('token', response.data.result.access_token);
      setIsAuth(true);
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Ошибка регистрации');
    }
  };

  return (
    <form className={styles.FormLogin} onSubmit={handleSubmit}>
      <h2>Регистрация</h2>
      <Input name="name" type="text" placeholder="Имя пользователя" onChange={handleChange} required />
      <Input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <Input name="password" type="password" placeholder="Пароль" onChange={handleChange} required />
      <Input name="password_confirmation" type="password" placeholder="Пароль" onChange={handleChange} required />
      <Button htmlType="submit">Зарегистрироваться</Button>
      <Link to='/login'>Авторизоваться</Link>
    </form>
  );
};

export default Register;
