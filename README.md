## Wishes App

Wishes App is a web application for creating, updating, and deleting wishes, with support for sorting, filtering, and notifications (snackbar) on success or error for each operation.

[Demo](https://taniavozniuk.github.io/wishes-app/)

### Features

1. Add new wishes

2. Update existing wishes

3. Delete wishes with confirmation

4. Filter by date and price

5. Pagination for wish list

6. Snackbar notifications for success/error

7. Global state management with Context API

### Tech Stack

1. React + TypeScript

2. React Router

3. API requests

4. Context API for state management

5. SCSS for styling

6. JSON Server (for mock backend)

### Local Setup

1. Clone the repository

```bash
   git clone <repository-url>
   cd wishes-app
```

2. Install dependencies

```bash
   npm install

    or if you use Yarn:

    yarn install
```

3. Start the JSON Server (backend)

The project uses a local JSON server to store wishes. A db.json file should exist at the project root.

Create db.json (if it doesn't exist):

```bash
    {
    "wishes": []
    }
```

Run the server:

```bash
    npx json-server --watch db.json --port 3001
```

The server will be available at http://localhost:3001/wishes

4. Start the frontend

```bash
   npm run dev

    or

    yarn dev
```

By default, the app will be available at http://localhost:5173 (if using Vite).
