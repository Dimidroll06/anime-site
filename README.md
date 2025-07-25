# 🎬 Пет-проект "Сайт для просмотра аниме"

> Это ознакомительный и образовательный проект, созданный для изучения фронтенда и бэкенда.  
> Проект реализован с использованием **Node.js**, **Express**, **React (Vite)**, **RTK Query**, **Sequelize**, **Tailwind CSS** и других современных инструментов.

---

## Скриншоты

![](https://github.com/Dimidroll06/anime-site/blob/main/public/homepage.jpg?raw=true)

---

![](https://github.com/Dimidroll06/anime-site/blob/main/public/animecard.jpg?raw=true)

---

![](https://github.com/Dimidroll06/anime-site/blob/main/public/player.jpg?raw=true)

---

![](https://github.com/Dimidroll06/anime-site/blob/main/public/profile.jpg?raw=true)

---

## 🧾 Описание

Сайт позволяет:

- Искать аниме по названию и описанию
- Просматривать профиль аниме, его описание и рейтинг
- Смотреть эпизоды с выбором плеера и дуббинга
- Регистрация и авторизация пользователей
- Редактировать профиль и аватар
- Использовать бесконечную прокрутку и фильтры

---

## 📁 Структура проекта

```
.
├── src/                      # Основной код сервера и клиента
│   ├── lib/                  # Настройки
│   │   ├── config.js         # Конфигурация
│   │   ├── db.js             # Подключение к БД
│   │   └── logger.js         # Логгирование
│   ├── controllers/          # Контроллеры Express
│   ├── middleware/           # Промежуточные обработчики
│   ├── models/               # Модели Sequelize (аниме, пользователи, видео)
│   ├── routes/               # Роуты Express
│   ├── validators/           # Валидаторы для входящих данных
│   ├── view/                 # Клиентская часть (React + Vite)
│   │   ├── src/              # Исходники React-приложения
│   │   │   ├── app/          # RTK Query API, store
│   │   │   ├── components/   # Компоненты
│   │   │   ├── pages/        # Страницы
│   │   │   └── layouts/      # Макеты
│   │   └── index.html        # Точка входа
│   └── app.js                # Сервер Express
│
├── utils/                    # Вспомогательные утилиты
│   └── anime-parser/         # Парсер аниме (для наполнения БД)
│
├── index.js                  # Точка входа
├── package.json
└── README.md                 # Ты сейчас здесь
```

---

## 🔧 Технологии

- **Node.js / Express** — сервер
- **React (Vite)** — клиент
- **RTK Query** — работа с API
- **Redux Toolkit** — управление состоянием
- **Tailwind CSS** — стили
- **Sequelize** — ORM для работы с БД
- **PostgreSQL / SQLite** — база данных
- **Axios** — HTTP-запросы
- **Winston** — логгирование
- **JWT** — авторизация
- **Multer** — загрузка файлов

---

## 🧪 Как запустить

1. Создай файл `.env` в корне проекта:

```env
NODE_ENV=development

# База данных
USE_DB=sqlite
DB_STORAGE=./db.sqlite

# Секреты
COOKIE_SECRET=cookie
```

2. Установи зависимости:

```bash
npm install
```

3. Сначала запусти парсер аниме (для тестовых данных):

```bash
npm run parse:anime
```

> После парсинга обложки сохранятся в `utils/anime-parser`. Их нужно скопировать в `src/view/covers`.

4. Собери клиентскую часть:

```bash
cd src/view
npm run build
cd ../../
```

5. Запусти сервер:

```bash
npm run start
```

или для разработки:

```bash
npm run dev
```

---

## 🛠 Парсинг аниме

Для наполнения базы тестовыми данными используй парсер:

```bash
npm run parse:anime
```

> Обложки сохраняются в `utils/anime-parser`. Их нужно перенести в `src/view/covers` вручную или автоматически.

---

## 📦 База данных

Поддерживается:

- **SQLite** (по умолчанию)
- **PostgreSQL**

Для изменения БД — измени `.env`:

```env
USE_DB=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=anime_db
```

---

## 📝 Сценарии

| Сценарий                  | Описание                                 |
|--------------------------|------------------------------------------|
| `npm run dev`            | Запуск сервера в режиме разработки       |
| `npm run start`          | Запуск сервера в production              |
| `npm run parse:anime`   | Парсинг аниме и обложек                  |
| `npm run build`          | Сборка фронтенда (внутри `src/view`)     |
---

## 📝 Лицензия

Проект создан **Швед Дмитрием** как ознакомительный и образовательный.  
Исходный код открыт под MIT-лицензией.

---

## 📌 Полезные ссылки

- [React](https://reactjs.org)
- [RTK Query](https://redux-toolkit.js.org/rtk-query)
- [Express.js](https://expressjs.com)
- [Sequelize ORM](https://sequelize.org)
- [Tailwind CSS](https://tailwindcss.com)

---

## 📬 Вопросы?

Если у тебя есть вопросы по проекту или ты хочешь его улучшить — смело форкаем, читаем, правим, дополняем!

---

> **Создано для обучения. Не для продакшена.**  
> Автор: [Швед Дмитрий]
