// Pausa animationerna om fliken inte är aktiv
document.addEventListener('visibilitychange', () => {
  const layers = document.querySelectorAll('.flame-layer');
  layers.forEach(layer => {
    layer.style.animationPlayState = document.hidden ? 'paused' : 'running';
  });
});





