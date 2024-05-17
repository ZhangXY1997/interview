var decodeString = function (s) {
  let str = "";
  let numStr = "";
  let result = [];
  let bracketsCount = 0;
  for (let i = 0; i < s.length; i++) {
    if (!isNaN(Number(s[i]))) {
      numStr += s[i];
    } else {
      if (s[i] === "[") {
        bracketsCount++;
        str += s[i];
      } else if (s[i] === "]") {
        bracketsCount--;
        str += s[i];
        if (bracketsCount === 0) {
          console.log(str);
          let child = decodeString(str.slice(1, str.length - 1));

          for (let j = 0; j < Number(numStr); j++) {
            result.push(child);
          }
          numStr = "";
          str = "";
        }
      } else {
        if (numStr) {
          str += s[i];
        } else {
          result.push(s[i]);
        }
      }
    }
  }
  return result.join("");
};

decodeString("3[a2[c]]");
