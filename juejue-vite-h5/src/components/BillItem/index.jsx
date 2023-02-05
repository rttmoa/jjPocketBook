import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Cell } from 'zarm';
import { useHistory } from 'react-router-dom'
import CustomIcon from '../CustomIcon';
import { typeMap } from '@/utils'; // 消费类型的键值对、key为id、value为Iconfont的值

import s from './style.module.less';



// 一、通过点击的哪个item跳转到详情页去：const goToDetail = (item) => { history.push(`/detail?id=${item.id}`) };
// 二、计算总收入/支出：const _income = bill.bills.filter(i => i.pay_type == 2).reduce((curr, item) => {curr += Number(item.amount); return curr; }, 0);
// 三、渲染每个item： { bill && bill.bills.sort((a, b) => b.date - a.date).map(item => <Cell></Cell>) }


const BillItem = ({ bill }) => {
  const [income, setIncome] = useState(0); // 收入
  const [expense, setExpense] = useState(0); // 支出
  const history = useHistory()

  // 当添加账单是，bill.bills 长度变化，触发当日收支总和计算。
  useEffect(() => {
    // 初始化将传入的 bill 内的 bills 数组内数据项，过滤出支出和收入。

    // console.log(bill)
    // 先根据每天收入类型为2的返回值  账单中每个数值进行相加
    const _income = bill.bills.filter(i => i.pay_type == 2).reduce((curr, item) => {
      curr += Number(item.amount);
      return curr;
    }, 0);
    setIncome(_income);
    const _expense = bill.bills.filter(i => i.pay_type == 1).reduce((curr, item) => {
      curr += Number(item.amount);
      return curr;
    }, 0);
    setExpense(_expense);
  }, [bill.bills]);

  /***--- 前往账单详情 ---**/
  const goToDetail = (item) => { history.push(`/detail?id=${item.id}`) };



  return <div className={s.item}>
    <div className={s.headerDate}>
      <div className={s.date}>{bill.date}</div>
      <div className={s.money}>
        <span>
          <img src="//s.yezgea02.com/1615953405599/zhi%402x.png" alt='支' />
            <span>¥{ expense.toFixed(2) }</span>
        </span>
        <span>
          <img src="//s.yezgea02.com/1615953405599/shou%402x.png" alt="收" />
          <span>¥{ income.toFixed(2) }</span>
        </span>
      </div>
    </div>
    {
      bill && bill.bills.sort((a, b) => b.date - a.date).map(item => <Cell
        className={s.bill}
        key={item.id}
        onClick={() => goToDetail(item)}
        title={
          <>
            <CustomIcon
              className={s.itemIcon}
              type={item.type_id ? typeMap[item.type_id].icon : 1}
            />
            <span>{ item.type_name }</span>
          </>
        }
        description={<span style={{ color: item.pay_type == 2 ? 'red' : '#39be77' }}>
          {`${item.pay_type == 1 ? '-' : '+'}${item.amount}`}
        </span>}
        help={<div>{dayjs(Number(item.date)).format('HH:mm')} {item.remark ? `| ${item.remark}` : ''}</div>}
      >
      </Cell>)
    }
  </div>
};



BillItem.propTypes = {
  bill: PropTypes.object
};

export default BillItem;

