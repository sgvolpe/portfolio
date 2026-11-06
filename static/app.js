const $ = (q) => document.querySelector(q);
const fill = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
const data = window.PORTFOLIO;
document.title = `${data.name} — Software Engineer`;
fill('navName', data.name.split(' ').map(x=>x[0]).join('')+'.'); fill('availability', data.availability); fill('intro', data.intro); fill('location', data.location); fill('aboutText', data.about); fill('currentRole', data.experience[0].role); fill('contactLocation', data.location.toUpperCase()); fill('year', new Date().getFullYear());
$('#emailLink').href = `mailto:${data.email}`; $('#contactButton').href = `mailto:${data.email}?subject=${encodeURIComponent('Let’s talk')}`; $('#linkedinLink').href = data.linkedin;
$('#stats').innerHTML = data.stats.map((s,i)=>{const match=String(s.value).match(/^([\d.]+)(.*)$/);const value=match?Number(match[1]):0;const suffix=match?match[2]:s.value;return `<div class="stat reveal" style="--stagger:${i*120}ms"><span class="stat-value" data-count="${value}" data-suffix="${suffix}">0${suffix}</span><span class="stat-label">${s.label}</span></div>`}).join('');
$('#experienceList').innerHTML = data.experience.map((e,i)=>`<article class="timeline-item reveal" style="--stagger:${i*90}ms"><div><div class="timeline-role">${e.role}</div><div class="timeline-company">${e.company} · ${e.location}</div></div><div><p class="timeline-desc">${e.description}</p><div class="timeline-tags">${e.tags.map(t=>`<span>${t}</span>`).join('')}</div></div><div class="timeline-period">${e.period}</div></article>`).join('');
$('#languages').textContent = data.languages.join(' · '); $('#educationShort').textContent = data.education[0].degree;
$('#educationList').innerHTML = data.education.map((e,i)=>`<div class="education-item reveal" style="--stagger:${i*120}ms"><div class="education-degree">${e.degree}</div><div class="education-school">${e.school}</div><div class="education-period">${e.period}</div></div>`).join('');
const skills = data.skills; $('#engineeringSkills').innerHTML = skills.slice(0,5).map(x=>`<span>${x}</span>`).join(''); $('#dataSkills').innerHTML = skills.slice(5,10).map(x=>`<span>${x}</span>`).join('');
document.querySelectorAll('.skill-card').forEach((card,i)=>{card.classList.add('reveal');card.style.setProperty('--stagger',`${i*140}ms`)});
document.querySelectorAll('.about-meta > div').forEach((item,i)=>{item.classList.add('reveal');item.style.setProperty('--stagger',`${i*100}ms`)});
const root=document.documentElement, themeToggle=$('#themeToggle');
const saved=localStorage.getItem('portfolio-theme'); if(saved) root.dataset.theme=saved;
function updateTheme(){const dark=root.dataset.theme==='dark';themeToggle.querySelector('.theme-icon').textContent=dark?'☼':'◐';themeToggle.querySelector('.theme-text').textContent=dark?'Light mode':'Dark mode';document.querySelector('meta[name="theme-color"]').content=dark?'#171b18':'#f6f5f0'}
updateTheme(); themeToggle.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';localStorage.setItem('portfolio-theme',root.dataset.theme);updateTheme()});
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');else if(e.boundingClientRect.top>0||e.boundingClientRect.bottom<0)e.target.classList.remove('visible')}),{threshold:.12,rootMargin:'0px 0px -24px 0px'});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
const counterObserver=new IntersectionObserver(entries=>entries.forEach(e=>{const el=e.target;if(e.isIntersecting){const target=Number(el.dataset.count),suffix=el.dataset.suffix||'';if(reduceMotion){el.textContent=`${target}${suffix}`;return}const duration=1350,start=performance.now();function tick(now){const t=Math.min((now-start)/duration,1),ease=1-Math.pow(1-t,4);el.textContent=`${Math.round(target*ease)}${suffix}`;if(t<1)requestAnimationFrame(tick)}requestAnimationFrame(tick)}else if(e.boundingClientRect.top>0||e.boundingClientRect.bottom<0){el.textContent=`0${el.dataset.suffix||''}`}}),{threshold:.65});
document.querySelectorAll('[data-count]').forEach(el=>counterObserver.observe(el));
$('.menu-toggle').addEventListener('click',()=>{const open=$('.nav-links').classList.toggle('open');$('.menu-toggle').setAttribute('aria-expanded',String(open))});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>$('.nav-links').classList.remove('open')));
let ticking=false;addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;$('#progressBar').style.width=`${max>0?scrollY/max*100:0}%`;const hero=$('.hero-art');if(hero){const rect=hero.getBoundingClientRect();hero.style.setProperty('--scroll-shift',`${Math.max(-16,Math.min(16,(rect.top-innerHeight*.2)*-.035))}px`)}ticking=false})},{passive:true});

const rotatingWords=['lasting impact','better systems','useful insight'];
const dynamicWord=$('#dynamicWord');let wordIndex=0;
if(dynamicWord&&!reduceMotion){setInterval(()=>{dynamicWord.classList.add('word-out');setTimeout(()=>{wordIndex=(wordIndex+1)%rotatingWords.length;dynamicWord.textContent=rotatingWords[wordIndex];dynamicWord.classList.remove('word-out');dynamicWord.classList.add('word-in');setTimeout(()=>dynamicWord.classList.remove('word-in'),550)},260)},3400)}
const marqueeItems=['Python','Backend systems','FastAPI','Cloud','Data insight','REST APIs','SQL','Team delivery'];
$('#marqueeTrack').innerHTML=[...marqueeItems,...marqueeItems].map((item,i)=>`<span class="marquee-item" ${i>=marqueeItems.length?'aria-hidden="true"':''}><i></i>${item}</span>`).join('');
