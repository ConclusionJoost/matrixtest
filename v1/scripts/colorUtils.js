
function byte2Hex(n) {
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
}

function RGB2Color(r, g, b) {
    return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function Hue2Color(i) {
    var frequency = 1 / 64;
    red = Math.sin(frequency * i + 8) * 127 + 128;
    green = Math.sin(frequency * i + 0) * 127 + 128;
    blue = Math.sin(frequency * i + 4) * 127 + 128;

    return RGB2Color(red, green, blue);
}

// var frequency = 1 / 64;
// var amplitude = 127;
// var center = 128;

// document.write('<hr/>');

// for (var i = 0; i < 32; ++i) {
//     v = Math.sin(frequency * i) * amplitude + center;

//     // Note that &#9608; is a unicode character that makes a solid block
//     document.write('<font style="color:' + RGB2Color(v, v, v) + '">&#9608;</font>');
// }

// document.write('<hr/>');

// for (var i = -128; i < 128; ++i) {
//     red = Math.sin(frequency * i + 8) * 127 + 128;
//     green = Math.sin(frequency * i + 0) * 127 + 128;
//     blue = Math.sin(frequency * i + 4) * 127 + 128;

//     document.write('<font color="' + RGB2Color(red, green, blue) + '">|</font>');
// }