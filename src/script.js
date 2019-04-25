(function () {
    this.settings = {
        maxvalue: 128,
        tranferfactor: 7,
        energyloss: 1
    },
        this.objectList = [],
        this.matrix = new Matrix(),

        this.setBoardObjects = () => {
            this.matrix.Update();

            objectList.forEach(element => {
               // console.debug(`SetValue(${element.ypos},${element.xpos},${element.color.Get})`)
                matrix.SetValue(element.ypos, element.xpos, element.color.Get);
            });
        },

        this.checkCollisions = () => {
            // objectList.forEach(element => {

            // })
        }

    var active = false,
        maxCells = 64,
        maxRows = 64,
        speed = 20,
        cycle = 0,
        gravity = 0.0005,
        defaultValue = "#333333",
        defaultGlowValue = "#FFFFFF";

    var externalStateValues = null;
    var isActive;
    var tableViewer = new TableViewer();
    ;

    function init() {
        document.getElementById("active").onclick = toggleClickEvent;

        tableViewer.BuildTable("container", maxCells, maxRows);

        objectList[objectList.length] = new BoardObject(1, "dot1", 1, 0, 0, true, 15, 15, new RgbColor("#FF6666"))
        objectList[objectList.length] = new BoardObject(2, "dot2", 1, 0, 0, true, 50, 35, new RgbColor("#FF6666"))
        objectList[objectList.length] = new BoardObject(3, "ball1", 1, 0.5, 150, false, 4, 23, new RgbColor("#9999FF"))
        //objectList[objectList.length] = new BoardObject(4, "ball2", 1, 0.5, 270, false, 20, 42, new RgbColor("#9999FF"))

        matrix.Init(maxCells, maxRows, defaultValue);

        render();


        externalStateValues = CopyArray(matrix.GetState());

        setInterval(flow, 1000 / speed);
    }

    function clickHandler(e) {
        var position = new PositionHelper(-1, -1);
        position.IdToRowCell(this.id);
        externalStateValues[position.Row][position.Cell] = 128;
    }

    function toggleClickEvent(e) {
        active = this.checked;
        activateMatrix(this.checked);
    }

    function flow() {
        if (active) {
            console.log("cycle : " + cycle);

            processInput();
            update();
            render();

            cycle++;
        }
    }

    function processInput() {
        moveObjects(objectList)
    }

    function update() {
        BoundaryBehaviour(objectList, maxRows, maxCells);
        GravityBehaviour(objectList,gravity)
        this.checkCollisions();
        this.setBoardObjects();
    }

    function activateMatrix(activated) {
        var tds = document.getElementsByTagName("td");

        for (var i = 0; i < tds.length; i++) {
            if (activated) {
                tds[i].addEventListener("click", clickHandler, false);
                tds[i].style.borderColor = "#222222";
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
                var rgbColor = matrix.GetValue(row, cell)
                tableViewer.SetBackgroundColor(row, cell, rgbColor)
            }
        }
    }

    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }



    init();
})();

