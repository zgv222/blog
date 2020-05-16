const express = require('express')


//创建home路由对象
const admin = express.Router();


//引入登陆login模块
admin.get('/login', require('./admin/loginPage'))

// 实现退出功能
admin.get('/logout', require('./admin/logout'));

admin.get('/user', require('./admin/user'))

admin.get('/user-edit', require('./admin/user-edit'))

admin.post('/login', require('./admin/login'))

admin.post('/user-edit-fn', require('./admin/user-edit-fn'))

//修改用户信息的post路由
admin.post('/user-add', require('./admin/user-modify'))
//删除用户信息的路由
admin.get('/user-delete', require('./admin/user-delete'))
/***********文章相关路由***************** */
admin.get('/article', require('./admin/article'))

admin.get('/article-edit', require('./admin/article-edit'))
//实现文章添加功能的路由
admin.post('/article-add', require('./admin/article-add'))
//文章修改路由
admin.post('/article-modify', require('./admin/article-modify'))

admin.get('/article-delete', require('./admin/article-delete'))

module.exports = admin