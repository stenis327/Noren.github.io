let particles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
}

function draw() {
    background(0, 10); // Lätt genomskinlig bakgrund för rörelseeffekt

    // Skapa nya partiklar från botten
    if (frameCount % 5 === 0) {
        particles.push(new Particle(random(width / 2 - 25, width / 2 + 25), height));
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

class Particle {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = createVector(random(-1, 1), random(-3, -5)); // Stiger uppåt
        this.size = random(8, 12);
        this.lifespan = 255; //



