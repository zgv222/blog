//导入bcrypt
const bcrypt = require('bcryptjs')
async function run() {
    //gensalt接收一个数值作为一个参数
    //数值越大 生成的随机字符串复杂度越高
    // 数值越小 生成的随机字符串复杂度越低
    //默认值是10,pomise返回值是个字符串
    const salt = await bcrypt.genSalt(10)
    //对密码进行加密
    // 返回值是个promise,promise返回值是加密后的字符串
    // 参数 :1.要进行加密的明文  2.上面生成的随机字符串
    const s = await bcrypt.hash('我爱你', salt)
    console.log(salt);
    console.log(s);
}
run();
