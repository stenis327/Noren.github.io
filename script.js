let fireParticles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);
}

function draw() {
    background(0, 10); // lite genomskinlig bakgrund för att skapa en illusion av rörelse
    
    // Skapa nya partiklar
    if (frameCount % 2 === 0) {
        fireParticles.push(new FireParticle(random(width), height));
    }

    // Uppdatera och visa partiklar
    for (let i = fireParticles.length - 1; i >= 0; i--) {
        fireParticles[i].update();
        fireParticles[i].show();
        if (fireParticles[i].isFinished()) {
            fireParticles.splice(i, 1);
        }
    }
}

class FireParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(5, 15);
        this.lifespan = 255; // Hur länge partikeln lever
        this.velocity = createVector(random(-1, 1), random(-2, -5));
    }

    isFinished() {
        return this.lifespan < 0;
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.lifespan -= 4; // Partikeln blir snabbt genomskinlig
    }

    show() {
        noStroke();
        fill(255, random(100, 255), 0, this.lifespan); // Lila-orange färg
        ellipse(this.x, this.y, this.size);
    }
}

window.addEventListener('resize', () => {
    resizeCanvas(windowWidth, windowHeight);
});

