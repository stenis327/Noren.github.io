const canvas = document.getElementById('fireCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--fire-height'));
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Partiklar
const colors = ['#9b3cff','#ff68d4','#ffb5f7','#c14bff'];
const particles = [];

class Flame {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 50;
    this.size = 8 + Math.random() * 12;
    this.speedY = 1 + Math.random() * 2.5;
    this.speedX = (Math.random() - 0.5) * 1.2;
    this.alpha = 0.5 + Math.random() * 0.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    this.alpha -= 0.005;
    if (this.alpha <= 0 || this.y < 0) this.reset();
  }
  draw() {
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(0.5, this.color + '80');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}

// Skapa partiklar
for (let i = 0; i < 200; i++) {
  particles.push(new Flame());
}

// Animation
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    p.update();
    p.draw();
  }
  requestAnimationFrame(animate);
}

animate();



