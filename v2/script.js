(function () {
    this.settings = {
        maxvalue: 1024,
        tranferfactor: 7,
        energyloss: 1
    };

    var active = false,
        maxCells = 64,
        maxRows = 64,
        speed = 20;
    //var newState = null;
    var externalStateValues = null;
    var isActive;
    var tableViewer = new TableViewer();
    var matrix = new Matrix();

    function init() {
        matrix.Init(maxCells, maxRows);
        var table = tableViewer.BuildTable(maxCells, maxRows);
        document.getElementById("container").appendChild(table);
        newState = CopyArray(matrix.GetState());
        render();

        document.getElementById("active").onclick = toggleClickEvent;
        externalStateValues = CopyArray(matrix.GetState());

        setInterval(flow, 200);
    }

    function clickHandler(e) {
        var position = new PositionHelper(-1, -1);
        position.IdToRowCell(this.id);
        console.log(`${position.Row} - ${position.Cell}`)
        console.log(`${position.Row+1} - ${position.Cell}`)
        externalStateValues[position.Row][position.Cell] += 128;
        externalStateValues[position.Row][position.Cell-1] += 128;
        externalStateValues[position.Row][position.Cell+1] += 128;
        externalStateValues[position.Row-1][position.Cell] += 128;
        externalStateValues[position.Row-1][position.Cell-1] += 128;
        externalStateValues[position.Row-1][position.Cell+1] += 128;
        externalStateValues[position.Row+1][position.Cell] += 128;
        externalStateValues[position.Row+1][position.Cell-1] += 128;
        externalStateValues[position.Row+1][position.Cell+1] += 128;
    }

    function toggleClickEvent(e) {
        active = this.checked;
        activateMatrix(this.checked);
    }

    function flow() {
        //console.log("flow is " + active);

        if (active) {
            //console.log("newState " + JSON.stringify(newState));
           // console.log("matrix " + JSON.stringify(matrix.GetState()));

            processInput();
            update();
            render();
        }
    }

    function processInput() {

        //return document.getElementById("active").checked;
    }

    function update() {
        SetNewStateValues();
        AddExternalValues();
        LimitValues();
    }

    function SetNewStateValues() {
        for (var row = 0; row < maxRows; row++) {
            for (var cell = 0; cell < maxCells; cell++) {
                SetValueFromSurroundingCells(row, cell);
            }
        }
    }

    function SetValueFromSurroundingCells(row, cell) {
        var currentValue = matrix.GetValue(row, cell);
        var deltaValue = 0;

        for (var rowDelta = -1; rowDelta <= 1; rowDelta++) {
            for (var cellDelta = -1; cellDelta <= 1; cellDelta++) {
                if ((cellDelta == 0) && (rowDelta == 0)) { continue; }

                var pos = matrix.GetPositionAfterBorderBehaviour(row, cell, rowDelta, cellDelta);
                var diffValue = calculateDeltaFromSurroundingCell(pos, currentValue);
                deltaValue += diffValue;
                newState[pos.Row][pos.Cell] -= diffValue;
            }
        }

        newState[row][cell] += deltaValue * settings.energyloss;
    }

    function LimitValues() {

        for (var row = 0; row < maxRows; row++) {
            for (var cell = 0; cell < maxCells; cell++) {
                if (newState[row][cell] > this.settings.maxvalue) {
                    console.log("value overflow: " + newState[row][cell])
                    var restValue = this.settings.maxvalue - newState[row][cell];
                    newState[row][cell] = this.settings.maxvalue;
                    
                }

                if (newState[row][cell] < -this.settings.maxvalue) {
                    console.log("value underflow: " + newState[row][cell])
                    newState[row][cell] = -this.settings.maxvalue;
                }
            }
        }
    }

    function SpreadEnergy(row,cell,overflow){
        for (var rowDelta = -1; rowDelta <= 1; rowDelta++) {
            for (var cellDelta = -1; cellDelta <= 1; cellDelta++) {
                if ((cellDelta == 0) && (rowDelta == 0)) { 
                    newState[pos.Row][pos.Cell] =Math.sign(newState[pos.Row][pos.Cell] ) *this.settings.maxvalue
                    continue; }

                var pos = matrix.GetPositionAfterBorderBehaviour(row, cell, rowDelta, cellDelta);
                var diffValue = calculateDeltaFromSurroundingCell(pos, currentValue);
                deltaValue += diffValue;
                newState[pos.Row][pos.Cell] -= diffValue;
            }
        }
    }

    function calculateDeltaFromSurroundingCell(pos, currentValue) {
        var surroundingValue = matrix.GetValue(pos.Row, pos.Cell);
        var delta = surroundingValue - currentValue;

        if (delta <= 0) { return 0; }

        return delta / settings.tranferfactor;
    }

    function AddExternalValues() {
        for (var row = 0; row < maxRows; row++) {
            for (var cell = 0; cell < maxCells; cell++) {
                if (externalStateValues[row][cell] != 0) {
                    newState[row][cell] += externalStateValues[row][cell];
                    externalStateValues[row][cell] = 0;
                }
            }
        }
    }

    function activateMatrix(activated) {
        var tds = document.getElementsByTagName("td");

        for (i = 0; i < tds.length; i++) {
            if (activated) {
                tds[i].addEventListener("click", clickHandler, false);
                tds[i].style.borderColor = "silver";
            }
            else {
                tds[i].removeEventListener("click", clickHandler, false);
                tds[i].style.borderColor = "black";
            }
        }
    }

    function render() {
        for (var row = 0; row < maxRows; row++) {
            for (var cell = 0; cell < maxCells; cell++) {
                var intValue = parseInt(newState[row][cell])
                tableViewer.SetPositionValue(row, cell, intValue);
            }
        }

        matrix.SetState(newState);
    }

    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    init();
})();

