// Hsl -> Css
// Ex) { h: 120, s: 50, l: 100 } -> hsl(120, 50, 100).
function toCss(obj) {
    return `hsl(${obj.h},${obj.s}%,${obj.l}%)`;
}

// Create random Hsl
function rand() {
    return { 
        h: Math.floor(Math.random() * 360),
        s: Math.floor(Math.random() * 101),
        l: Math.floor(Math.random() * 101)
    };
}

// Get a contrasting Hsl color. Useful for text.
function contrast(hsl) {
    let new_s = 0;
    let new_l = hsl.s > 50 ? 0 : 100;
    return { h: hsl.h, s: new_s, l: new_l }
}

module.exports.toCss = toCss;
module.exports.rand = rand;
module.exports.contrast = contrast;
