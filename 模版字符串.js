function render(str, obj) {
  const reg = /\${([^}]+)}/g;
  return str.replace(reg, (match, val) => {
    const value = eval(`obj.${val}`);
    console.log(value);
    return value;
  });
}

const tplStr = "<div>${a.b}</div><div>${a.c.d()}</div>";
const windowObj = {
  a: {
    b: 1,
    c: {
      d() {
        return "abc";
      },
    },
  },
};

console.log(render(tplStr, windowObj));
