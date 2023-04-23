import React, { useEffect, useRef, useState } from 'react'
import { Icon, Pull } from 'zarm'
import dayjs from 'dayjs'
import PopupType from '@/components/PopupType'
import PopupDate from '@/components/PopupDate'
import PopupAddBill from '@/components/PopupAddBill'
import BillItem from '@/components/BillItem'
import Empty from '@/components/Empty'
import CustomIcon from '@/components/CustomIcon'
import { get, REFRESH_STATE, LOAD_STATE } from '@/utils' // 在 utils/index.js 中添加一些 Pull 组件需要用到的常量、是下拉刷新的状态：加载中及加载失败等...

import s from './style.module.less'






/***--- 此节列表页知识点：1、单项组件抽离 2、列表页无限滚动 3、下拉刷新列表 4、弹窗组件封装(公用组件提取，如弹窗组件、账单组件) ---**/



// 1、列表页编写（静态部分）：我们先将静态页面切出来，再填入数据使其动态化
// 2、头部统计实现：列表的头部展示的内容为当月的收入和支出汇总，并且有两个列表条件过滤项，分别是类型过滤和时间过滤
// 3、本次项目全程采用的是 Flex 弹性布局、学习网站：http://flexboxfroggy.com/#zh-cn
// 4、列表页面实现：列表页面会用到 Zarm 组件库为我们提供的 Pull 组件，来实现下拉刷新以及无限滚动，我们先来将基础布局实现
// 5、下拉刷新、上滑无限加载
// 6、添加筛选条件：类型选择和日期选择，借助 Zarm 组件库为我们提供的 Popup 组件、新建 components/PopupType 组件
// 7、新增账单弹窗：参数 账单类型、账单金额、账单日期、账单种类、备注   ---   addToggle函数控制PopupAddBill组件的显示
const Home = () => {
  const typeRef = useRef(); // 账单类型 ref
  const monthRef = useRef(); // 月份筛选 ref
  const addRef = useRef(); // 添加账单 ref
  const [totalExpense, setTotalExpense] = useState(0); // 总支出
  const [totalIncome, setTotalIncome] = useState(0); // 总收入
  const [currentSelect, setCurrentSelect] = useState({}); // 当前筛选类型
  const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM')); // 当前筛选时间
  const [page, setPage] = useState(1); // 分页
  const [list, setList] = useState([]); // 账单列表
  const [totalPage, setTotalPage] = useState(0); // 分页总数
  const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal); // 下拉刷新状态
  const [loading, setLoading] = useState(LOAD_STATE.normal); // 上拉加载状态


  useEffect(() => {
    getBillList() // 初始化
  }, [page, currentSelect, currentTime])


  // 获取账单方法：计算当前月份的收入和支出汇总数据
  const getBillList = async () => {
    const { data } = await get(`/api/bill/list?date=${currentTime}&type_id=${currentSelect.id || 'all'}&page=${page}&page_size=5`);
    // 下拉刷新，重制数据
    if (page == 1) {
      setList(data.list); // 账单列表
    } else {
      setList(list.concat(data.list)); // 账单列表
    }
    setTotalExpense(data.totalExpense.toFixed(2));  // 总支出
    setTotalIncome(data.totalIncome.toFixed(2));  // 总收入
    setTotalPage(data.totalPage); // 分页总数 
    setLoading(LOAD_STATE.success); // 上滑加载状态
    setRefreshing(REFRESH_STATE.success); // 下拉刷新状态
  }

  // 请求列表数据
  const refreshData = () => {
    console.log("上拉加载状态")
    setRefreshing(REFRESH_STATE.loading);
    if (page != 1) {
      setPage(1);
    } else {
      getBillList();
    };
  };

  const loadData = () => {
    // console.log(page)
    if (page < totalPage) {
      setLoading(LOAD_STATE.loading);
      setPage(page + 1);
    }
  }

  /***--- 选择收入支出类型弹窗 ---**/
  const toggle = () => { typeRef.current && typeRef.current.show() };
  /***--- 选择月份弹窗 ---**/
  const monthToggle = () => { monthRef.current && monthRef.current.show() };
  /***--- 添加账单弹窗 ---**/
  const addToggle = () => { addRef.current && addRef.current.show() }

  // 筛选类型
  const select = (item) => {
    setRefreshing(REFRESH_STATE.loading);
    // 触发刷新列表，将分页重制为 1
    setPage(1);
    setCurrentSelect(item)
  }

  // 筛选月份
  const selectMonth = (item) => {
    setRefreshing(REFRESH_STATE.loading);
    setPage(1);
    setCurrentTime(item)
  }



  

  return <div className={s.home}>

    {/* 头部统计实现 */}
    <div className={s.header}>
      <div className={s.dataWrap}>
        <span className={s.expense}>总支出：<b>¥ { totalExpense }</b></span>
        <span className={s.income}>总收入：<b>¥ { totalIncome }</b></span>
      </div>
      <div className={s.typeWrap}>
        <div className={s.left} onClick={toggle}>
          <span className={s.title}>{ currentSelect.name || '全部类型' } <Icon className={s.arrow} type="arrow-bottom" /></span>
        </div>
        <div className={s.right}>
          <span className={s.time} onClick={monthToggle}>{ currentTime }<Icon className={s.arrow} type="arrow-bottom" /></span>
        </div>
      </div>
    </div>
    
    <div className={s.contentWrap}>
      {/* 渲染的列表页面 */}
      {
        // 如果有数据、取反查看Empty组件 || 如果有数据、渲染下载组件包裹所有的数据
        list.length ? <Pull
          animationDuration={500}
          stayTime={400}
          refresh={{
            state: refreshing,
            handler: refreshData
          }}
          load={{
            state: loading,
            distance: 200,
            handler: loadData
          }}
        >
          {/* BillItem 组件为账单单项组件，我们将其抽离到 components 组件库 */}
          {
            list.map((item, index) => <BillItem
              bill={item}
              key={index}
            />)
          }
        </Pull> : <Empty />
      }
    </div>

    {/* 右下角添加账单 */}
    <div className={s.add} onClick={addToggle}>
      <CustomIcon type='tianjia' />
    </div>

    {/* 顶部全部类型 */}
    <PopupType ref={typeRef} onSelect={select} />
    
    {/* 顶部筛选日期 */}
    <PopupDate ref={monthRef} mode="month" onSelect={selectMonth} /> 
    
    {/* // onReload 方法为首页账单列表传进来的函数，当添加完账单的时候，执行 onReload 重新获取首页列表数据 */}
    <PopupAddBill ref={addRef} onReload={refreshData} />


  </div>
};

export default Home;