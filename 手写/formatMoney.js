function formatMoney(num) {
    //js中是获取不到number类型小数点后的零的个数
    const str = num.toString();
    const part = str.split('.');
    let res = [];

    let part0 = part[0];
    let sign = '';
    if (part0.startsWith('-')) {
        sign = '-';
        part0 = part0.slice(1)
    }
    if (part0) {
        let count = 0;
        for (let i = part0.length - 1; i >= 0; i--) {
            res.push(part0[i]);
            count++;

            if (count == 3 && i !== 0) {
                count = 0;
                res.push(',');
            }
        }
    }
    res = res.reverse();
    return part[1] ? `${sign}${res.join('')}.${part[1]}` : `${sign}${res.join('')}`;
}

console.log(formatMoney(-123945.00));