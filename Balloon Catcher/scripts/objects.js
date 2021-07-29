class Objects {
    constructor() {}
    man(x, y, man_image) {
        this.x = x;
        this.y = y;
        this.width = 34;
        this.height = 30;
        this.man_image = man_image;
        this.man_image.src = "images/man.gif";
        return this;
    }
    bullet(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    ufo(x, y, line, column, ufo_image, level) {
        this.x = x;
        this.y = y;
        this.line = line;
        this.column = column;
        this.width = 32;
        this.height = 24;
        this.ufo_image = ufo_image;
        this.level = level;

        this.ufo_image.src = (this.level % 2 == 0) ? "images/ufo2.png" : "images/ufo.png";
        return this;
    }
    bomb(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
};