const user = require('../../model/user').user
module.exports = async (req, res) => {
    //设置当前访问的标识属于user，用于侧边栏的选中状态
    req.app.locals.currentLink = 'user'

    let { id, message } = req.query;/* await user.findOne({ _id: req.query.id.replace("\"", "").replace("\"", "") }) */
    //如果id存在，修改操作
    if (id) {
        let finduser = await user.findOne({ _id: req.query.id })

        res.render('admin/user-edit.art', {
            msg: message,
            finduser,
            button: '修改',
            link: '/admin/user-add?id=' + id//修改信息的表单地址和新增用户的表单地址不一样
        })
    }
    //否则为新增操作，不需要id参数
    else {
        res.render('admin/user-edit.art', {
            msg: message,
            button: '添加',
            link: '/admin/user-edit-fn',

        })
    }

}