function CopyArray(sourceArray) {
    //console.log("^CopyArray orig " + JSON.stringify(sourceArray));
    var copyArray = new Array(sourceArray.length);

    for (var row = 0; row < sourceArray.length; row++) {
        /*var cellArray = new Array(sourceArray[row].length);

        for (var cell = 0; cell < sourceArray[row].length; cell++) {
            cellArray[cell] = sourceArray[row][cell];
        }
        copyArray[row] = cellArray;
        */
       copyArray[row] = [...sourceArray[row]];
    }
    //console.log("^CopyArray copy " + JSON.stringify(sourceArray));
    
    return copyArray;
}