// ===== PARTICLES & STARS =====
function initBg(){
  const bg=document.querySelector('.bg-layer');
  if(!bg)return;
  // Gold particles
  for(let i=0;i<(innerWidth<600?10:22);i++){
    const p=document.createElement('div');
    p.className='particle';
    p.style.left=Math.random()*100+'%';
    p.style.animationDuration=(9+Math.random()*14)+'s';
    p.style.animationDelay=(Math.random()*10)+'s';
    p.style.width=p.style.height=(1.5+Math.random()*2.5)+'px';
    bg.appendChild(p);
  }
  // Stars
  for(let i=0;i<(innerWidth<600?20:50);i++){
    const s=document.createElement('div');
    s.className='star';
    s.style.left=Math.random()*100+'%';
    s.style.top=Math.random()*100+'%';
    s.style.animationDelay=(Math.random()*4)+'s';
    s.style.animationDuration=(2+Math.random()*3)+'s';
    s.style.width=s.style.height=(1+Math.random()*1.5)+'px';
    bg.appendChild(s);
  }
}

// ===== SIDEBAR =====
function initSidebar(){
  const sb=document.getElementById('sidebar');
  const btn=document.getElementById('mob-toggle');
  const ov=document.getElementById('sb-overlay');
  if(!btn)return;
  btn.onclick=()=>{sb.classList.toggle('open');ov.classList.toggle('on')};
  ov.onclick=()=>{sb.classList.remove('open');ov.classList.remove('on')};
  document.querySelectorAll('.sb-nav li a').forEach(a=>{
    a.onclick=()=>{
      document.querySelectorAll('.sb-nav li').forEach(l=>l.classList.remove('active'));
      a.parentElement.classList.add('active');
      sb.classList.remove('open');ov.classList.remove('on');
    };
  });
}

// ===== TYPING =====
function typeText(el,text,speed=38){
  return new Promise(res=>{
    let i=0;el.textContent='';
    const cur=document.createElement('span');
    cur.className='cursor';el.appendChild(cur);
    (function t(){
      if(i<text.length){
        el.insertBefore(document.createTextNode(text[i]),cur);
        i++;setTimeout(t,speed);
      }else setTimeout(()=>{cur.remove();res()},1500);
    })();
  });
}

// ===== CHAT =====
let chatState='menu',isAi=false;
function initChat(){
  const mainIn=document.getElementById('main-input');
  const mainSend=document.getElementById('main-send');
  const overlay=document.getElementById('chat-overlay');
  const closeBtn=document.getElementById('cp-close');
  const panelIn=document.getElementById('cp-input');
  const panelSend=document.getElementById('cp-send');
  const msgs=document.getElementById('cp-msgs');
  const loading=document.getElementById('c-loading');
  const aiTgl=document.getElementById('ai-toggle');
  const aiLbl=document.getElementById('ai-label');

  function open(msg){
    overlay.classList.add('on');
    document.body.style.overflow='hidden';
    if(msg)send(msg);
    else if(msgs.querySelectorAll('.c-msg').length===0)send('menu');
    setTimeout(()=>panelIn.focus(),300);
  }
  function close(){overlay.classList.remove('on');document.body.style.overflow=''}

  function addMsg(text,who){
    const d=document.createElement('div');
    d.className='c-msg '+who;
    if(who==='bot'){
      let f=text.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
      f=f.replace(/\n\*/g,'<br>•').replace(/\n-/g,'<br>•');
      d.innerHTML=f;
    }else d.textContent=text;
    msgs.insertBefore(d,loading);
    msgs.scrollTop=msgs.scrollHeight;
  }

  async function send(text){
    if(!text||!text.trim())return;
    const t=text.trim();
    if(t.toLowerCase()!=='menu')addMsg(t,'user');
    loading.classList.add('on');
    msgs.scrollTop=msgs.scrollHeight;
    try{
      const ep=isAi?'/ai':'/chat';
      const body=isAi?{message:t}:{message:t,state:chatState};
      const r=await fetch(ep,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
      const data=await r.json();
      loading.classList.remove('on');
      addMsg(data.reply,'bot');
      if(!isAi&&data.state)chatState=data.state;
    }catch(e){
      loading.classList.remove('on');
      addMsg("Sorry, I'm having trouble connecting.",'bot');
    }
  }

  mainSend.onclick=()=>{const v=mainIn.value.trim();open(v);mainIn.value=''};
  mainIn.onkeydown=e=>{if(e.key==='Enter'){const v=mainIn.value.trim();open(v);mainIn.value=''}};
  mainIn.onfocus=()=>{if(!overlay.classList.contains('on'))open('')};

  panelSend.onclick=()=>{send(panelIn.value);panelIn.value=''};
  panelIn.onkeydown=e=>{if(e.key==='Enter'){send(panelIn.value);panelIn.value=''}};

  closeBtn.onclick=close;
  overlay.onclick=e=>{if(e.target===overlay)close()};

  // Orb buttons open chat
  document.querySelectorAll('.orb-side-btn').forEach(b=>b.onclick=()=>open(''));

  if(aiTgl){
    aiTgl.onchange=e=>{
      isAi=e.target.checked;
      if(isAi){
        aiLbl.textContent='AI ON';aiLbl.style.color='var(--purple)';
        addMsg("AI Mode ✨ Ask me anything about voting!",'bot');
      }else{
        aiLbl.textContent='AI Mode';aiLbl.style.color='';
        addMsg("Menu Mode. Type 'menu' for options.",'bot');
        chatState='menu';
      }
    };
  }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded',()=>{
  initBg();initSidebar();initChat();
  const bubble=document.getElementById('ai-text');
  if(bubble)typeText(bubble,"Namaste! How may I guide you on your voting journey today?",42);
});
       // Interactive Mouse Tracking
        const bot = document.querySelector('.bot-container');
        const bubble = document.querySelector('.bubble');

        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            bot.style.transform = `rotateY(${xAxis}deg) rotateX(${-yAxis}deg)`;
        });

        // Delay bubble appearance
        setTimeout(() => {
            bubble.style.opacity = "1";
        }, 500);