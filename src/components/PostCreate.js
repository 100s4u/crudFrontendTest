import React, { useState } from 'react';
import { createPost } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from 'antd';
import Editor from 'react-simple-wysiwyg';
import styles from '../App.module.css'

const PostCreate = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({ title, text });
      alert('Пост создан');
      navigate('/');
    } catch (error) {
      console.error('Ошибка создания поста:', error);
      alert('Ошибка при создании поста');
    }
  };

  return (
    <div className={styles.Form}>
      <div className={styles.Title}>
          <h2>Создать пост</h2>
          <Button><Link to="/">К постам</Link></Button>
      </div>
      <form onSubmit={handleSubmit}>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Заголовок" required />
        <Editor value={text} onChange={(e) => setText(e.target.value)} placeholder="Содержание" />
        <Button type="primary" htmlType='submit'>Создать</Button>
      </form>
    </div>
  );
};

export default PostCreate;
