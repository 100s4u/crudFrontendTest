import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, deletePost } from '../api';
import { Button, List, Popconfirm, Spin } from 'antd';
import { DeleteOutlined, EditOutlined, MessageOutlined, LoadingOutlined } from '@ant-design/icons';
import styles from '../App.module.css'
import DOMPurify from 'dompurify';

const Posts = ({ isAuth, me }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data.result);
      } catch (error) {
        console.error('Ошибка при загрузке постов:', error);
        if (error.response && error.response.status === 401) {
          //localStorage.clear();
          //navigate('/login');
        }
      }
    };

    if (isAuth) {
      fetchPosts();
    }
  }, [isAuth]);

  console.log(posts)

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении поста:', error);
    }
  };

  return (
    <div>
      <div className={styles.Title}>
        <h2>Посты</h2>
        {isAuth && <Button><Link to="/create">Создать новый пост</Link></Button>}
      </div>
        {posts.length>0?
        <List
          itemLayout="horizontal"
          dataSource={posts}
          renderItem={(post) => (
              <List.Item
              actions={post.author.id === me.id && [
                <Button color="primary" variant="text"><Link to={`/edit/${post.id}`}><EditOutlined /></Link></Button>,
                <Popconfirm
                  title="Вы уверены что хотите удалить этот пост?"
                  okText="Да"
                  cancelText="Нет"
                  onConfirm={()=>{handleDelete(post.id)}}
                >
                  <Button color="danger" variant="text" ><DeleteOutlined /></Button>
                </Popconfirm>,
              ]}
              >
                  <List.Item.Meta
                  title={<Link to={`/view/${post.id}`}><h2>{post.name}</h2></Link>}
                  description={<p><span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.text.substring(0, 100))}}></span><span><MessageOutlined style={{margin: '0 1em'}} />{post.comments.length}</span></p>}
                  />
                  
              </List.Item>
          )}
        />:
        <div className={styles.Preloader}>
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>}
    </div>
  );
};

export default Posts;
