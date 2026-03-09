// abbbaca => aaca => ca


function func(str) {
  const result = [];
  let i = 0;
  while ( i < str.length) {
    if (str[i] === result[result.length - 1]) {
      while (str[i] === result[result.length - 1]) {
        i++;
      }
      result.pop();
    } else {
      result.push(str[i]);
      i++;
    }
  }
  return result.join('');
}

console.log(func('abbbaca'))
