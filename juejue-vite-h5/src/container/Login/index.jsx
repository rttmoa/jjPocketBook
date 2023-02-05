import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Cell, Input, Button, Checkbox, Toast } from 'zarm';
import cx from 'classnames';
import Captcha from "react-captcha-code";
import CustomIcon from '@/components/CustomIcon';
import { post } from '@/utils'

import s from './style.module.less';



// 一、根据type的值 渲染标题 | 展示登陆还是注册文字 | 展示登陆还是注册的内容 | 提交时是注册还是登陆
// 二、注册验证码 react-captcha-code 包


// 1、我们的系统是面向多用户的，换句话说也就是一个纯正的 C 端项目，任何人都可以通过网站，注册一个新的账号
// 2、首先新建 Login 文件夹，在文件夹内添加两个文件 index.jsx 和 style.module.less，我们先把注册页面的静态页面切出来
// 3、在router/index.js中添加路由配置
// 4、添加静态代码、less中注意global关键词、和在浏览器中less改变后css的类名
// 5、使用插件 react-captcha-code 添加验证码插件、npm i react-captcha-code -S
const Login = () => {
  const captchaRef = useRef();
  const [type, setType] = useState('login');    // 登录注册类型
  const [captcha, setCaptcha] = useState('');   // 验证码变化后存储值
  const [username, setUsername] = useState(''); // 账号
  const [password, setPassword] = useState(''); // 密码
  const [verify, setVerify] = useState('');     // 验证码

  //  验证码变化，回调方法、输入的图片验证码
  const handleChange = useCallback((captcha) => {
    console.log('captcha', captcha)
    setCaptcha(captcha)
  }, []);
  
  const onSubmit = async () => {
    if (!username) {
      Toast.show('请输入账号')
      return
    }
    if (!password) {
      Toast.show('请输入密码')
      return
    }
    try {
      if (type == 'login') {
        const { data } = await post('/api/user/login', {
          username,
          password
        });
        localStorage.setItem('token', data.token);
        window.location.href = '/';
        // 这里之所以用 window.location.href 的原因是，utils/axios.js 内部需要再次被执行，
        // 才能通过 localStorage.getItem 拿到最新的 token。
        // 如果只是用 navigateTo 跳转页面的话，页面是不会被刷新，那么 axios.js 的 token 就无法设置

      } else {
        if (!verify) {
          Toast.show('请输入验证码')
          return
        };
        if (verify != captcha) {
          Toast.show('验证码错误')
          return
        };
        const { data } = await post('/api/user/register', {
          username,
          password
        });
        Toast.show('注册成功');
        setType('login');
      }
    } catch (err) {
      Toast.show(err.msg);
    }
  };

  useEffect(() => {
    document.title = type == 'login' ? '登录' : '注册';
  }, [type])



  
  return <div className={s.auth}>
    <div className={s.head} />
    <div className={s.tab}>
      <span className={cx({ [s.avtive]: type == 'login' })} onClick={() => setType('login')}>登录</span>
      <span className={cx({ [s.avtive]: type == 'register' })} onClick={() => setType('register')}>注册</span>
    </div>
    <div className={s.form}>
      <Cell icon={<CustomIcon type="zhanghao" />}>
        <Input
          clearable
          type="text"
          placeholder="请输入账号"
          onChange={(value) => setUsername(value)}
        />
      </Cell>
      <Cell icon={<CustomIcon type="mima" />}>
        <Input
          clearable
          type="password"
          placeholder="请输入密码"
          onChange={(value) => setPassword(value)}
        />
      </Cell>
      {
        type == 'register' ? <Cell icon={<CustomIcon type="mima" />}>
          <Input
            clearable
            type="text"
            placeholder="请输入验证码"
            onChange={(value) => setVerify(value)}
          />
          <Captcha ref={captchaRef} charNum={4} onChange={handleChange} />
        </Cell> : null
      }
    </div>
    <div className={s.operation}>
      {
        type == 'register' ? <div className={s.agree}>
          <Checkbox />
          <label className="text-light">阅读并同意<a>《掘掘手札条款》</a></label>
        </div> : null
      }
      <Button onClick={onSubmit} block theme="primary">{type == 'login' ? '登录' : '注册'}</Button>
    </div>

  </div>
};

export default Login;