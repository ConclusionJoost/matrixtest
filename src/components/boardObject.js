class BoardObject {
    constructor(id, name, massa, ke, direction, fixed, xpos, ypos, color) {
        this.id = parseInt(id);
        this.name = String(name);
        this.massa = parseInt(massa);
        this.ke = ke;
        this.direction = parseInt(direction);
        this.fixed = fixed;
        this.xpos = parseInt(xpos);
        this.ypos = parseInt(ypos);
        this.color = color;
    };
}