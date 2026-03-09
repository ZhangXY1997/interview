function jsonStringify(value) {
    if (typeof value === 'string') {
        return `"${value}"`;
    } else if (typeof value === 'number' || typeof value === 'boolean') {
        return `${value}`;
    } else if (Array.isArray(value)) {
        return `[${value.join(',')}]`;
    } else if (typeof value === 'object') {
        if (value === 'null') return 'null';
        let keys = Object.keys(value);
        let arr = [];
        for (let i = 0; i < keys.length; i++) {
            arr.push(jsonStringify(keys[i]) + ':' + jsonStringify(value[keys[i]]));
        }
        return `{${arr.join(',')}}`;
    }
}

console.log(jsonStringify([1,2,3]))
console.log(jsonStringify({a:1, b:3, c: {d:2}}))
console.log(JSON.stringify({a:1, b:3, c: {d:2}}))

console.log(jsonStringify('123'))
console.log(JSON.stringify(true))
console.log(jsonStringify(true))


