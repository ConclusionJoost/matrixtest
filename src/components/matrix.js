const Matrix = function () {
    var maxCells = 0;
    var maxRows = 0;
    var defaultValue = "#333333",
        changeValue = "#FFFFFF",
        currentState = Array(),

        init = (mxCells, mxRows, defaultVal) => {
            maxCells = mxCells;
            maxRows = mxRows;
            defaultValue = defaultVal;
            reset();
        },
        reset = () => {
            currentState = new Array(maxRows)

            for (var row = 0; row < maxRows; row++) {
                currentState[row] = new Array(maxCells);
                for (var cell = 0; cell < maxCells; cell++) {
                    setValue(row, cell, defaultValue);
                }
            }
        },

        getValue = (row, cell) => {
            validate(row, cell);

            return currentState[row][cell];
        },

        setValue = (row, cell, value) => {
            row = Math.round(row)
            cell = Math.round(cell)
            validate(row, cell);

            value = String(value)
            currentState[row][cell] = value;
        },

        validate = (row, cell) => {
            if (row >= maxRows) {
                row = maxRows - 1;
                // throw `Out of bounds: row = ${row} > ${maxRows}` 
            }
            if (cell >= maxCells) {
                cell = maxCells - 1;
                //throw `Out of bounds: cell = ${cell} >${maxCells}` 
            }

        },

        update = function () {
            for (var row = 0; row < maxRows; row++) {
                for (var cell = 0; cell < maxCells; cell++) {
                    var rgbColor = matrix.GetValue(row, cell);
                    if (rgbColor == changeValue) { rgbColor = defaultValue }
                    if (rgbColor != defaultValue) { rgbColor = changeValue }
                    setValue(row, cell, rgbColor);
                }
            }
        },

        getState = function () {
            return CopyArray(currentState);
        },

        setState = function (sourceArray) {
            currentState = CopyArray(sourceArray);
        },

        getPositionAfterBorderBehaviour = function (row, cell, rowDelta, cellDelta) {
            var newX = getRealPos(this.maxCells, cell, cellDelta);
            var newY = getRealPos(this.maxRows, row, rowDelta);

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
        Update: update,
        GetPositionAfterBorderBehaviour: getPositionAfterBorderBehaviour
    };
}