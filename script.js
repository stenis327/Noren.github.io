let particles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
}

function draw() {
    background(0, 10); // Lätt genomskinlig bakgrund för rörelseåtergivning
    
    // Skapa nya partiklar vid basen för att simulera en eldflamma
    if (frameCount % 5 === 0) {
        particles.push(new FireParticle(random(width / 2 - 50, width / 2 + 50), height));
    }

    // Uppdatera och visa partiklar
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].show();
        if (particles[i].isFinished()) {
            particles.splice(i, 1);
        }
    }
}

class FireParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(8, 15);
        this.lifespan = 255; // Hur länge partikeln lever
        this.velocity = createVector(random(-1, 1), random(-3, -6)); // Partikel-rörelse
    }

    isFinished() {
        return this.lifespan < 0;
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.lifespan -= 5; // Gör partikeln mer genomskinlig
    }

    show() {
        noStroke();
        fill(148, 0, 211, this.lifespan); // Lila färg med transparens
        ellipse(this.x, this.y, this.size);
    }
}

window.addEventListener('resize', () => {
    resizeCanvas(windowWidth, windowHeight);
});


