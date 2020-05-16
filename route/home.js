const express = require('express')
//创建home路由对象
const home = express.Router();
//博客前台首页的展示页面
home.get('/', require('./home/index'))
//博客前台详情展示页面
home.get('/article', require('./home/article'))

home.post('/comment', require('./home/comment'))

module.exports = home