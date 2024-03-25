# Frontend_Compiler

## Description

Frontend_Compiler is a comprehensive web development setup for building and managing code snippets. It includes a frontend built with React, Vite, TypeScript, Tailwind CSS, Shadcn, Framer Motion, and Redux. The backend is powered by Node.js with Express.js and MongoDB for data storage. It provides features such as full authentication, user signup/login, code sharing, editing, downloading, and real-time collaboration.

## Features

- **Frontend Stack**:
  - React: For building user interfaces.
  - Vite: A fast development tooling for modern web projects.
  - TypeScript: Adds static typing to JavaScript for enhanced development experience.
  - Tailwind CSS: A utility-first CSS framework for rapid UI development.
  - Shadcn: A library for adding shadows to elements.
  - Framer Motion: A library for creating smooth animations.
  - Redux: For managing application state.
- **Backend Stack**:
  - Node.js: JavaScript runtime environment.
  - Express.js: Web application framework for Node.js.
  - MongoDB: NoSQL database for storing code snippets.
- **Authentication**:
  - Full authentication system with signup and login functionality.
- **Code Management**:
  - Ability to share, edit, and download code snippets.
  - Real-time collaboration features using RTK Query.
- **User Experience**:
  - Enhanced user experience with efficient data fetching using RTK Query.

## Getting Started

To get started with Your Project Name, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/s21sd/Frontend_Compiler
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   cd your-repo
   npm install
   cd backend
   npm install
   ```

3. Configure environment variables:

   - Create a `.env` file in the `backend` directory and define environment variables such as MongoDB URI, JWT secret, etc.

4. Start the development servers:

   ```bash
   # Start frontend development server
   npm run dev

   # Start backend development server
   cd backend
   npm run dev
   ```

5. Access your application at `http://localhost:3000`.

## Contributing

Contributions are welcome! If you'd like to contribute to Your Project Name, please follow these guidelines:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/improvement`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/improvement`).
6. Create a new Pull Request.

