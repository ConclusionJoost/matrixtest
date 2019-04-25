const BoundaryBehaviour = (objectList, maxRows, maxCells) => {
    objectList.forEach(element => {
        var bounceDirection = null;
        if (element.xpos < 0 && element.ypos < 0) {
             bounceDirection = 45;
            }
        if (element.xpos < 0 && element.ypos >= maxRows) {
            element.ypos = maxRows-1;
             bounceDirection = 135;
         }
        if (element.xpos >= maxCells && element.ypos < 0) {
             bounceDirection = 225;
             element.xpos = maxCells -1;
         }
        if (element.xpos >= maxCells && element.ypos >= maxRows) {
             bounceDirection =315 ;
             element.ypos = maxRows-1;
             element.xpos = maxCells -1;
        }

        if (element.xpos < 0) {
             bounceDirection = 90;
         }
        if (element.ypos < 0) {
             bounceDirection = 0;
         }
        if (element.xpos >= maxCells) {
             bounceDirection = 270;
             element.xpos = maxCells -1;
         }
        if (element.ypos >= maxRows) {
             bounceDirection = 180;
             element.ypos = maxRows-1;
         }
        
        if (bounceDirection!=null){
            bounceSolidObject(element, bounceDirection)
        }
    })
}