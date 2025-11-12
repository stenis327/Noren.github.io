let particles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0, 10); // Tålig bakgrund för att skapa en svag "svart" effekt
    let p = new Particle(random(width), height);
    particles.push(p);
    
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].show();
        if (particles[i].isFinished()) {
            particles.splice(i, 1);
        }
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.lifespan = 255;
        this.velocity = createVector(random(-1, 1), random(-3, -1));
    }

    isFinished() {
        return this.lifespan < 0;
    }

    update() {
        this.velocity.y += 0.05; // Gravitation
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.lifespan -= 4;
    }

    show() {
        noStroke();
        fill(148, 0, 211, this.lifespan);
        ellipse(this.x, this.y, 10);
    }
}

window.addEventListener('resize', () => {
    resizeCanvas(windowWidth, windowHeight);
});

