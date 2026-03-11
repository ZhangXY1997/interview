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

function LazyMan(name) {
  const man = {};
  man.queue = [];

  man.eat = function (food) {
    const fn = function () {
      console.log(`eat ${food}`);
    };
    man.queue.push(fn);
    return man;
  };

  man.sleep = function (time) {
    const fn = async function () {
      await new Promise(resolve => {
        setTimeout(resolve, time * 1000);
      });
    };
    man.queue.push(fn);
    return man;
  };

  const init = async function () {
    console.log(name);

    for (let i = 0; i < man.queue.length; i++) {
      await man.queue[i]();
    }
  };

  setTimeout(() => {
    init();
  }, 0);

  return man;
}
LazyMan('张三').sleep(1).eat('苹果').sleep(2).eat('香蕉');
