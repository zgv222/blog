//引入mongoose模块
const mongoose = require('mongoose')
//创建评论集合规则
const commentSchema = mongoose.Schema({
    //文章id
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
    },
    // 用户id
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    //评论时间
    time: {
        type: Date,
    },
    //评论内容
    content: {
        type: String,
    }
})

const comment = mongoose.model('Comment', commentSchema)

module.exports = {
    comment
}