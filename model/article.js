const mongoose = require('mongoose')
// 创建文章集合规则
const articleSchema = mongoose.Schema({
    title: {
        type: String,
        maxlength: 20,
        minlength: 4,
        required: [true, '请输入文章标题']
    },
    author: {
        // 关联user表中的id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '请传递作者'],
    },
    publishDate: {
        type: Date,
        default: Date.now,
    },
    cover: {
        type: String,
        default: null,
    },
    content: {
        type: String,
    }
})
// 创建文章集合
const article = mongoose.model('Article', articleSchema)//第一个参数开头要大写


module.exports = {
    article
}