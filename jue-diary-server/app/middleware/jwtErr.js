/* eslint-disable arrow-parens */
'use strict';


module.exports = (options) => {
  // 首先中间件默认抛出一个函数，该函数返回一个异步方法 jwtErr，jewErr 方法有两个参数 ctx 是上下文，可以在 ctx 中拿到全局对象 app
  return async function jwtErr(ctx, next) {
    const token = ctx.request.header.authorization; // 若是没有 token，返回的是 null 字符串
    let decode;
    if(token !== 'null' && token) { // 如果是存在且有效
      try {
        decode = ctx.app.jwt.verify(token, options.secret); // 验证token
        await next(); // 继续执行后续的接口逻辑
      } catch (error) {
        console.log('error', error);
        ctx.status = 200;
        ctx.body = {
          msg: 'token已过期, 请重新登录',
          code: 401,
        }
        return;
      }
    } else {
      ctx.status = 200;
      ctx.body = {
        code: 401,
        msg: 'token不存在',
      };
      return;
    }
  }
}