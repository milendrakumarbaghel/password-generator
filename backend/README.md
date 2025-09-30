# Password Generator Backend API

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?logo=jsonwebtokens&logoColor=white)
![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)

## Overview
Backend API for generating secure passwords and managing user accounts. Built with Node.js, Express.js, TypeScript, Prisma, and PostgreSQL. It supports user registration/login with JWT authentication and persists generated password history per user.

**Tech Stack:** Node.js, Express.js, TypeScript, Prisma, PostgreSQL, JWT, bcrypt

## 🚀 Features
- User authentication (signup/login) using JWT
- Password generation with configurable options
- Store and retrieve per-user password history
- Input validation and error handling

## 🏗️ Architecture
The backend is organized in a simple MVC-style structure:
- **API Layer:** Express routes and controllers (`/routes`, `/controllers`)
- **Auth:** JWT middleware to protect routes (`/middlewares`)
- **Data Access:** Prisma Client for PostgreSQL (`/config/db.ts`, `/models`)
- **Utilities:** Password generator utility (`/utils/passwordUtils.ts`)

```
[Client] ⇄ [Express API] → [Controllers] → [Prisma] → [PostgreSQL]
                      ↘ [Auth Middleware]
```

## ⚡ Installation & 🛠️ Setup
### Prerequisites
- Node.js ≥ 18
- PostgreSQL database

### Step-by-step
```bash
# Clone the repository
git clone https://github.com/your-username/password-generator.git
cd password-generator/backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env  # if provided, otherwise create .env as below

# Generate Prisma client and apply migrations
npx prisma generate
npx prisma migrate dev
```

### .env configuration
Create a `.env` file in `backend/` with:
```env
PORT=4000
DATABASE_URL=postgresql://user:password@localhost:5432/passworddb
JWT_SECRET=your_jwt_secret
```

## ▶️ Running the application
### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

The server runs on http://localhost:${PORT:-4000} by default.

## 📚 API Documentation
### Auth
- POST `/auth/signup`
  - Body:
  ```json
  { "email": "user@example.com", "password": "StrongPass!23" }
  ```
  - Response: `201 Created` with created user info (without raw password)

- POST `/auth/login`
  - Body:
  ```json
  { "email": "user@example.com", "password": "StrongPass!23" }
  ```
  - Response:
  ```json
  { "token": "<jwt>" }
  ```

### Passwords (require Authorization: Bearer <token>)
- POST `/password/generate`
  - Body:
  ```json
  { "length": 16, "includeUppercase": true, "includeNumbers": true, "includeSpecialChars": true }
  ```
  - Response:
  ```json
  { "password": "A1b2C3d4E5f6G7h8" }
  ```

- GET `/password/history`
  - Response:
  ```json
  {
    "history": [
      { "id": "uuid", "password": "...", "description": "Generated password", "createdAt": "2025-08-27T00:00:00.000Z" }
    ]
  }
  ```

## 🤝 Contributing
- Create a feature branch (`feat/your-feature`)
- Keep changes focused and include clear PR descriptions
- Follow TypeScript + ESLint/Prettier style if configured

## 📄 License
ISC License (see `package.json` for license field).

## 🙏 Acknowledgements
- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [AppMap](https://appmap.io/) for runtime analysis during development

## End
