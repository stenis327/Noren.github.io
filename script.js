const canvas = document.getElementById('fog');
const ctx = canvas.getContext('2d');

// Anpassa canvas till fönsterstorlek
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Dimpartiklar
const fogParticles = [];
const colors = [
  'rgba(155,60,255,0.05)',
  'rgba(255,104,212,0.05)',
  'rgba(255,181,247,0.05)'
];

class FogParticle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 50 + Math.random() * 150;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.x < -this.size) this.x = canvas.width + this.size;
        if(this.x > canvas.width + this.size) this.x = -this.size;
        if(this.y < -this.size) this.y = canvas.height + this.size;
        if(this.y > canvas.height + this.size) this.y = -this.size;
    }
    draw() {
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        grad.addColorStop(0, this.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
    }
}

// Skapa dimma
for(let i=0;i<40;i++) fogParticles.push(new FogParticle());

// Animera dimman
function animateFog(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    fogParticles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateFog);
}
animateFog();


