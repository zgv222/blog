const user = require('../../model/user').user
module.exports = async (req, res) => {

    //设置当前访问的标识属于user，用于侧边栏的选中状态
    req.app.locals.currentLink = 'user'
    await user.findOneAndDelete({ _id: req.query.id })
    res.redirect('/admin/user')
}