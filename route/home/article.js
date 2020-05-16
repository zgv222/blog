const { article } = require('../../model/article')
const { comment } = require('../../model/comment')
module.exports = async (req, res) => {
    const { id } = req.query
    let findarticle = await article.findOne({ _id: id }).populate('author')
    //在数据库中根据文章id查找评论
    let findcomment = await comment.find({ aid: id }).populate('uid')
    // return res.send(findcomment)
    res.render('home/article.art', {
        findarticle,
        findcomment,
    })
    // res.send(findarticle)
}