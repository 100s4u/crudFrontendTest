import React, { useEffect, useState } from 'react';
import { createComment } from '../api';
import { Button, List } from 'antd';
import styles from '../App.module.css'
import Editor from 'react-simple-wysiwyg';

const Comments = ({id, comments, isChanged, setIsChanged, me}) => {
  const [text, setText] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await createComment( id, { text });
        setIsChanged(!isChanged);
        setText('');
      } catch (error) {
        console.error('Ошибка создания поста:', error);
        alert('Ошибка при создании комментария');
      }
    };
  
  return (
      <div className={styles.Comments}>
        <h2>Комментарии: </h2>
        <List
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={(comment) => (
              <List.Item>
                  <List.Item.Meta
                    title={<h3>{me.id===comment.author.id && 'ОП: '}{comment.author.name}</h3>}
                    description={<p><span dangerouslySetInnerHTML={{ __html: `${comment.text}`}}></span></p>}
                  />
              </List.Item>
            )}
          />
        <form onSubmit={handleSubmit}>
          <Editor value={text} onChange={(e) => setText(e.target.value)} placeholder="Содержание" />
          <Button className={styles.right} type="primary" htmlType='submit'>Оставить комментарий</Button>
        </form>
      </div>
  )
}

export default Comments