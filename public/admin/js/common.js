

// 将表单传递进来转化为json,因为表单对象不单只含有post参数，还有表单的信息等
function serializeArrayToJson(fn) {
    fn = fn.serializeArray();//获取当前表单的内容
    let result = {};
    fn.forEach(item => {
        result[item.name] = item.value;
    });
    return result;
}
