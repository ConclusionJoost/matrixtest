const moveObjects = objectList => {
    objectList.forEach(moveObject);
}

const moveObject = element => {
    if (element.fixed) { return }
    var v = Math.sqrt(2 * element.ke) / element.massa;

    var radians = element.direction / radian
    var xdelta = v * Math.cos(radians)
    var ydelta = v * Math.sin(radians)

    //console.debug(`v ${v}, direction ${element.direction}, radians ${radians}: xdelta ${xdelta}, ydelta ${ydelta}`)
    element.xpos += xdelta;
    element.ypos += ydelta;
}

const bounceSolidObject = (element, bounceDirection) => {
    console.debug(`element '${element.name}':  direction : ${element.direction} , bounceDirection : ${bounceDirection}`)
    console.log(`element '${element.name}' : x${element.xpos}, y${element.ypos}`)

    var relativeDirection = (360 + element.direction - bounceDirection) % 360
    if (relativeDirection >= 270 || relativeDirection <= 90) {
        console.warn(`relativeDirection error: ${relativeDirection}`)
        return;
    }
    if (relativeDirection > 180) {
        element.direction = (bounceDirection + 360 - (relativeDirection - 180)) % 360
    }

    if (relativeDirection > 90 && relativeDirection <= 180) {
        element.direction = (bounceDirection + (180 - relativeDirection)) % 360
    }
}
