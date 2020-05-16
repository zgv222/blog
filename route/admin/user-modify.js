const user = require('../../model/user').user
const bcrypt = require('bcryptjs')
module.exports = async (req, res, next) => {

    //设置当前访问的标识属于user，用于侧边栏的选中状态
    req.app.locals.currentLink = 'user'

    // 获取用户的get请求参数，即id
    const { id } = (req.query)
    //获取表单内容
    const { username, password, email, role, state } = req.body

    let finduser = await user.findOne({ _id: id })

    const isValid = await bcrypt.compare(password, finduser.password)

    if (isValid) {
        // res.send('yes')
        await user.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state,
        })
        res.redirect('/admin/user')
    }
    else {
        next(JSON.stringify({ pathname: '/admin/user-edit', message: '密码错误', id }))
    }

}