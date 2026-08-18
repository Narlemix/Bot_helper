# HR Helper — веб-бот по увольнению

Готовый самостоятельный web-прототип. Работает в Docker и открывается в браузере.

## 1. Установка

Нужен Docker Desktop для Windows.

## 2. Первый запуск

В PowerShell:

```powershell
cd C:\путь\к\dismissal_web_bot
copy .env.example .env
docker compose build
docker compose up -d
```

Откройте:

http://localhost:8000

Проверка backend:

http://localhost:8000/api/health

## 3. Остановка

```powershell
docker compose down
```

## 4. Логи

```powershell
docker compose logs -f
```

## 5. SMTP

По умолчанию включён безопасный режим `DRY_RUN_EMAIL=true`: при подтверждении обращения бот не отправляет реальный e-mail.

Для реальной отправки отредактируйте `.env`:

```text
DRY_RUN_EMAIL=false
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=bot@example.com
SMTP_PASSWORD=your-password
SMTP_FROM=bot@example.com
RECIPIENT_EMAIL=dismissal@exc.ltd
```

После изменения `.env`:

```powershell
docker compose up -d --build
```

## 6. Что уже умеет

- русский язык;
- свободные формулировки;
- устойчивость к небольшим опечаткам;
- определение сценария увольнения;
- выбор: получить информацию или оформить обращение;
- сбор ФИО заявителя;
- сбор ФИО увольняемого сотрудника;
- сбор даты увольнения;
- дополнительный комментарий;
- подтверждение данных перед отправкой;
- SMTP-отправка;
- веб-интерфейс без Node.js;
- Docker Compose.

## 7. Важно для продакшена

Перед публикацией в интернет нужно добавить HTTPS, домен, нормальное хранилище сессий/БД и секреты через защищённое хранилище. Текущая версия специально сделана простой для локального запуска и демонстрации.
