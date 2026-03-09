function rgb2hex(rgba) {
    const rgbRegExp = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
    const rgbaRegExp = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0?\.\d+|1|0)\)$/
    let match = rgba.match(rgbRegExp);
    let r, g, b;
    if (!match) {
        match = rgba.match(rgbaRegExp);
        if (!match) {
            return rgba;
        }
    }
    r = Number(match[1]);
    g = Number(match[2]);
    b = Number(match[3]);

    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
        return rgba;
    }

    const toHex = (c) => {
        const hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

console.log(rgb2hex("rgb(255, 255, 255)")); // #ffffff
console.log(rgb2hex("rgba(0, 0, 0, 0.5)"));   // #000000
console.log(rgb2hex("rgb(255, 0, 0)"));     // #ff0000
console.log(rgb2hex("rgb(0, 128, 255)"));   // #0080ff
console.log(rgb2hex("rgb(256, 0, 0)"));     // rgb(256, 0, 0) (无效值)
console.log(rgb2hex("not a color string")); // not a color string
console.log(rgb2hex("rgb(10, 20, 30)"));    // #0a141e