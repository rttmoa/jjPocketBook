"use strict";

const Service = require("egg").Service;



/**--- 此文件演示eggjs的基本使用 ---**/
/**--- 第4节、后端预备中的增删改查案例 ---**/
class HomeService extends Service {
  // 查询
  async user() {
    const { ctx, app } = this;
    const QUERY_STR = "id, name";
    let sql = `select ${QUERY_STR} from list`; // 获取 id 的 sql 语句
    try {
      const result = await app.mysql.query(sql); // mysql 实例已经挂载到 app 对象下，可以通过 app.mysql 获取到。
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }  
  }

  // 新增
  async addUser(name) {
    const { ctx, app } = this;
    try {
      const result = await app.mysql.insert("list", { name }); // 给 list 表，新增一条数据
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // 编辑
  async editUser(id, name) {
    const { ctx, app } = this;
    try {
      let result = await app.mysql.update("list", { name }, {
          where: {
            id,
          },
        }
      );
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // 删除
  async deleteUser(id) {
    const { ctx, app } = this;
    try {
      let result = await app.mysql.delete("list", { id });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
module.exports = HomeService;
