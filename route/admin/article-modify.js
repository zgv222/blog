const path = require('path')
const { article } = require('../../model/article')
//用于二进制解析文件
const formidable = require('formidable')
module.exports = async (req, res) => {
    //设置当前访问的标识属于user，用于侧边栏的选中状态
    req.app.locals.currentLink = 'article'

    const id = req.query.id;
    const form = formidable.IncomingForm();
    //配置上传文件的存放位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    // 保留上传文件的后缀
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {

        // return res.send(fields)
        await article.updateOne({ _id: id }, {
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            // cover: files.cover.path.split('public')[1],
            content: fields.content,
        })
        //如果文件需要更新
        if (fields.changecover == 'yes') {
            await article.updateOne({ _id: id }, {
                cover: files.cover.path.split('public')[1],
            })
        }
        // 将页面重定向到文章页表页面
        res.redirect('/admin/article')

    })

}