function ready(fn){if(document.readyState!='loading')fn();else document.addEventListener('DOMContentLoaded',fn)}

ready(()=>{
  document.getElementById('year').textContent = new Date().getFullYear();

  const menuBtn = document.getElementById('menu-toggle');
  menuBtn && menuBtn.addEventListener('click', ()=>{
    const nav = document.querySelector('.nav');
    if(nav.style.display === 'flex') nav.style.display = '';
    else nav.style.display = 'flex';
  });

  fetch('/data/projects.json').then(r=>{
    if(!r.ok) throw new Error('no projects.json');
    return r.json();
  }).then(data => renderProjects(data)).catch(_=>{
    renderProjects([
      {title:'OSINT Toolkit',desc:'Automated OSINT collector and reporting pipeline.',link:'#'},
      {title:'CTF Tools',desc:'Custom exploit scripts and sandboxed labs.',link:'#'}
    ])
  })
})

function renderProjects(list){
  const container = document.getElementById('projects-list');
  container.innerHTML = '';
  list.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `<h4>${escapeHtml(p.title)}</h4><p>${escapeHtml(p.desc)}</p><p><a href="${escapeAttr(p.link)}" rel="noopener">View</a></p>`;
    container.appendChild(card);
  })
}

function escapeHtml(s){return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')}
function escapeAttr(s){return String(s).replaceAll('"','%22')}
