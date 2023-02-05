# 掘掘记账本

*初始化项目*：`npm init @vitejs/app react-vite-h5 -- --template react`

*启动项目*：`npm run dev`

知识点

1. 构架工具 Vite。
2. 前端框架 React 和路由 react-router-dom。
3. CSS 预加载器 Less。
4. HTTP 请求库 axios。
5. 移动端分辨率适配 flexible。
6. 跨域代理。
7. useRef()

* [ ] DataJs中    CSS样式书写
* [ ] Function组件形式  H5项目



    packageJson：`444 4`

component
    BillItemjs:

```
// 一、通过点击的哪个item跳转到详情页去：const goToDetail = (item) => { history.push(`/detail?id=${item.id}`) };
// 二、计算总收入/支出：const _income = bill.bills.filter(i => i.pay_type == 2).reduce((curr, item) => {curr += Number(item.amount); return curr; }, 0);
// 三、渲染每个item： { bill && bill.bills.sort((a, b) => b.date - a.date).map(item => <Cell></Cell>) }

```

    NavBarjs:
    PopupAddBilljs:

mainjs：
    // 一、使用 lib-flexible 包适配rem移动端项目
    // 二、根使用 BrowserRouter 包裹App组件

Appjs：
    // 一、引入路由配置 渲染路由配置数据  useEffect监听location.pathname的值
    // 二、设置是否显示NavBar导航组件 || NavBar组件的封装

Loginjs：
    // 一、根据type的值 渲染标题 | 展示登陆还是注册文字 | 展示登陆还是注册的内容 | 提交时是注册还是登陆 | 渲染样式(login/register)

Accountjs:
    // 一、使用 rc-form 包进行修改原密码与新密码 | createForm()、getFieldProps()、validateFields()

UserInfojs:
    // 一、使用 FilePicker 组件上传头像功能 | axios及token发送到后台

Datajs：
    // 收支构成百分比和饼图
    // 一、根据totalType的类型 判断是收入和支出
    // 二、使用classnames进行写表达式判断是收入还是支出 || className={cx({ [s.expense]: true, [s.active]: totalType == 'expense' })}
    // 三、收支构成即渲染支出数据又渲染收入数据 | 根据classnames及表达式渲染类型
    // 四、进度条渲染百分比
    // 五、根据页面内日期变化发请求 const { data } = await get(`/api/bill/data?date=${currentMonth}`);

Detailjs：
    // 一、进入账单详情页面 使用 query-string 包将地址栏中的参数 转换为对象格式 || qs.parse("?id=917&uname=zhangsan") // {id: '917', uname: 'zhangsan'}
    // 二、使用dayjs格式化日期
    // 三、前台获取后台接口数据 使用 `/api/bill/detail?id=${id}`格式获取

HomeJs：
