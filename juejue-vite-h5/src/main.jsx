import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom";
import 'lib-flexible/flexible' // 移动端项目适配 rem、 安装：npm i lib-flexible -S
import './index.css'
import App from './App'


// 一、使用 lib-flexible 包适配rem移动端项目
// 二、根使用 BrowserRouter 包裹App组件


ReactDOM.render(
  <React.StrictMode>

    <Router>
      <App />
    </Router>
    
  </React.StrictMode>,
  document.getElementById('root')
)