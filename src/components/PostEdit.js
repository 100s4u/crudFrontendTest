import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { updatePost, getPostById } from '../api';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Input } from 'antd';
import Editor from 'react-simple-wysiwyg';
import styles from '../App.module.css'

const PostEdit = () => {
  const { id } = useParams(); // Получаем ID поста из URL
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(id);
        console.log(response)
        setTitle(response.data.result.name);
        setText(response.data.result.text);
      } catch (error) {
        console.error('Ошибка загрузки поста:', error);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost( id, { title, text });
      alert('Пост обновлен');
      navigate('/'); // Перенаправление после успешного редактирования
    } catch (error) {
      console.error('Ошибка редактирования поста:', error);
      alert('Ошибка при редактировании');
    }
  };
  return (
    <div className={styles.Form}>
      <div className={styles.Title}>
          <h2>Редактировать пост</h2>
          <Button><Link to="/">К постам</Link></Button>
      </div>
      <form onSubmit={handleSubmit}>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Заголовок" required />
        <Editor value={text} onChange={(e) => setText(e.target.value)} placeholder="Содержание" />
        <Button type="primary" htmlType='submit'>Изменить</Button>
      </form>
    </div>
  );
};

export default PostEdit;
