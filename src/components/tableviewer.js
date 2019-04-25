function TableViewer() {
    var dimensionX, 
    dimensionY,
    
    buildTable = function (parentId, dimensionX, dimensionY) {
        this.dimensionX =dimensionX;
        this.dimensionY = dimensionY;

        var tbody = document.createElement("tbody")
        for (var y = 0; y < dimensionY; y++) {
            var row = document.createElement("tr");

            for (var x = 0; x < dimensionX; x++) {
                var td = document.createElement("td");
                var position = new PositionHelper(y, x);
                td.id = position.RowCellToId();
                row.appendChild(td);
                //setElementValue(td, "#333333"); // y*dimensionX + x
            }

            tbody.appendChild(row);
        }
        var table = document.createElement("table");
        table.cellPadding = 0;
        table.cellSpacing = 0;
        table.appendChild(tbody);

        document.getElementById(parentId).appendChild(table);
    },

    setPositionValue = function(row, cell, value){
        var position = new PositionHelper(row,cell);
        var id = position.RowCellToId();
        var el = document.getElementById(id);
        setElementValue(el, value);
    },

    setElementValue = function (el, value) {
        var color = Hue2Color(value);
        el.style.backgroundColor = color;
        el.innerHTML = value;
    },

    setBackgroundColor = function (row, cell, backgroundColorValue) {
        var position = new PositionHelper(row,cell);
        var id = position.RowCellToId();
        var el = document.getElementById(id);
        el.style.backgroundColor = backgroundColorValue;
    }
    
    return {
        BuildTable : buildTable,
        SetElementValue : setElementValue,
        SetBackgroundColor : setBackgroundColor,
        //SetPositionValue : setPositionValue
    }
}