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

function treeToList(data, res = [], pid) {
    data.forEach(item => {
        res.push({id: item.id, name: item.name, pid})
        if (item.children?.length > 0) {
            treeToList(item.children, res, item.id);
        }
    })
    return res;
}

console.log(treeToList(data))
