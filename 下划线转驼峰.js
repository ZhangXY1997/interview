function toHump(str) {
  return str.replace(/\_([a-z])/g, (match, letter) => {
    return letter.toUpperCase();
  });
}
