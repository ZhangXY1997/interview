class Man {
    constructor() {
        this.list = [];
        setTimeout(async() => {
            for(let i = 0; i < this.list.length; i++) {
                await this.list[i].fn();
            }
        }, 0)
    }

    say(t) {
        this.list.push({
            type: 'say',
            fn: () => console.log(t)
        })
        return this;
    }

    sleep(t) {
        this.list.push({
            type: 'sleep',
            fn: () => new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, t)
            })
        })
        return this;
    }
}

const a = new Man();
a.sleep(3000).say('hi').sleep(2000).say('kkk')
