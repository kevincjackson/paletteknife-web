// Functions relating to Hsl's
// Hsl :: { h: Int, s: Int, l: Int }

// Get a contrasting Hsl color. Useful for text.
function contrast(hsl) {
    const new_s = 0;
    const new_l = hsl.l > 40 ? 20 : 80;
    return { h: hsl.h, s: new_s, l: new_l }
}

// Hsl -> String like "hsl:0,100,50"
function encode(hsl) {
    return `hsl:${hsl.h},${hsl.s},${hsl.l}`;
}

// String -> Hsl
// "hsl(0, 1%, 2%)" -> { h: 0, s: 1, l: 2 }
function fromCss(hslString) {
    const xs = hslString.replace(/[ %hsl()]/g, "").split(",").map(x => parseFloat(x));
    return { h: xs[0], s: xs[1], l: xs[2] }
}

// Check for a well formed Hsl object. -> Bool
function isValid(obj) {
    return [obj.h, obj.s, obj.l].map(x => parseFloat(x)).every(x => !isNaN(x))
}

// Create random Hsl
function rand() {
    return { 
        h: Math.floor(Math.random() * 360),
        s: Math.floor(Math.random() * 101),
        l: Math.floor(Math.random() * 101)
    };
}

// Hsl -> Css
// Ex) { h: 120, s: 50, l: 100 } -> hsl(120, 50, 100).
function toCss(obj) {
    return `hsl(${obj.h}, ${obj.s}%, ${obj.l}%)`;
}

// String -> Hsl || Null
function try_decode(hslString) {
    if (hslString.includes("hsl:")) {
        const xs = hslString.split(":")[1]
                            .split(",")
                            .map(x => parseFloat(x))
        if (xs.every(x => !isNaN(x)) && xs.length === 3) {
            return { h: xs[0], s: xs[1] , l: xs[2] };
        }
    }
    return null;
}

module.exports.contrast = contrast;
module.exports.encode = encode;
module.exports.fromCss = fromCss;
module.exports.isValid = isValid;
module.exports.rand = rand;
module.exports.toCss = toCss;
module.exports.try_decode = try_decode;
