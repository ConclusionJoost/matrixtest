function RgbColor(rgbValue) {
    let color = String(rgbValue),
    
        byte2Hex = function (n) {
            var nybHexString = "0123456789ABCDEF";
            return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
        },

        setColor = function(red, green, blue)        {
            var redValue = checkColor(red);
            var greenValue = checkColor(green);
            var blueValue = checkColor(blue);
            
            color = '#' + byte2Hex(redValue) + byte2Hex(greenValue) + byte2Hex(blueValue);;
        },

        checkColor = function(value){
            var colValue = parseInt(value)
            if(colValue<0) return 0;
            if(colValue>255) return 255;
            return colValue;
        },

        hue2Color = function(i) {
            var frequency = 1 / 64  ;
            var red = Math.sin(frequency * i + 0) * 127 + 128;
            var  green = Math.sin(frequency * i + 8) * 127 + 128;
            var blue = Math.sin(frequency * i + 16) * 127 + 128;
        
            setColor(red, green, blue);
        },
        red =() =>{
            var redHex =  color.substr(1,2);
            return parseInt(redHex, 16);
        },
        green =() =>{
            var greenHex =  color.substr(3,2);
            return parseInt(greenHex, 16);
        },
        blue =() =>{
            var blueHex =  color.substr(5,2);
            return parseInt(blueHex, 16);
        }


    return { 
        Get: color,
        SetColor : setColor,
        Hue2Color : hue2Color,
        Red : red,
        Green : green,
        Blue : blue
    };
}