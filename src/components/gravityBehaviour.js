const GravityBehaviour = (objectList, gravity)=>{
    objectList.forEach(element => {
        if(element.fixed){
            return
        }
        console.log(element.name + ' ' + element.ke+ ' ' + element.direction)
        var radians = element.direction/ (180/Math.PI)
        var eHorizontaal = element.ke * Math.sin(radians)
        var eVerticaal = element.ke * Math.cos(radians)
        eVerticaal += gravity;
        element.ke = Math.sqrt(Math.pow(eHorizontaal,2) + Math.pow(eVerticaal,2))
        element.direction = (180/Math.PI) * Math.tan(eVerticaal/ eHorizontaal);
        console.log('=' + element.name + ' ' + element.ke+ ' ' + element.direction)
    })
} 