function retry(promise, time) {
    return new Promise((resolve, reject) => {
        function request() {
            promise().then((result) => {
                resolve(result);
            }).catch((err) => {
                if (time > 0) {
                    console.log('failed', time)
                    request();
                    time--;
                } else {
                    reject(err)
                }
            })
        }
        request();
    })
}

function axiosFn() {
    return new Promise((resolve, reject) => {
        const flge = Math.random(); //随机值
        
        setTimeout(() => {
            //大于0.7就是成功
            console.log(flge)
            if (flge > 0.7) {
                return resolve(flge);
            } else {
                return reject(flge);
            }
        }, 1000)
    })
}

retry(axiosFn, 10);