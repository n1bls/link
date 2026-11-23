const WORKER_URL = 'https://nibls-views.m-naumenko09.workers.dev';
const viewsCountEl = document.getElementById('views-count');

async function updateViews() {
  if (!viewsCountEl) return;
  const isNewVisit = !sessionStorage.getItem('visited');
  try {
    const res = await fetch(`${WORKER_URL}?inc=${isNewVisit ? '1' : '0'}`);
    const data = await res.json();
    viewsCountEl.textContent = data.count;
    if (isNewVisit) sessionStorage.setItem('visited', '1');
  } catch {
    viewsCountEl.textContent = '1';
  }
}

updateViews();

const audio = new Audio('./assets/audio/music.mp3');
audio.loop = true;

const enterOverlay = document.getElementById('enter-overlay');
const trackSlider = document.getElementById('track-slider');
const volumeSlider = document.getElementById('volume-slider');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const muteBtn = document.getElementById('mute-btn');

// Иконки динамика для кнопки звука
const ICON_VOLUME_ON = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>`;
const ICON_VOLUME_OFF = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;

// Инициализация стартового состояния кнопки и громкости
if (muteBtn) muteBtn.innerHTML = ICON_VOLUME_ON;
audio.volume = volumeSlider ? Number(volumeSlider.value) : 1;

// Форматирование секунд в MM:SS
function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// 1. Вход на сайт и запуск аудио
if (enterOverlay) {
  enterOverlay.addEventListener('click', () => {
    enterOverlay.classList.add('hidden');
    audio.play().catch((err) => console.warn('Autoplay blocked:', err));
  }, { once: true });
}

// 2. Загрузка метаданных трека (общая длительность)
audio.addEventListener('loadedmetadata', () => {
  if (durationEl) durationEl.textContent = formatTime(audio.duration);
  if (trackSlider) trackSlider.max = audio.duration;
});

// 3. Обновление прогресс-бара при воспроизведении
let isSeeking = false;

audio.addEventListener('timeupdate', () => {
  if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
  if (trackSlider && !isSeeking) {
    trackSlider.value = audio.currentTime;
  }
});

// 4. Перемотка трека ползунком
if (trackSlider) {
  trackSlider.addEventListener('input', () => {
    isSeeking = true;
    if (currentTimeEl) currentTimeEl.textContent = formatTime(Number(trackSlider.value));
  });

  trackSlider.addEventListener('change', () => {
    audio.currentTime = Number(trackSlider.value);
    isSeeking = false;
  });
}

// 5. Регулировка громкости и кнопка Mute
if (volumeSlider) {
  volumeSlider.addEventListener('input', () => {
    const val = Number(volumeSlider.value);
    audio.volume = val;
    audio.muted = val === 0;
    if (muteBtn) muteBtn.innerHTML = audio.muted ? ICON_VOLUME_OFF : ICON_VOLUME_ON;
  });
}

if (muteBtn) {
  muteBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    muteBtn.innerHTML = audio.muted ? ICON_VOLUME_OFF : ICON_VOLUME_ON;
    if (volumeSlider) {
      volumeSlider.value = audio.muted ? 0 : (audio.volume || 1);
    }
  });
}