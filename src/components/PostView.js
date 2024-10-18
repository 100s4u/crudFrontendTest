import React, { useState, useEffect } from 'react';
import { getPostById, deletePost } from '../api';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from '../App.module.css'
import { Button, Popconfirm, Spin } from 'antd';
import { LoadingOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Comments from './Comments';
import DOMPurify from 'dompurify';

const PostView = ({me}) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const [isChanged, setIsChanged] = useState(false);

  
  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      navigate('/');
    } catch (error) {
      console.error('Ошибка при удалении поста:', error);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(id);
        setPost(response.data.result);
      } catch (error) {
        console.error('Ошибка загрузки поста:', error);
      }
    };
    fetchPost();
  }, [id, isChanged]);

  console.log(post)

  if (!post) {
    return (
    <div className={styles.Preloader}>
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </div>
   );
  }

  return (
    <div>
      <div className={styles.Title}>
        <h2>{post.name}</h2>
        <div style={{display:'flex', width: '15em', justifyContent: 'space-between'}}>
          {post.author.id === me.id && (
            <div style={{marginRight:'1em'}}>
              <Button color="primary" variant="text"><Link to={`/edit/${post.id}`}><EditOutlined /></Link></Button>
              <Popconfirm
                title="Вы уверены что хотите удалить этот пост?"
                okText="Да"
                cancelText="Нет"
                onConfirm={()=>{handleDelete(post.id)}}
              >
                <Button color="danger" variant="text" ><DeleteOutlined /></Button>
              </Popconfirm>
            </div>
          )}
          <Button><Link to="/">К постам</Link></Button>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.text) }} />
      <Comments
        author={post.author}
        id={id}
        isChanged={isChanged}
        setIsChanged={setIsChanged}
        comments={post.comments}
      />
    </div>
  );
};

export default PostView;
