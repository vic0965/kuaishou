class Bus {
    constructor() {
        this.task = {};
        this.link = [];
    }

    addListen = (name, fn) => {
        this.task[name] = fn;
    }

    delListen = name => {
        delete this.task[name];
    }

    trigger = (...arg) => {
        const [name, ...param] = arg;
        if (typeof this.task[name] === 'function') {
            if (this.isLoop(name)) {
                throw `${name} 在调用时，发现循环调用，已终止`;
            }
            this.link.push([name, this.task[name].name, this.task[name] + ""]);
            this.print(this.link);
            this.task[name](...param);
            this.link.pop();
        } else {
            throw '回调事件非可执行方法';
        }
    }

    isLoop = name => {
        for (let i = this.link.length - 1; i >= 0; i--) {
            if (this.link[i][2].indexOf('async')===0) return false;
            if (this.link[i][0] === name) return true;
        }
        return false;
    }

    print = arr => {
        const obj = arr[arr.length - 1];
        console.log(`${''.padStart((arr.length - 1) * 5)}${arr.length === 1 ? '' : '|-'}event: ${obj[0]}`);
        console.log(`${''.padStart((arr.length - 1) * 5 + 2)}|--callback:${obj[1]}`);
    }
}

// test

// //添加监听
// const b = new Bus();
// b.addListen('e1', function (x, y) { console.log(x + y); });
// b.trigger('e1', 1, 2);

// //树形结构
// const b1 = new Bus();
// b1.addListen('e1', function () { });
// b1.addListen('e2', function e2fn() { b1.trigger('e4'); });
// b1.addListen('e1', function e1fn() { b1.trigger('e2'); b1.trigger('e3'); });
// b1.addListen('e3', function e3fn() { });
// b1.addListen('e4', function e4fn() { });
// b1.trigger('e1');

// //循环
// const b2 = new Bus();
// b2.addListen('e1', function e1fn() { b2.trigger('e2'); b2.trigger('e3'); });
// b2.addListen('e2', function e2fn() { });
// b2.addListen('e3', function e3fn() { b2.trigger('e1'); });
// b2.trigger('e1');

// // async  可运行循环
// const b3 = new Bus();
// b3.addListen('e1', async function e1fn() {
//     await new Promise(r => setTimeout(r, 1000));
//     b3.trigger('e2');
// });
// b3.addListen('e2', function e2fn() { b3.trigger('e3'); });
// b3.addListen('e3', function e3fn() { b3.trigger('e1'); });
// b3.trigger('e1');

// async 存在不可运行循环
const b4 = new Bus();
b4.addListen('e1', async function e1fn() {
    await new Promise(r => setTimeout(r, 1000));
    b4.trigger('e2');
});
b4.addListen('e2', function e2fn() { b4.trigger('e3'); });
b4.addListen('e3', function e3fn() { b4.trigger('e2'); });
b4.trigger('e1');

// 用时72分钟
