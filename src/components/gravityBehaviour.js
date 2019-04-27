

const GravityBehaviour = (objectList, gravity)=>{
    objectList.forEach(element => {
        if (element.fixed ) { return }

        console.log('----'+ element.name + ' ' + element.ke+ ' ' + element.direction)
        var radians = element.direction/ radian

        var eHorizontaal = element.ke * Math.cos(radians)
        var eVerticaal = element.ke * Math.sin(radians)
        console.log(`element.ke=${element.ke}, element.direction = ${element.direction}, radians =${radians} eHorizontaal =${eHorizontaal}, eVerticaal = ${eVerticaal} `)
        //eVerticaal -= gravity;
        element.ke = Math.sqrt(Math.pow(eHorizontaal,2) + Math.pow(eVerticaal,2))
        element.direction = Math.tanh(eHorizontaal/ eVerticaal ) * radian;
        console.log('=' + element.name + ' ' + element.ke+ ' ' + element.direction)
    })
} 