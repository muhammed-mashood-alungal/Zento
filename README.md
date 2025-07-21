# My MERN App

This is a MERN (MongoDB, Express, React, Node.js) application structured with separate folders for the frontend and backend. The project utilizes Vite for the React frontend and follows the MVC architecture with TypeScript.

## Project Structure

```
my-mern-app
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── app.ts
│   │   └── types
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
└── README.md
```

## Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm run start
   ```

## Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend application:
   ```bash
   npm run dev
   ```

## Features

- **Backend**: Built with Express and TypeScript, following the MVC architecture.
- **Frontend**: Developed using React with Vite for fast development and hot module replacement.

## Contributing

Feel free to fork the repository and submit pull requests for any improvements or features you'd like to add.