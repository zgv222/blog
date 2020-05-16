module.exports = (err, req, res, next) => {
    // res.redirect(`${err.pathname}?message=${err.message}`);

    // 将字符串对象转换为对象类型
    // JSON.parse() 
    const result = JSON.parse(err);
    res.redirect(`${result.pathname}?message=${result.message}&id=${result.id}`);

}