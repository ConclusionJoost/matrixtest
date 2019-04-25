function PositionHelper(row, cell) {
    this.row = row;
    this.cell = cell;

    var rowCellToId = function () {
        return cell + "_" + row;
    },

        idToRowCell = function (id) {
            var cellRow = id.split("_");
            this.Cell = cellRow[0];
            this.Row = cellRow[1];
        }

    return {
        IdToRowCell: idToRowCell,
        RowCellToId: rowCellToId,
        Row: row,
        Cell: cell
    };
}