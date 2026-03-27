/* Função que cria partículas brilhantes que flutuam em toda a tela*/
(function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position: fixed; inset: 0; z-index: 3;
    pointer-events: none; width: 100%; height: 100%;
  `;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const TOTAL = 100; 

  const particles = Array.from({ length: TOTAL }, () => ({
    x:     Math.random() * window.innerWidth,   
    y:     Math.random() * window.innerHeight,  
    r:     Math.random() * 1.4 + 0.3,           
    vx:    (Math.random() - 0.5) * 0.20,        
    vy:   -(Math.random() * 0.28 + 0.07),       
    alpha: Math.random() * 0.55 + 0.10,         
    life:  Math.random(),                        
    speed: Math.random() * 0.0035 + 0.0015,    
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.life += p.speed;
      if (p.life > 1) {
        p.life = 0;
        p.x    = Math.random() * canvas.width;
        p.y    = canvas.height + 5;
      }
      const fade = Math.sin(p.life * Math.PI);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180, 215, 255, ${p.alpha * fade})`;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
    });

    requestAnimationFrame(draw);
  }

  draw();
})();


/* Técnica chamada "ghost cursor" (rastro fantasma), onde um efeito de luz segue o cursor*/
(function initGhostCursor() {
  const canvas = document.getElementById('ghost-canvas');
  if (!canvas) return;

  canvas.style.cssText = `
    position: fixed; inset: 0;
    z-index: 100;
    pointer-events: none;
    width: 100%; height: 100%;
  `;

  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const mouse = { x: -200, y: -200 };
  const TRAIL_LENGTH = 15;
  const trail = Array.from({ length: TRAIL_LENGTH }, () => ({
    x: -200, y: -200, alpha: 0
  }));

  let lastMoveTime = 0;
  const FADE_DELAY    = 300;  
  const FADE_DURATION = 600; 
  let globalAlpha = 0; 

  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    lastMoveTime = performance.now();
    globalAlpha = 1; 
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const now = performance.now();
    const dt  = now - lastMoveTime;
    if (dt > FADE_DELAY) {
      const progress = Math.min(1, (dt - FADE_DELAY) / FADE_DURATION);
      globalAlpha = Math.max(0, 1 - progress * progress);
    }

    for (let i = TRAIL_LENGTH - 1; i > 0; i--) {
      trail[i].x = trail[i - 1].x;
      trail[i].y = trail[i - 1].y;
    }
    trail[0].x = mouse.x;
    trail[0].y = mouse.y;

    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const t = 1 - i / TRAIL_LENGTH;

      const radius = t * 20 + 2; 
      const pointAlpha = t * t * 0.1 * globalAlpha; 

      if (pointAlpha < 0.002) continue; 

      const grad = ctx.createRadialGradient(
        trail[i].x, trail[i].y, 0,
        trail[i].x, trail[i].y, radius
      );

      grad.addColorStop(0,   `rgba(160, 210, 255, ${pointAlpha})`);
      grad.addColorStop(1,   `rgba(100, 160, 255, 0)`);

      ctx.beginPath();
      ctx.arc(trail[i].x, trail[i].y, radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }

    if (globalAlpha > 0.01) {
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180, 220, 255, ${0.3 * globalAlpha})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  draw();
})();

/* Função responsável pelo glow do botão ao passar o cursor em cima - ideia tirada do site React Bits*/ 
(function initBorderGlow() {

    const card = document.querySelector('.border-glow-card');
    if (!card) return;
    const INFLUENCE_RADIUS = 120; 

    function onMouseMove(e) {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxRadius = Math.sqrt(
        (rect.width  / 2) * (rect.width  / 2) +
        (rect.height / 2) * (rect.height / 2)
        ) + INFLUENCE_RADIUS;
        const proximity = Math.max(0, Math.min(100, (1 - dist / maxRadius) * 100));
        const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        card.style.setProperty('--edge-proximity', proximity.toFixed(1));
        card.style.setProperty('--cursor-angle',   `${angle.toFixed(1)}deg`);
    }

    function onMouseLeave() {
        card.style.setProperty('--edge-proximity', '0');
    }
    window.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
})();