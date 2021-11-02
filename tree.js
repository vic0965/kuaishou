//将输入的数组组装成一颗树状的数据结构，时间复杂度越小越好。要求程序具有侦测错误输入的能力。注意输入数组是无序的。




const getChildrenTree = data => {
    data.forEach(row => {
        row.children = [];
        if (!row.parentId) {
            row.isRoot = true;
        }
        data.forEach(node => {
            if (row.id === node.parentId) {
                row.children.push(node);
            }
        });
    });
    const res = data.filter(row => row.isRoot);

    if (res.length === 0) {
        throw '没有根节点';
    }
    if (res.length > 1) {
        throw '多个根节点';
    }

    const reg = /"id":\d+/g;
    const str = JSON.stringify(res);
    let regRes = null;
    for(let i=0;i<data.length;i++){
        const regRes = reg.exec(str);
        if(!regRes){
            throw '存在游离节点';
        }
    }
    console.log(str);
    return res;
}

//test
const data = [
    { id: 1, name: 'i1' },
    { id: 2, name: 'i2', parentId: 1 },
    { id: 4, name: 'i4', parentId: 3 },
    { id: 3, name: 'i3', parentId: 2 },
    // { id: 8, name: 'i8', parentId: 7 },
    { id: 5, name: 'i5', parentId: 2 },
    // { id: 101, name: '101', parentId: 102 },
    // { id: 102, name: '102', parentId: 101 },
]

getChildrenTree(data);

// 用时17分钟
