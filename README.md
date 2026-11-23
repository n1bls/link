<div align="center">

# nibls `снежок`

Персональная био-страница со ссылками, встроенным аудиоплеером и живым счётчиком просмотров.

[![Live Demo](https://img.shields.io/badge/Live-n1bls.github.io%2Flink-38bdf8?style=for-the-badge)](https://n1bls.github.io/link/)

</div>

---

### Особенности

- **Glassmorphism UI** — полупрозрачные карточки с размытием поверх фонового видео.
- **Аудиоплеер** — воспроизведение трека с перемоткой, регулировкой громкости и режимом mute.
- **Счётчик просмотров** — уникальные заходы за сессию через Cloudflare Workers + GitHub Gist API.
- **Адаптивность** — корректное отображение на десктопе и мобильных устройствах.

---

### Стек

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend / Counter:** Cloudflare Workers, GitHub Gist API
- **Hosting:** GitHub Pages

---

### Структура проекта

```text
├── index.html      # Разметка профиля, соцсетей, плеера и счётчика
├── style.css       # Стили, переменные темы и glassmorphism-карточки
├── script.js       # Логика плеера, оверлея и запросов к Cloudflare Worker
└── README.md       # Описание проекта