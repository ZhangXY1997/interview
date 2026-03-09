// const name = _.get(response, 'data.user.name', '游客');
// a.b[2].c
function get(obj, path, defaultValue) {
    // 1. 处理路径：如果是字符串，先转为数组    // 将 a[0].b 这种格式统一转换为 a.0.b 的形式然后分割    
    if (typeof path === 'string') { 
        path = path.replace(/\[(\d+)\]/g, '.$1').split('.'); 
    }

    const pathArray = path.split('.');
    let res = obj;
    for (const p of pathArray) {
        if (res === undefined || res === null) {
            res = undefined;
            break;
        }
        res = res[p];

    }
    return res === undefined ? defaultValue : res;
}