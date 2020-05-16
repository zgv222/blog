const connect = require('./connect')
const joi = require('joi')
const bcrypt = require('bcryptjs')
// 引入数据库连接模块，注意，此处是使用mongoose模块下面的创建规则的方法，不用在connect文件下面导出mongoose对象再创建
const mongoose = require('mongoose')
//创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
    },
    email: {
        type: String,
        unique: true,//用邮箱作为登陆的依据，所以要设置唯一性
    },
    password: {
        type: String,
        required: true,
    },
    role: {                         //设置身份  admin 管理员   normal 普通用户
        type: String,
        required: true,
    },
    state: {                        //设置状态，0 启用， 1 禁用
        type: Number,
        default: 0,
    }
})
//创建用户集合
const user = mongoose.model('User', userSchema)

async function create() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hashSync('123', salt);

    const u = await user.create({
        username: 'admin',
        email: '123@qq.com',
        password: pass,
        role: 'admin',
        state: 0,
    })
}

// create();

//定义user对象验证规则

const Schema = {
    username: joi.string().min(2).max(5).required().error(new Error('用户名不符合要求')),
    email: joi.string().email().required().error(new Error('邮箱不符合要求')),
    password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
    role: joi.string().valid('normal', 'admin').required().error(new Error('角色出现异常')),
    state: joi.number().valid(0, 1).required().error(new Error('状态值异常'))
}





module.exports = {
    user,         // 如果键和键值同名，可以省略，相当于user: user
    Schema,
}