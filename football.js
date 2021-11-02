// Team                           | MP |  W |  D |  L |  P
// Devastating Donkeys            |  3 |  2 |  1 |  0 |  7
// Allegoric Alaskans             |  3 |  2 |  0 |  1 |  6
// Blithering Badgers             |  3 |  1 |  0 |  2 |  3
// Courageous Californians        |  3 |  0 |  1 |  2 |  1



const WIN = 'win';
const LOSS = 'loss';
const DRAW = 'draw';
const DEF_OBJ = { W: 0, D: 0, L: 0 };


const resData = {};

const getList = data => {
    const inputArr = data.split('\n');
    inputArr.forEach(setData);
    printData(resData);
}

const setData = row => {
    const [t1, t2, c] = row.split(';');
    const t1Data = resData[t1] || { ...DEF_OBJ };
    const t2Data = resData[t2] || { ...DEF_OBJ };
    if (c === WIN) {
        t1Data.W += 1;
        t2Data.L += 1;
    } else if (c === LOSS) {
        t1Data.L += 1;
        t2Data.W += 1;
    } else if (c === DRAW) {
        t1Data.D += 1;
        t2Data.D += 1;
    } else {
        return;
    }
    resData[t1] = t1Data;
    resData[t2] = t2Data;
}

const printData = data => {

    const length = getLength(resData) + 5;//获取队伍名称长度，用以对齐展示格式

    console.log(`${'Team'.padEnd(length)} | MP | W | D | L | P`);
    Object.keys(data).forEach(team => {
        const { W, D, L } = data[team];
        const MP = W + D + L;
        const P = W * 3 + D;
        console.log(`${team.padEnd(length)} | ${(MP+'').padStart(2)} | ${W} | ${D} | ${L} | ${P}`);
    });
}

const getLength = resData => {
    let res = 4;//最小长度为字符串 Team 的长度
    Object.keys(resData).forEach(team => {
        res = team.length > res ? team.length : res;
    });
    return res;
}


//test
const data = `
Allegoric Alaskans;Blithering Badgers;win
Devastating Donkeys;Courageous Californians;draw
Devastating Donkeys;Allegoric Alaskans;win
Courageous Californians;Blithering Badgers;loss
Blithering Badgers;Devastating Donkeys;loss
Allegoric Alaskans;Courageous Californians;win
123
1;2;3
`;
getList(data);

// 用时22分钟
