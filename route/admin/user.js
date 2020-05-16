//本文件代码用于实现用户分页功能

//导入数据库模块
const user = require('../../model/user').user

module.exports = async (req, res) => {
    //设置当前访问的标识属于user，用于侧边栏的选中状态
    req.app.locals.currentLink = 'user'
    //接收客户端传递过来的当前页的参数
    let page = req.query.page || 1;
    //每一页显示的数据条数
    let pagesize = 10
    //查询用户数据的总数
    let count = await user.countDocuments({});//参数：查询条件

    // 计算总页数
    let num = Math.ceil(count / pagesize)
    //页码对应的数据查询开始位置
    let start = (page - 1) * pagesize

    //从数据库中读取数据
    let finduser = await user.find({}).limit(pagesize).skip(start)


    res.render('admin/user.art', {
        finduser,
        pages: num,//总页数
        nowpage: page//当前在第几页
    })
}