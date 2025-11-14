const canvas = document.getElementById('fog');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Partiklar för dimma
const fogParticles = [];
const colors = ['rgba(155, 60, 255, 0.05)', 'rgba(255, 104, 212, 0.05)', 'rgba(255, 181, 247,0.05)'];

class FogParticle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 50 + Math.random() * 150;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < -this.size || this.x > canvas.width + this.size ||
            this.y < -this.size || this.y > canvas.height + this.size) {
            this.reset();
        }
    }
    draw() {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Skapa 30 dimpartiklar
for (let i = 0; i < 30; i++) {
    fogParticles.push(new FogParticle());
}

// Animation
function animateFog() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fogParticles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateFog);
}

animateFog();



