
class PositionHelper {
    constructor(row, cell) {
        this.row = parseInt(row);
        this.cell = parseInt(cell);
        var rowCellToId = function () {
            return cell + "_" + row;
        }, idToRowCell = function (id) {
            var cellRow = id.split("_");
            this.Cell = parseInt(cellRow[0]);
            this.Row = parseInt(cellRow[1]);
        };
        return {
            IdToRowCell: idToRowCell,
            RowCellToId: rowCellToId,
            Row: row,
            Cell: cell
        };
    }
}
