import React, { useEffect } from 'react';
import styles from '../App.module.css'
import { getMe, logoutUser } from '../api';
import { Button, Layout, Popconfirm  } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Header } = Layout;

const HeaderComp = ({isAuth, setIsAuth, me, setMe}) => {
  const navigate = useNavigate();

  const logout = async () =>{
    const response = await logoutUser();
    console.log(response);
    if(response.status===200){
      setIsAuth(false);
      localStorage.clear();
      navigate('/login');
    }
  }  
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getMe();
        setMe(response.data.result);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          //localStorage.clear();
        }
      }
    };

    if (isAuth) {
      fetchPosts();
    }
  }, [isAuth]);
  if(isAuth){
    return (
      <Layout className={styles.Header}>
          <Header
              style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#ffffff00'
              }}
              >
              <h1><Link to='/'>{me.name}</Link></h1>
              <Popconfirm
                title="Вы уверены что хотите выйти?"
                okText="Да"
                cancelText="Нет"
                onConfirm={()=>{logout();}}
              >
                <Button><span>Выйти</span></Button>
              </Popconfirm>
          </Header>
      </Layout>
    )
  }
}

export default HeaderComp