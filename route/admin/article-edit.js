const { article } = require('../../model/article')

module.exports = async (req, res) => {
    //设置当前访问的标识属于user，用于侧边栏的选中状态
    req.app.locals.currentLink = 'article'

    //如果id值存在，说明是修改操作，不存在说明是发表文章操作
    let { id } = req.query

    // 修改操作
    if (id) {
        let findarticle = await article.findOne({ _id: id }).populate('author')
        res.render('admin/article-edit.art', {
            findarticle,
            link: '/admin/article-modify?id=' + id,
            button: '修改',
        })

    }
    //发表操作
    else {
        res.render('admin/article-edit.art', {
            link: '/admin/article-add',
            button: '发表',
        })
    }

    // res.send(findarticle)
}