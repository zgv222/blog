const joi = require("joi")
const schema = {
    username: joi.string().min(2).max(5).required().error(new Error('username 属性没有通过验证')),
    birth: joi.number().min(1900).max(2020).error(new Error('birth没有通过验证'))
}
async function run() {
    try {
        await joi.validate({ username: 'a', birth: 1800 }, schema)
    }
    catch (ex) {
        console.log(ex.message)
        return
    }
    console.log('验证通过')
}
run();