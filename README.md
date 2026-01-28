# Guan Yu Project 關羽
An online course to learn Chinese for absolutely free.

The curriculum gets users the opportunity to learn how to read and speak Mandarin Chinese, as well as consume native-level content with online tools that are COMPLETELY free.

## Development

- **Run both server and web:** from repo root, `npm run dev`
- **Database:** PostgreSQL. Create a DB (e.g. `createdb guanyu`), then in `server/` copy `env.example` to `.env` and set `DATABASE_URL=postgresql://localhost:5432/guanyu` (adjust host/port/name if needed). The `users` table is created automatically on server start. 
