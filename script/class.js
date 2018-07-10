class Parent {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}

class Block extends Parent {
    constructor(x, y, w, h, type) {
        super(x, y, w, h);
        this.type = type;
    }
}

class Player extends Parent{
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.started = false;
        this.gravity = 0.2;
        this.speedX = 3;
        this.speedY = 3;
    }

    move(){

    }

    jump(){

    }
}