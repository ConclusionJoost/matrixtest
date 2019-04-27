const BoundaryBehaviour = (objectList, maxRows, maxCells) => {
    objectList.forEach(element => {
        var bounceDirection = null;
        if (element.xpos < 0 && element.ypos < 0) {
             bounceDirection = 315;
            }
        if (element.xpos < 0 && element.ypos >= maxRows) {
            element.ypos = maxRows-1;
             bounceDirection = 45;
         }
        if (element.xpos >= maxCells && element.ypos < 0) {
             bounceDirection = 225;
             element.xpos = maxCells -1;
         }
        if (element.xpos >= maxCells && element.ypos >= maxRows) {
             bounceDirection =135 ;
             element.ypos = maxRows-1;
             element.xpos = maxCells -1;
        }

        if (element.xpos < 0) {
            console.debug("LEFT SIDE")
             bounceDirection = 0;
         }
        if (element.ypos < 0) {
            console.debug("TOP SIDE")
             bounceDirection = 90;
         }
        if (element.xpos >= maxCells) {
            console.debug("RIGHT SIDE")
             bounceDirection = 180;
             element.xpos = maxCells -1;
         }
        if (element.ypos >= maxRows) {
            console.debug("BOTTOM SIDE")
             bounceDirection = 270;
             element.ypos = maxRows-1;
         }
        
        if (bounceDirection!=null){
            bounceSolidObject(element, bounceDirection)
        }
    })
}