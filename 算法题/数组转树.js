function mergeDeepList(arr) {
  let map = new Map();
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    map[arr[i].id] = arr[i];
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].pid) {
      if (!map[arr[i].pid].children) {
        map[arr[i].pid].children = [];
      }
      map[arr[i].pid].children.push(arr[i]);
      delete arr[i].pid;
    } else {
      result.push(arr[i]);
    }
  }
  return JSON.stringify(result);
}

// Example 1
console.log(mergeDeepList([{ id: 1 }, { id: 3, pid: 1 }, { id: 4 }]));
// Example 2
console.log(mergeDeepList([{ id: 3, pid: 1 }, { id: 4, pid: 3 }, { id: 1 }]));

const arr = [
  { id: "29", pid: "", name: "总裁办" },
  { id: "2c", pid: "", name: "财务部" },
  { id: "2d", pid: "2c", name: "财务核算部" },
  { id: "2f", pid: "2c", name: "薪资管理部" },
  { id: "d2", pid: "", name: "技术部" },
  { id: "d3", pid: "d2", name: "Java研发部" },
];

const data = [
  {
    id: "1",
    name: "父节点1",
    children: [
      {
        id: "1-1",
        name: "子节点1-1",
        children: [
          {
            id: "1-1-1",
            name: "子节点1-1-1",
          },
          {
            id: "1-1-2",
            name: "子节点1-1-2",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "父节点2",
    children: [
      {
        id: "2-1",
        name: "子节点2-1",
      },
    ],
  },
];

// 树转数组
function treeToList(data, parentId) {
  let result = [];
  data.forEach((item) => {
    const { children, ...otherItem } = item;
    result.push({ ...otherItem, parentId: parentId ?? item.id });
    if (children) {
      result = result.concat(treeToList(children, item.id));
    }
  });
  return result;
}

let listData = treeToList(data, null);
// console.log(listData);

// 数组转树
function listToTree(list) {
  let result = [];
  const map = {};
  for (let item of list) {
    const { id, parentId } = item;
    if (!map[id]) {
      map[id] = {};
    }
    //子节点是遍历到它的子序列加入的，现在遍历到它自己，所以更新它的item
    map[id] = { ...item, ...map[id] };
    if (parentId === id) {
      result.push(map[id]);
    } else {
      // 只有在这里的时候 才会对parent中的map 新增children
      if (!map[parentId]) {
        map[parentId] = {};
      }
      if (!map[parentId].children) {
        map[parentId].children = [];
      }
      map[parentId].children.push(map[id]);
    }
  }
  console.log(result);
}
// listToTree(listData);

function convert(list, id = "") {
  let res = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].pid === id) {
      res.push(list[i]);
      list[i].children = convert(list, list[i].id);
    }
  }
  return JSON.stringify(res);
}

console.log(convert(arr));
