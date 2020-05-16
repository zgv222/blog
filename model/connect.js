const config = require('config')
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true) //加上这个
mongoose.connect(`mongodb://${config.get('connect')}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'))

