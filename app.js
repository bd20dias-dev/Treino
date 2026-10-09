const warmup = [
  { title: 'Gato-Camelo', detail: '12 repetições', description: 'Em quatro apoios, alterna entre arredondar as costas e arquear suavemente.', url: 'https://www.youtube.com/watch?v=TK6tM059e8o' },
  { title: '90/90 de anca', detail: '10 por lado', description: 'Sentada, roda os joelhos de um lado para o outro, tocando no chão.', url: 'https://www.youtube.com/watch?v=t4Zz6-aG8Iw' },
  { title: 'Tornozelo na parede', detail: '10 por perna', description: 'Avança o joelho sem levantar o calcanhar do chão.', url: 'https://www.youtube.com/watch?v=Yun5ajVNA7M' }
];

const trainings = {
  'treino-1': {
    number: '01',
    title: 'Estabilidade e Core',
    intro: 'Para melhorar a postura, o equilíbrio e a força abdominal — essenciais para evitar lesões.',
    focus: 'Core · equilíbrio · controlo',
    exercises: [
      { title: 'Prancha abdominal', variant: 'De joelhos ou normal', description: 'Apoia os antebraços e os joelhos (ou os pés). Mantém a barriga apertada e o corpo alinhado como uma prancha.', meta: ['3 séries', '20–30 seg', '30 seg de descanso'], video: { title: 'Ver demonstração', url: 'https://www.youtube.com/watch?v=PcKxp-eWyII' } },
      { title: 'Ponte de glúteos', variant: 'Subida controlada', description: 'Deitada de costas, com joelhos dobrados, sobe a bacia e aperta bem os glúteos em cima. Desce devagar.', meta: ['3 séries', '10 repetições', 'segurar 2 seg'], video: { title: 'Ver demonstração', url: 'https://www.youtube.com/watch?v=HeAkXWob2UU' } },
      { title: 'Flexões de braços', variant: 'Parede ou joelhos no chão', description: 'Apoia as mãos na parede ou no chão. Controla a descida e volta a subir sem perder o alinhamento.', meta: ['3 séries', '8–10 repetições'], video: { title: 'Ver demonstração', url: 'https://www.youtube.com/shorts/IED65msJZU4' } },
      { title: 'Equilíbrio unilateral', variant: 'Estabilidade do tornozelo e joelho', description: 'Junto a uma parede por segurança, levanta um pé e mantém o equilíbrio. Experimenta um colchão apenas se for seguro.', meta: ['3 séries', '20 seg por perna'], video: { title: 'Ver demonstração', url: 'https://www.youtube.com/shorts/3kAaqw0dHlM' } }
    ]
  },
  'treino-2': {
    number: '02',
    title: 'Força Geral e Mobilidade',
    intro: 'Focado em dar ritmo às pernas, mobilizar a anca e aumentar a resistência sem exagerar na lesão.',
    focus: 'Força · pernas · mobilidade',
    exercises: [
      { title: 'Agachamento parcial na cadeira', variant: 'Amplitude curta ou média', description: 'De frente para uma cadeira, desce devagar até quase tocar com o rabo e volta a subir. Protege os joelhos sem forçar a profundidade.', meta: ['3 séries', '10 repetições'], video: { title: 'Ver demonstração', url: 'https://www.youtube.com/shorts/BXyc42YGXsU' } },
      { title: 'Elevação de calcanhares', variant: 'Gémeos / panturrilhas', description: 'Apoiada numa parede, sobe na ponta dos pés o mais alto que conseguires e desce devagar.', meta: ['3 séries', '12 repetições'], video: { title: 'Ver demonstração', url: 'https://www.youtube.com/shorts/4Wn5ugI7VU8' } },
      { title: 'Calcanhar firme no chão', variant: 'Isometria da perna lesionada', description: 'Deitada de costas, com a perna ligeiramente fletida, “tranca” o calcanhar contra o chão como se o quisesses puxar para ti, sem mexer o pé.', meta: ['4 vezes', '10 seg de força'], note: 'Sem vídeo fornecido' },
      { title: 'Bird-Dog', variant: 'Costas e core', description: 'Em quatro apoios, estica o braço direito e a perna esquerda. Mantém o corpo firme e troca de lado devagar.', meta: ['3 séries', '6 por lado'], video: { title: 'Ver demonstração', url: 'https://www.youtube.com/watch?v=QVRtIHp9h-M' } }
    ],
    cooldown: [
      { title: 'Postura da criança', description: 'Senta-te nos calcanhares, estica os braços à frente e respira fundo para relaxar a zona lombar.', urls: ['https://www.youtube.com/watch?v=9ew1pOUIcr8', 'https://www.youtube.com/shorts/0p-7pNKiuGA'] },
      { title: 'Alongamento do piramidal / glúteo', description: 'Alongamento suave, sem forçar a amplitude nem provocar dor.', urls: ['https://www.youtube.com/shorts/1aWvVD2Jt0U', 'https://www.youtube.com/shorts/wmKuJZWJNN0'] }
    ]
  }
};

const storageKey = 'treino-core-completed';
const state = { activeTraining: 'treino-1', completed: JSON.parse(localStorage.getItem(storageKey) || '{}') };
const panels = document.querySelector('#training-panels');
const progressLabel = document.querySelector('#progress-label');
const progressBar = document.querySelector('#progress-bar');

function youtubeId(url) {
  const match = url.match(/(?:v=|youtu\.be\/|shorts\/)([\w-]{11})/);
  return match ? match[1] : '';
}

function videoAction(video, key) {
  if (!video) return '<span class="video-links"><span class="video-link" style="color:var(--muted);text-decoration:none">Vídeo não fornecido</span></span>';
  const id = youtubeId(video.url);
  return `<button class="video-button" type="button" data-video-id="${id}" data-video-key="${key}" aria-expanded="false">${video.title} ↗</button>`;
}

function renderWarmup() {
  return `<section class="warmup" aria-labelledby="warmup-title"><div class="warmup-head"><div><h4 id="warmup-title">Aquecimento de mobilidade</h4><p>Prepara o corpo com movimentos lentos e respiração tranquila.</p></div><span class="time-pill">05 min</span></div><div class="warmup-grid">${warmup.map((item, index) => `<article class="warmup-item"><span class="warmup-index">0${index + 1}</span><div><strong>${item.title}</strong><span>${item.detail}</span><a href="${item.url}" target="_blank" rel="noopener">Ver vídeo ↗</a></div></article>`).join('')}</div></section>`;
}

function renderCooldown(items) {
  if (!items) return '';
  return `<section class="cooldown" aria-labelledby="cooldown-title"><div class="cooldown-head"><div><h4 id="cooldown-title">Retorno à calma e hidratação</h4><p>Reserva cerca de 5 minutos para baixar o ritmo e alongar com suavidade.</p></div><span class="time-pill">05 min</span></div><div class="cooldown-grid">${items.map(item => `<article class="cooldown-item"><strong>${item.title}</strong><p>${item.description}</p><div class="video-links">${item.urls.map((url, index) => `<a class="video-link" href="${url}" target="_blank" rel="noopener">${index === 0 ? 'Ver demonstração' : 'Vídeo alternativo'}</a>`).join('')}</div></article>`).join('')}</div></section>`;
}

function renderExercises(training) {
  return `<div class="exercise-list">${training.exercises.map((exercise, index) => {
    const key = `${state.activeTraining}-${index}`;
    const done = Boolean(state.completed[key]);
    return `<article class="exercise-card ${done ? 'is-complete' : ''}" data-exercise-key="${key}">
      <div class="exercise-number">0${index + 1}</div>
      <div class="exercise-main"><h4 class="exercise-title">${exercise.title}</h4><p class="exercise-description"><strong>${exercise.variant}.</strong> ${exercise.description}</p><div class="exercise-meta">${exercise.meta.map((tag, tagIndex) => `<span class="meta-pill ${tagIndex === 0 ? 'accent' : ''}">${tag}</span>`).join('')}</div></div>
      <div class="exercise-actions"><label class="complete-label"><input type="checkbox" data-complete-key="${key}" ${done ? 'checked' : ''} /> Feito</label>${videoAction(exercise.video, key)}</div>
      <div class="video-drawer" data-video-drawer="${key}"></div>
    </article>`;
  }).join('')}</div>`;
}

function renderPanel() {
  const training = trainings[state.activeTraining];
  panels.innerHTML = `<div class="training-panel" id="panel-${state.activeTraining}" role="tabpanel" aria-labelledby="tab-${state.activeTraining}">
    <div class="panel-head"><div><h3>${training.title}</h3><p>${training.intro}</p></div><span class="session-badge"><span></span>${training.focus}</span></div>
    ${renderWarmup()}${renderExercises(training)}${renderCooldown(training.cooldown)}</div>`;
  bindPanelEvents();
  updateProgress();
}

function updateProgress() {
  const total = trainings[state.activeTraining].exercises.length;
  const completed = trainings[state.activeTraining].exercises.filter((_, index) => state.completed[`${state.activeTraining}-${index}`]).length;
  progressLabel.textContent = `${completed} / ${total}`;
  progressBar.style.width = `${total ? Math.round((completed / total) * 100) : 0}%`;
}

function bindPanelEvents() {
  document.querySelectorAll('[data-complete-key]').forEach(input => input.addEventListener('change', event => {
    const key = event.target.dataset.completeKey;
    state.completed[key] = event.target.checked;
    localStorage.setItem(storageKey, JSON.stringify(state.completed));
    event.target.closest('.exercise-card').classList.toggle('is-complete', event.target.checked);
    updateProgress();
  }));

  document.querySelectorAll('[data-video-id]').forEach(button => button.addEventListener('click', event => {
    const clicked = event.currentTarget;
    const drawer = document.querySelector(`[data-video-drawer="${clicked.dataset.videoKey}"]`);
    const isOpen = drawer.classList.contains('is-open');
    document.querySelectorAll('.video-drawer.is-open').forEach(openDrawer => { openDrawer.classList.remove('is-open'); openDrawer.innerHTML = ''; });
    document.querySelectorAll('[data-video-id]').forEach(item => item.setAttribute('aria-expanded', 'false'));
    if (!isOpen) {
      drawer.innerHTML = `<iframe title="Demonstração do exercício" src="https://www.youtube-nocookie.com/embed/${clicked.dataset.videoId}?rel=0" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe><div class="video-note">Se o vídeo não carregar aqui, abre-o diretamente no YouTube.</div>`;
      drawer.classList.add('is-open');
      clicked.setAttribute('aria-expanded', 'true');
    }
  }));
}

document.querySelectorAll('[data-training]').forEach(tab => tab.addEventListener('click', () => {
  state.activeTraining = tab.dataset.training;
  document.querySelectorAll('[data-training]').forEach(item => { const active = item === tab; item.classList.toggle('is-active', active); item.setAttribute('aria-selected', active ? 'true' : 'false'); });
  renderPanel();
}));

document.querySelector('#reset-progress').addEventListener('click', () => {
  trainings[state.activeTraining].exercises.forEach((_, index) => delete state.completed[`${state.activeTraining}-${index}`]);
  localStorage.setItem(storageKey, JSON.stringify(state.completed));
  renderPanel();
});

const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');
navToggle.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!open));
  mobileNav.classList.toggle('is-open', !open);
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { navToggle.setAttribute('aria-expanded', 'false'); mobileNav.classList.remove('is-open'); }));

renderPanel();
