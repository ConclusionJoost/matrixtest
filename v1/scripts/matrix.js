var Matrix = function () {
    var maxCells = 0;
    var maxRows = 0;
    var currentState = null;
    var newState = null;

    var init = function (maxCells, maxRows) {
        this.maxCells = maxCells;
        this.maxRows = maxRows;

        currentState = new Array(maxRows);
        
        for (var row = 0; row < maxRows; row++) {
            currentState[row] =new Array(maxCells);
            for (var cell = 0; cell < maxCells; cell++) {
                currentState[row][cell] = 0;
            }
        }

        console.log("currentState " + JSON.stringify(currentState));
    },

    getValue = function (row, cell) {
        return currentState[row][cell];
    },

    setValue = function (row, cell, value) {
        rowArr[row][cell] = value;
        console.log("-- setValue : "+ row + "," + cell + "=" + value + "[" + currentState[row][cell] + "]");
        //currentState[row,cell] = value;
        //console.log(row + "," + cell + "=" + value + "[" + currentState[row,cell] + "]");
    },

    getState = function () {
        return CopyArray(currentState);
    },

    setState = function (sourceArray) {
        currentState = CopyArray(sourceArray);
    },
    
    getPositionAfterBorderBehaviour = function(row, cell, rowDelta, cellDelta){
        var newX =  getRealPos(this.maxCells, cell, cellDelta);
        var newY =  getRealPos(this.maxRows, row, rowDelta);

        return new PositionHelper(newY, newX);        
    },
    
    getRealPos = function (maxDim, posValue, diff) {
        var realPos = posValue + diff;
        if (realPos < 0) { realPos = realPos + maxDim; }
        if (realPos >= maxDim) { realPos = realPos - maxDim; }

        return realPos;
    }

    return {
        Init: init,
        GetValue: getValue,
        SetValue: setValue,
        GetState: getState,
        SetState: setState,
        GetPositionAfterBorderBehaviour : getPositionAfterBorderBehaviour
    };
}