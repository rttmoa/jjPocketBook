import React, { useEffect, useState } from 'react';
import { Button, FilePicker, Input, Toast } from 'zarm';
import { useHistory } from 'react-router-dom';
import Header from '@/components/Header'; // 由于是内页，使用到公用头部
import axios from 'axios'; // 由于采用 form-data 传递参数，所以直接只用 axios 进行请求
import { get, post, imgUrlTrans } from '@/utils'
import { baseUrl } from 'config' // 由于直接使用 axios 进行请求，统一封装了请求 baseUrl
import s from './style.module.less';


// 一、使用 FilePicker 组件上传头像功能

const UserInfo = () => {
  const history = useHistory()
  const [user, setUser] = useState({}); // 用户
  const [avatar, setAvatar] = useState('') // 头像
  const [signature, setSignature] = useState('') // 个签
  const token = localStorage.getItem('token') // 登录令牌
  // console.log(token)

  useEffect(() => {
    getUserInfo()
  }, [])

  // 获取用户信息
  const getUserInfo = async () => {
    const { data } = await get('/api/user/get_userinfo');
    setUser(data);
    setAvatar(imgUrlTrans(data.avatar))
    setSignature(data.signature)
  };

  // 获取图片回调 --- 通过网络中预览查看是否上传成功
  const handleSelect = (file) => {
    console.log('file.file', file.file)
    if (file && file.file.size > 200 * 1024) {
      Toast.show('上传头像不得超过 200 KB!!')
      return
    }
    // 此时，我们需要的是上传资源的原始文件，在上述返回对象中，file 属性为 File 文件类型，它是浏览器返回的原生对象，我们需要通过下列代码，将其改造成一个 form-data 对象
    let formData = new FormData()
    // / 生成 form-data 数据类型
    formData.append('file', file.file)
    // 再将 formData 通过 axios 上传到服务器，服务端通过 ctx.request.files[0] 获取到前端上传的 文件原始对象，并将其读取，存入服务器内部。
      // 这样就完成了一套前端上传资源，服务端存储并返回路径的一个过程
    // // 通过 axios 设置  'Content-Type': 'multipart/form-data', 进行文件上传
    axios({
      method: 'post',
      // url: `${baseUrl}/api/upload`,
      url: `${baseUrl}/upload`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
      }
    }).then(res => {
      // console.log(res)
      // 返回图片地址
      setAvatar(imgUrlTrans(res.data))
    }).catch(e => console.log(e))
  }

  // 编辑用户信息方法
  const save = async () => {
    const { data } = await post('/api/user/edit_userinfo', {
      signature,
      avatar
    });

    Toast.show('修改成功')
    // 成功后回到个人中心页面
    history.goBack()
  }

  return <>
    <Header title='用户信息' />
    
    <div className={s.userinfo}>
      <h1>个人资料</h1>
      <div className={s.item}>
        <div className={s.title}>头像</div>
        <div className={s.avatar}>
          <img className={s.avatarUrl} src={avatar} alt=""/>
          <div className={s.desc}>
            <span>支持 jpg、png、jpeg 格式大小 200KB 以内的图片</span>
            <FilePicker className={s.filePicker} onChange={handleSelect} accept="image/*" >
              <Button className={s.upload} theme='primary' size='xs'>点击上传</Button>
            </FilePicker>
          </div>
        </div>
      </div>
      <div className={s.item}>
        <div className={s.title}>个性签名</div>
        <div className={s.signature}>
          <Input
            clearable
            type="text"
            value={signature}
            placeholder="请输入个性签名"
            onChange={(value) => setSignature(value)}
          />
        </div>
      </div>
      <Button onClick={save} style={{ marginTop: 50 }} block theme='primary'>保存</Button>
    </div>
  </>
};

export default UserInfo;