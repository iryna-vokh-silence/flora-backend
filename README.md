# Flora Backend

REST API для колекції букетів. Express + PostgreSQL (Sequelize).

## Локальний запуск

```bash
# 1. Встановити залежності
npm install

# 2. Створити .env файл
cp .env.example .env
# Заповнити DATABASE_URL, PORT, BASE_URL

# 3. Запустити сервер
npm run dev

# 4. (Опціонально) Заповнити БД початковими даними
npm run seed
```

## API ендпоінти

| Метод | Шлях | Опис |
|-------|------|------|
| GET | /api/bouquets | Список букетів (пагінація: `_page`, `_limit`) |
| GET | /api/bouquets/:id | Букет за id |
| POST | /api/bouquets | Створити букет |
| PUT | /api/bouquets/:id | Оновити букет |
| DELETE | /api/bouquets/:id | Видалити букет |
| PATCH | /api/bouquets/:id/favorite | Переключити favorite |
| PATCH | /api/bouquets/:id/photo | Оновити фото (multipart/form-data) |

Swagger UI: `/api-docs`
