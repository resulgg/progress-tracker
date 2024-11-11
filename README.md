# Progress Tracker

Progress Tracker is a web application designed to help users set, track, and achieve their personal and professional goals. Built with modern technologies like Next.js, TypeScript, and Tailwind CSS, it offers a seamless and responsive user experience.

## Table of Contents

- [Progress Tracker](#progress-tracker)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
  - [Usage](#usage)
  - [Technologies Used](#technologies-used)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- **User Authentication**: Secure login and registration using NextAuth.js.
- **Project Management**: Create, edit, and delete projects with customizable categories.
- **Progress Tracking**: Add tracks to projects to monitor specific aspects of your progress.
- **Metadata Integration**: Enhance tracks with customizable metadata entries.
- **Responsive Design**: Optimized for both desktop and mobile devices using Tailwind CSS.
- **Docker Support**: Easy deployment with Docker for both development and production environments.
- **Error Handling**: Robust error handling and validation using Zod and React Hook Form.
- **Accessibility**: Compliant with WCAG 2.1 AA standards to ensure accessibility for all users.
- **Performance Optimization**: Implements best practices for fast load times and efficient rendering.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v20.x recommended)
- [pnpm](https://pnpm.io/) package manager
- [Docker](https://www.docker.com/) (optional, for containerization)

### Steps

1. **Clone the Repository**

   ````bash
   git clone https://github.com/yourusername/progress-tracker.git
   cd progress-tracker   ```

   ````

2. **Install Dependencies**

   Using pnpm:

   ````bash
   pnpm install   ```

   ````

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add the following variables:

   ````env
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
   NEXTAUTH_URL=http://localhost:3000
   AUTH_SECRET=your_auth_secret
   AUTH_GOOGLE_ID=your_google_id
   AUTH_GOOGLE_SECRET=your_google_secret
   R2_ACCESS_KEY_ID=your_r2_access_key_id
   R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
   R2_BUCKET_NAME=your_r2_bucket_name
   R2_REGION=your_r2_region
   R2_ENDPOINT=your_r2_endpoint
   NEXT_PUBLIC_R2_PUBLIC_URL=your_r2_public_url
   LEMON_SQUEEZY_API_KEY=your_lemon_squeezy_api_key
   LEMONSQUEEZY_STORE_ID=your_lemon_squeezy_store_id
   NEXT_PUBLIC_LEMON_SQUEEZY_VARIANT_ID=your_lemon_squeezy_variant_id
   LEMONSQUEEZY_WEBHOOK_SECRET=your_lemon_squeezy_webhook_secret   ```

   ````

4. **Database Setup**

   Ensure you have PostgreSQL running and accessible via the `DATABASE_URL`.

   Apply database migrations and seed data:

   ````bash
   pnpm db:push
   pnpm db:seed   ```

   ````

5. **Run the Development Server**

   ````bash
   pnpm dev   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.
   ````

## Usage

- **Sign Up**: Create a new account or log in using existing credentials.
- **Create Project**: Add new projects under different categories.
- **Add Tracks**: Within each project, add tracks to monitor specific aspects.
- **Track Progress**: View and compare your progress across different tracks.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **TypeScript**: Typed superset of JavaScript for better code quality and developer experience.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Drizzle ORM**: TypeScript ORM for database interactions.
- **NextAuth.js**: Authentication library for Next.js applications.
- **Zod**: Schema validation library for TypeScript.
- **React Hook Form**: Form management library for React.
- **Shadcn UI**: Accessible and customizable UI components.
- **Lucide React**: Icon library for React applications.
- **Docker**: Containerization platform for easy deployment.
- **PostgreSQL**: Robust relational database system.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**

2. **Create a New Branch**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Make Your Changes and Commit**

   ```bash
   git commit -m "Add your feature"
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/YourFeature
   ```

5. **Open a Pull Request**

Please ensure your code adheres to the project's coding standards and passes all tests. Feel free to reach out if you need assistance.

## License

This project is licensed under the [MIT License](LICENSE).

---
