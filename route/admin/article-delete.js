const { article } = require('../../model/article')
module.exports = async (req, res) => {

    //设置当前访问的标识属于user，用于侧边栏的选中状态
    req.app.locals.currentLink = 'article'

    await article.findOneAndDelete({ _id: req.query.id })
    res.redirect('/admin/article')
    // res.send(req.body)
}