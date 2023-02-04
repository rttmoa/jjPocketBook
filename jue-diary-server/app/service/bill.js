'use strict';

const Service = require('egg').Service;

class BillService extends Service {

  // 获取账单列表
  async list(id) {
    const { ctx, app } = this;
    const QUERY_STR = 'id, pay_type, amount, date, type_id, type_name, remark';
    let sql = `select ${QUERY_STR} from bill where user_id = ${id}`;
    try {
      // 往 bill 表中，插入一条账单数据
      const result = await app.mysql.query(sql);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async add(params) {
    const { ctx, app } = this;
    try {
      const result = await app.mysql.insert('bill', params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async detail(id, user_id) {
    const { ctx, app } = this;
    try {
      const result = await app.mysql.get('bill', { id, user_id })
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(params) {
    const { ctx, app } = this;
    try {
      // 第一个参数为需要操作的数据库表名称 bill；第二个参数为需要更新的数据内容，这里直接将参数展开；第三个为查询参数，指定 id 和 user_id
      let result = await app.mysql.update('bill', {
          ...params
      }, {
          id: params.id,
          user_id: params.user_id
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  async delete(id, user_id) {
    const { ctx, app } = this;
    try {
      // app.mysql.delete 方法接收两个参数，第一个是数据库表名称，第二个是查询条件
      // 这里我们给的查询条件是账单 id 和用户 user_id。其实我们可以不传用户 user_id，因为我们的账单 id 都是自增的，不会有重复值出现，不过安全起见，带上 user_id 起到双保险的作用
      let result = await app.mysql.delete('bill', {
        id: id,
        user_id: user_id
    });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = BillService;
