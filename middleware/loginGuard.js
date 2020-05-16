// 登陆状态拦截中间件
const loginGuard = ((req, res, next) => {
    //     判断用户访问的是否是登陆页面
    //     判断用户是否是登陆状态
    //     如果用户是登陆的 将请求放行
    //     如果用户不是登陆的 将请求重定向到登陆页面
    if (req.url != '/login' && !req.session.username) {
        req.app.locals.currentLink = ''
        res.redirect('/admin/login')
    }
    else {
        //如果用户时登陆状态,并且是一个普通用户
        if (req.session.role == 'normal') {
            //让他跳转到博客首页,阻止程序向下执行
            return res.redirect('/home/')
        }
        //满足上面条件直接放行
        next();
    }
})
module.exports = loginGuard;