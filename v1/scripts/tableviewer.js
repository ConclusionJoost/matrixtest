function TableViewer() {
    var dimensionX, 
    dimensionY,
    
    buildTable = function (dimensionX, dimensionY) {
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
                setElementValue(td, 0);
            }

            tbody.appendChild(row);
        }
        var table = document.createElement("table");
        table.appendChild(tbody);

        return table
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
    }
    
    return {
        BuildTable : buildTable,
        SetElementValue : setElementValue,
        SetPositionValue : setPositionValue
    }
}