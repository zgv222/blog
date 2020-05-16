// 引入formidable第三方模块，用于二进制解析文件
const formidable = require('formidable');
const path = require('path');
//引入article数据集合
const { article } = require('../../model/article')

module.exports = (req, res) => {
    // 1.创建表单解析对象
    const form = new formidable.IncomingForm();
    // 2.配置上传文件的存放位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    // 3.保留上传文件的后缀
    form.keepExtensions = true;
    // 4.解析表单
    form.parse(req, async (err, fields, files) => {
        // 参数：
        // 1.err错误对象 如果表单解析失败 err里面存储错误信息 如果表单解析成功 err将会是null
        // 2.fields 对象类型 保存普通表单数据
        // 3.files 对象类型 保存了和上传文件相关的数据

        // 5. 将表单中的文件的路径存放到数据库中
        // 说明： files中的path是服务器的绝对路径， 因为服务器的访问时相对路径的（相对于public），所以要将绝对路径转化为相对路径
        // split是将字符串分解为数组，按参数中为分界
        // res.send(files.cover.path.split('public')[1])
        await article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content,
        })
        // 将页面重定向到文章页表页面
        res.redirect('/admin/article')
    })
}
