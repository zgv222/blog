//引入数据库集合user
const user = require('../../model/user').user//注意别忘了.user,否则会报错
const bcrypt = require('bcryptjs')
module.exports = async (req, res) => {
    const { email, password } = req.body;
    //在客户端进行二次验证
    if (email.trim().length == 0) return res.status(400).render('admin/common/error.art', { msg: '邮箱或密码错误' })//如果用户输入的为空
    if (password.trim().length == 0) return res.status(400).render('admin/common/error.art', { msg: '邮箱或密码错误' })//如果用户输入的为空
    //如果验证通过
    else {
        let findUser = await user.findOne({ email })
        //如果查询到了，user的变量的类型是对象，若没有查到，变量为空
        if (findUser) {
            // 用bcrypt模块比对密码, 返回值是个布尔值
            let isValid = await bcrypt.compare(password, findUser.password)
            //如果密码比对成功
            if (isValid) {
                //登陆成功在cookie和session中生成对象
                req.session.username = findUser.username
                //将用户角色存储在session中
                req.session.role = findUser.role

                //将用户信息提供全部模板使用，如果没有登陆直接使用会报错
                req.app.locals.userInfo = findUser;//此处有bug
                //对用户的角色进行判断
                if (findUser.role == "admin") {
                    //重定向到用户列表
                    res.redirect('/admin/user')
                }
                else {
                    //跳转到博客首页
                    res.redirect('/home/')
                }


            }
            else {
                res.status(400).render('admin/common/error.art', { msg: '邮箱或密码错误' })//如果用户输入的为空

            }
        }

        else {
            // 如果没有找到
            res.status(400).render('admin/common/error.art', { msg: '邮箱或密码错误' })//如果用户输入的为空
        }
    }
}