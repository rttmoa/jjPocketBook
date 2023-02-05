import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Modal, Toast } from 'zarm';
import qs from 'query-string';
import cx from 'classnames';
import dayjs from 'dayjs';
import Header from '@/components/Header';
import CustomIcon from '@/components/CustomIcon';
import PopupAddBill from '@/components/PopupAddBill'
import { get, post, typeMap } from '@/utils';

import s from './style.module.less'


// 一、进入账单详情页面 使用 query-string 包将地址栏中的参数 转换为对象格式 || qs.parse("?id=917&uname=zhangsan") // {id: '917', uname: 'zhangsan'}
// 二、使用dayjs格式化日期
// 三、前台获取后台接口数据 使用`/api/bill/detail?id=${id}`格式获取




// console.log(dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'))

/***--- 账单详情页 ---**/
const Detail = () => {
  const addRef = useRef();
  const location = useLocation(); // 获取 locaton 实例，我们可以通过打印查看内部都有些什么内容。
  const history = useHistory();
  const { id } = qs.parse(location.search); // 我们想要的参数在 search 属性中，我想把 ?id=917 转换成 json 键值对的形式{id:917}
  // console.log(location) // 获取地址栏信息
  // console.log(qs.parse("?id=917")) // {id: '917'}
  // console.log(qs.parse("?id=917&uname=zhangsan")) // {id: '917', uname: 'zhangsan'}

  const [detail, setDetail] = useState({});
  
  useEffect(() => {
    getDetail();
  }, []);
  /***--- 账单明细：我们通过列表页传入的浏览器查询字符串，通俗的将就是浏览器地址栏上的参数，来获取该笔账单的详情 ---**/
  const getDetail = async () => {
    const { data } = await get(`/api/bill/detail?id=${id}`);
    // console.log(data)
    setDetail(data);
  }

  // 删除方法
  const deleteDetail = () => {
    Modal.confirm({
      title: '删除',
      content: '确认删除账单？',
      onOk: async () => {
        const { data } = await post('/api/bill/delete', { id })
        Toast.show('删除成功')
        history.goBack()
      },
    });
  }

  // 打开编辑弹窗方法
  const openModal = () => {
    addRef.current && addRef.current.show()
  }




  return <div className={s.detail}>
    <Header title='账单详情' />
    <div className={s.card}>

      <div className={s.type}>
        <span className={cx({ [s.expense]: detail.pay_type == 1, [s.income]: detail.pay_type == 2 })}>
          {/* typeMap 是我们事先约定好的 icon 列表 */}
          <CustomIcon 
            className={s.iconfont} 
            type={detail.type_id ? typeMap[detail.type_id].icon : 1}
          />
        </span>
        <span>{ detail.type_name || '' }</span>
      </div>

      {
        detail.pay_type == 1
          ? <div className={cx(s.amount, s.expense)}>-{ detail.amount }</div>
          : <div className={cx(s.amount, s.incom)}>+{ detail.amount }</div>
      }

      <div className={s.info}>
        <div className={s.time}>
          <span>记录时间</span>
          <span>{dayjs(Number(detail.date)).format('YYYY-MM-DD HH:mm')}</span>
        </div>
        <div className={s.remark}>
          <span>备注</span>
          <span>{ detail.remark || '-' }</span>
        </div>
      </div>
      <div className={s.operation}>
        <span onClick={deleteDetail}><CustomIcon type='shanchu' />删除</span>
        <span onClick={openModal}><CustomIcon type='tianjia' />编辑</span>
      </div>
    </div>

    {/* 编辑账单 - 需要在新增账单中添加编辑的操作 */}
    <PopupAddBill ref={addRef} detail={detail} onReload={getDetail} />

  </div>
};

export default Detail;