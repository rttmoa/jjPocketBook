import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import { ConfigProvider } from 'zarm';
import routes from '@/router';  // 引入路由配置，实现切换浏览器路径，显示相应的组件
import NavBar from '@/components/NavBar';






// 一、引入路由配置 渲染路由配置数据  useEffect监听location.pathname的值 
// 二、设置是否显示NavBar导航组件


const  App = () => {
  const location = useLocation() // 拿到 location 实例
  const { pathname } = location; // 获取当前路径
  const needNav = ['/', '/data', '/user'] // 需要底部导航栏的路径
  const [showNav, setShowNav] = useState(false) // 是否展示 Nav
  
  useEffect(() => {
    setShowNav(needNav.includes(pathname))
  }, [pathname])  


  return <ConfigProvider primaryColor={'#007fff'}>
    <>
      <Switch>
        {routes.map(route => <Route exact key={route.path} path={route.path}>
            <route.component />
          </Route>
        )}
      </Switch>
      <NavBar showNav={showNav} />
    </>
  </ConfigProvider>;
};

export default App;
