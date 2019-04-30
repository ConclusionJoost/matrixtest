

const GravityBehaviour = (objectList, gravity)=>{
    objectList.forEach(element => {
        if (element.fixed ) { return }

        console.log(`<----'${element.name}' e:${limit(element.ke)} d:${limit(element.direction)}`)
        var radians = element.direction/ radian

        var eHorizontaal = element.ke * Math.sin(radians)
        var eVerticaal = element.ke * Math.cos(radians)
        console.log(`element.ke=${limit(element.ke)}, element.direction = ${limit(element.direction)}, radians =${limit(radians)} eHorizontaal =${limit(eHorizontaal)}, eVerticaal = ${limit(eVerticaal)} `)
        //eVerticaal += gravity;
        element.ke = Math.sqrt(Math.pow(eHorizontaal,2) + Math.pow(eVerticaal,2))
        element.direction = Math.atan(eHorizontaal/ eVerticaal ) * radian *  Math.sign(eHorizontaal);

        console.log(`>----'${element.name}' e:${limit(element.ke)} d:${limit(element.direction)}`)
    })
} 