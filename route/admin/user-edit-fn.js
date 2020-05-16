const joi = require('joi')
const user = require('../../model/user').user//注意别忘了.user,否则会报错
const bcrypt = require('bcryptjs')//用于将密码加密后保存到数据库中,bcypt的方法都是异步的，且支持promise

module.exports = async (req, res, next) => {

    //设置当前访问的标识属于user，用于侧边栏的选中状态
    req.app.locals.currentLink = 'user'

    try {

        //引入用户验证规则,在model/user中
        await joi.validate(req.body, require('../../model/user').Schema)
    }
    catch (ex) {
        //如果验证没有通过，重定向到用户添加页面，并展示错误信息，return是为了不让程序继续执行
        return next(JSON.stringify({ pathname: '/admin/user-edit', message: ex.message }))

    }
    //通过验证后，要验证用户的邮箱地址在数据库中是否存在
    let email = req.body.email
    let finduser = await user.findOne({ email })
    //如果存在，重定向原来页面
    if (finduser) {
        //重定向到原来
        return next(JSON.stringify({ pathname: '/admin/user-edit', message: '邮箱地址已经被占用' }))

    }
    //如果不存在，处理信息添加到数据库
    else {
        //加密密码
        const salt = await bcrypt.genSalt(10)
        // 加密后的密码
        req.body.password = await bcrypt.hashSync(req.body.password, salt)
        //添加到数据库
        await user.create(req.body)
        //添加成功后，重定向到原来页面并输出信息
        res.redirect(`user`);
    }
}