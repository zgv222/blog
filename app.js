const express = require('express')
const path = require('path')
//导入express-session模块
const session = require('express-session')
const app = express()
//引入body-parser模块用来处理post请求参数
const bodyParser = require('body-parser')
//导入art-template
const template = require('art-template')
//导入dateformat模块，用于模板内的日期格式转化
const dateformat = require('dateformat')
//导入morgan模块
const morgan = require('morgan')
//导入config模块
const config = require('config')

//数据库连接
require('./model/connect')


//配置模板
app.engine('art', require('express-art-template'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'art')//注意此处的view没有s！！
//向模板内部导入dateformat方法
template.defaults.imports.dateformat = dateformat;


//处理post请求参数
app.use(bodyParser.urlencoded({ extended: false }))

//设置静态请求目录
app.use(express.static(path.join(__dirname, 'public')))

//自动判断当前运行环境
console.log(config.get('title'));



// //获取系统环境变量
if (process.env.NODE_ENV == 'development') {
    //当前是开发环境
    //在开发环境中将客户端发送到服务器端的请求信息打印到控制台中
    app.use(morgan('dev'))
}
else {
    //当前是生产环境
    console.log('yes');

}

//添加session属性,但不会生成session_当向session对象插入数据的时候才会生成
app.use(session({
    secret: 'secret key',
    saveUninitialized: false,
    // saveUninitialized: true,//自带一个cookie，在没有插入值时也存在cookie
    cookie: {
        maxAge: 24 * 60 * 60 * 1000//过期时间为一天
    }
}));//注意，最好别写在其他中间件后面，不然容易被拦截，从而没有执行到这句

//拦截请求，判断登陆状态
app.use('/admin', require('./middleware/loginGuard'))

// 引入路由模块
const home = require('./route/home')
const admin = require('./route/admin')

app.use('/home', home)
app.use('/admin', admin)

//错误处理中间件，err参数就是抛出错误的函数中的next的参数,这东西会影响debug
// app.use((err, req, res, next) => {
//     // 将字符串对象转换为对象类型
//     // JSON.parse() 
//     const result = JSON.parse(err);
//     // {path: '/admin/user-edit', message: '密码比对失败,不能进行用户信息的修改', id: id}
//     let params = [];
//     for (let attr in result) {
//         if (attr != 'path') {
//             params.push(attr + '=' + result[attr]);
//         }
//     }
//     res.redirect(`${result.pathname}?${params.join('&')}`);

// })




app.listen(44502)
console.log(app.res);

console.log('网站服务器开启成功');
