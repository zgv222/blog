const { comment } = require('../../model/comment')
module.exports = async (req, res) => {
    const { aid, uid, content } = req.body
    await comment.create({
        content,
        aid,
        uid,
        time: new Date(),
    })
    res.redirect('/home/article?id=' + aid)
    // res.send(req.body)
}