(function () {
    var maxCells = 4;
    var maxRows = 4;
    var speed = 20;
    var maxvalue = 256;
    var newState = null;
    var externalStateValues = null;


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
    }

    function clickHandler(e) {
        var position = new PositionHelper(-1, -1);
        position.IdToRowCell(this.id);
        externalStateValues[position.Row][position.Cell] = 128;

    }

    function toggleClickEvent(e) {
        activateMatrix(this.checked);
        if (this.checked) {
            flow();
        }
    }

    function flow() {
        var active = true;
        while (active) {
            console.log("newState " + JSON.stringify(newState));
            console.log("matrix " + JSON.stringify(matrix.GetState()));
            console.log("flow is " + active);
            active = function(){processInput()} ;
            console.log("1 processInput " + active);
            update();
            console.log("2 flow update " + active);
            render();
            console.log("3 flow rendered " + active);
            //active = false;
        }
    }

    function processInput() {
        sleep(5000);
        return document.getElementById("active").checked;
    }

    function update() {
        SetNewStateValues();
        AddExternalValues();
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

        newState[row][cell] += deltaValue;
    }

    function calculateDeltaFromSurroundingCell(pos, currentValue) {
        var surroundingValue = matrix.GetValue(pos.Row, pos.Cell);
        var delta = surroundingValue - currentValue;

        if (delta <= 0) { return 0; }

        return delta / 8;
    }

    function AddExternalValues() {
        console.log("externalStateValues " + JSON.stringify(externalStateValues));
        for (var row = 0; row < maxRows; row++) {
            for (var cell = 0; cell < maxCells; cell++) {
                if (externalStateValues[row][cell] != 0) {
                    console.log("** manualValue: " + externalStateValues[row][cell]);
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
                tds[i].style.borderColor = "White";
            }
            else {
                tds[i].removeEventListener("click", clickHandler, false);
                tds[i].style.borderColor = "silver";
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

