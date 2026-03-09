//将字符串中每个单词的首字母大写，单词以单个空格分隔。
function capitalizeWords(str) {
    if (!str) {
        return str;
    }
    console.log(str.split(' '));
    return str.split(' ').map((item) => {
        return item.charAt(0).toUpperCase() + item.slice(1);
    }).join(' ');
}

console.log(capitalizeWords('ser drgr  ff    rg'));


function capitalizeWordsWithReg(str) {
    if (!str) {
        return str;
    }
    return str.replace(new RegExp(/\b\w/g), char => char.toUpperCase());
}

console.log(capitalizeWordsWithReg('ser drgr  ff    rg'));
