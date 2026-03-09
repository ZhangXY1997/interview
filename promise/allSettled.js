Promise.myAllSettled = function(promisesList) {
    if (!Array.isArray(promisesList)) {
        return Promise.reject(new TypeError('param must be an array'));
    }

    if (promisesList.length === 0) {
        return Promise.resolve([]);
    }

    return new Promise((resolve) => {
        const result = new Array(promisesList.length);
        let count = 0;
        promisesList.forEach((p, index) => {
            Promise.resolve(p).then((res) => {
                result[index] = {status: 'fulfilled', value: res};
            }).catch((e) => {
                result[index] = {status: 'rejected', reason: e};
            }).finally(() => {
                count++;
                if (count === promisesList.length) {
                    resolve(result);
                }
            })
        })
    })
}