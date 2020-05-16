// 导入文章数据集合
const { article } = require('../../model/article')
//导入mongoose-sex-page模块，用于数据分页
const pagination = require('mongoose-sex-page')

module.exports = async (req, res) => {
    //设置当前访问的标识属于user，用于侧边栏的选中状态
    req.app.locals.currentLink = 'article'

    let page = req.query.page;

    // page 指定当前页
    // size 指定每页显示的数据条数
    // display 指定客户端要显示的页码数量
    // exec 向数据库中发送查询请求
    // 查询所有文章数据
    let findarticle = await pagination(article).find().page(page).size(10).display(5).populate('author').exec();

    //渲染模板
    res.render('admin/article.art', {
        findarticle,
    })
}