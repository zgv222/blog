const { article } = require('../../model/article')
//引入分页模块
const pagination = require('mongoose-sex-page')
module.exports = async (req, res) => {
    let { page } = req.query || 1

    let findarticle = await pagination(article).size(4).page(page).display(3).find().populate('author').exec();
    res.render('home/default.art', {
        findarticle: findarticle,
    })
    // res.send(findarticle)
}