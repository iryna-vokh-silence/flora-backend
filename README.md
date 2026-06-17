# Flora Backend

REST API для колекції букетів, замовлень та відгуків. Express + PostgreSQL (Sequelize).

## Live

- **API**: https://flora-backend-sii6.onrender.com
- **Swagger UI**: https://flora-backend-sii6.onrender.com/api-docs
- **Frontend**: https://iryna-vokh-silence.github.io/flora/

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

### Букети

| Метод | Шлях | Опис |
|-------|------|------|
| GET | /api/bouquets | Список букетів (пагінація: `_page`, `_limit`) |
| GET | /api/bouquets/:id | Букет за id |
| POST | /api/bouquets | Створити букет (multipart/form-data, поле `photo` — файл) |
| PUT | /api/bouquets/:id | Оновити букет |
| DELETE | /api/bouquets/:id | Видалити букет |
| PATCH | /api/bouquets/:id/favorite | Переключити favorite |
| PATCH | /api/bouquets/:id/photo | Оновити фото (multipart/form-data) |

### Замовлення

| Метод | Шлях | Опис |
|-------|------|------|
| POST | /api/orders | Створити замовлення |

### Відгуки

| Метод | Шлях | Опис |
|-------|------|------|
| GET | /api/reviews | Список відгуків |
| POST | /api/reviews | Додати відгук |

Swagger UI: https://flora-backend-sii6.onrender.com/api-docs
