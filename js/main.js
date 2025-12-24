(function(){
  // Nebula canvas particles
  const canvas=document.getElementById('nebula');
  const ctx=canvas.getContext('2d');
  let w,h,particles=[];
  function resize(){w=canvas.width=window.innerWidth;h=canvas.height=window.innerHeight}
  window.addEventListener('resize',resize);resize();
  function rand(min,max){return Math.random()*(max-min)+min}
  function create(){for(let i=0;i<120;i++){particles.push({x:rand(0,w),y:rand(0,h),r:rand(0.6,2.8),vx:rand(-0.2,0.2),vy:rand(-0.1,0.1),h:rand(180,320)})}}
  create();
  function draw(){ctx.clearRect(0,0,w,h);
    // soft gradient background
    const g=ctx.createLinearGradient(0,0,w,h);g.addColorStop(0,'#04102a');g.addColorStop(1,'#020312');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
    // draw particles
    particles.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x< -50) p.x=w+50; if(p.x>w+50) p.x=-50; if(p.y<-50) p.y=h+50; if(p.y>h+50) p.y=-50;
      const grad=ctx.createRadialGradient(p.x,p.y,p.r*0.2,p.x,p.y,p.r*6);
      grad.addColorStop(0,'rgba(106,227,255,0.9)');
      grad.addColorStop(0.4,'rgba(199,123,255,0.35)');
      grad.addColorStop(1,'rgba(2,6,22,0)');
      ctx.fillStyle=grad;ctx.beginPath();ctx.arc(p.x,p.y,p.r*6,0,Math.PI*2);ctx.fill();
    });
    window.requestAnimationFrame(draw);
  }
  draw();

  // Language toggle (FR/EN)
  const langBtn=document.getElementById('langBtn');
  let lang='fr';
  const translations={
    en:{ 'Accueil':'Home','À propos':'About','Projets':'Projects','CV':'Resume','Contact':'Contact','Voir mes projets':'See projects','Télécharger le CV':'Download CV','Envoyer':'Send' },
    fr:{} // default content already in French
  };
  langBtn.addEventListener('click',()=>{
    lang = (lang==='fr')?'en':'fr';
    langBtn.textContent = (lang==='fr')?'EN':'FR';
    if(lang==='en'){
      document.querySelector('h1').textContent = 'Digital Creator & Developer';
      document.querySelector('.lead').textContent = 'I build immersive web experiences — interfaces, visualizations and interactive prototypes.';
      document.querySelectorAll('nav a').forEach(a=>{ if(a.textContent.trim()==='Accueil') a.textContent='Home'; if(a.textContent.trim()==='À propos') a.textContent='About'; if(a.textContent.trim()==='Projets') a.textContent='Projects'; if(a.textContent.trim()==='CV') a.textContent='Resume'; if(a.textContent.trim()==='Contact') a.textContent='Contact'; });
    } else { location.reload(); }
  });

  // Small accessibility: focus outline on keyboard nav
  document.addEventListener('keyup',e=>{ if(e.key==='Tab') document.body.classList.add('show-focus'); });
})();
