// postcss.config.js
// 用 vite 创建项目，配置 postcss 需要使用 post.config.js，之前使用的 .postcssrc.js 已经被抛弃
// 具体配置可以去 postcss-pxtorem 仓库看看文档
/**--- 安装一个 postcss-pxtorem，它的作用是在你编写完 css 后，将你的单位自动转化为 rem 单位、 安装：npm i postcss-pxtorem ---**/



module.exports = {
  "plugins": [
    require("autoprefixer"),

    // 编写完CSS后、自动转化为rem单位
    require("postcss-pxtorem")({
      rootValue: 37.5, // Vant 官方根字体大小是 37.5
      propList: ['*'],
      selectorBlackList: ['.norem'] // 过滤掉.norem-开头的class，不进行rem转换
    })
  ]
}