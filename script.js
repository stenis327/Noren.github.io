let particles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
}

function draw() {
    background(0, 10); // Lätt genomskinlig bakgrund

    // Skapa nya partiklar vid basen
    if (frameCount % 5 === 0) {
        particles.push(new FireParticle(random(width / 2 - 25, width / 2 + 25), height));
    }

    // Uppdatera och visa partiklar
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].display();
        if (particles[i].isFinished()) {
            particles.splice(i, 1);
        }
    }
}

class FireParticle {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = createVector(random(-1, 1), random(-3, -5)); // Stiger uppåt
        this.size = random(5, 15);
        this.lifespan = 255;
    }

    isFinished() {
        return this.lifespan < 0;
    }

    update() {
        this.position.add(this.velocity);
        this.lifespan -= 4; // Partikeln blir mer genomskinlig
    }

    display() {
        fill(280, 255, 255, this.lifespan); // Lila färg
        ellipse(this.position.x, this.position.y, this.size);
    }
}

// Hantera storleksändringar
window.addEventListener('resize', () => {
    resizeCanvas(windowWidth, windowHeight);
});




