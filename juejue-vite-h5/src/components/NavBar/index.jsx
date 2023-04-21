import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { TabBar } from 'zarm';
import { useHistory, /* useNavigate */  } from 'react-router-dom';
import CustomIcon from '../CustomIcon';
import s from './style.module.less';




const NavBar = ({ showNav }) => {
  const [activeKey, setActiveKey] = useState('/');
  // const navigateTo = useNavigate() 
  const history = useHistory() // history代替了navigateTo

  /***--- 所以当你点击导航栏的时候，changeTab 方法便会被触发，执行内部的 setActiveKey 和 navigateTo，他们的作用分别是设置当前点击的高亮和让页面跳转到对应的页面组件 ---**/
  const chnageTab = (path) => {
    // console.log(path)
    setActiveKey(path)
    history.push(path)
  }

  return (
    <TabBar visible={showNav} className={s.tab} activeKey={activeKey} onChange={chnageTab}>
      <TabBar.Item
        itemKey="/"
        title="账单"
        icon={<CustomIcon type="zhangdan" />}
      />
      <TabBar.Item
        itemKey="/data"
        title="统计"
        icon={<CustomIcon type="tongji" />}
      />
      <TabBar.Item
        itemKey="/user"
        title="我的"
        icon={<CustomIcon type="wode" />}
      />
    </TabBar>
  )
};
// 声明 NavBar 函数组件，它接收一个外部传入的 showNav 属性，用于控制导航栏的显示隐藏
NavBar.propTypes = {
  showNav: PropTypes.bool
}
export default NavBar;