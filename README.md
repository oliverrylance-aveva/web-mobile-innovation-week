# Web & Mobile Innovation Week Project

This monorepo contains a full-stack application with a backend API (Node.js/Express/Prisma) and a cross-platform mobile app (Expo/React Native). The backend manages a simple list of items stored in a SQLite database, and the mobile app allows users to view and add items.

## Project Structure

```
apps/
  expo-app/         # Expo React Native app
    app/            # App source code
    ...
backend/            # Node.js backend API
  prisma/           # Prisma schema, migrations, and SQLite DB
  ...
```

## Backend

- **Tech Stack:** Node.js, Express, Prisma ORM, SQLite
- **Location:** [`backend/`](backend/)
- **Entry Point:** [`backend/index.ts`](backend/index.ts)
- **API Endpoints:**
  - `GET /items` — List all items
  - `POST /items` — Add a new item (expects `{ name: string }` in JSON body)

### Setup & Run

1. Install dependencies:
   ```sh
   cd backend
   yarn install
   ```
2. Run database migrations:
   ```sh
   npx prisma migrate deploy
   ```
3. Start the backend server:
   ```sh
   yarn build
   yarn prisma generate
   yarn start
   ```
   The server runs at [http://localhost:4000](http://localhost:4000).

   > **Note for Android:**  
   > If you are running the Expo app on an Android device or emulator, you must use your machine's local IP address instead of `localhost` to access the backend.  
   > For example, if your machine's IP is `192.168.1.100`, the backend URL should be `http://192.168.1.100:4000`.  
   > Update the `BASE_URL` in [`apps/expo-app/app/index.tsx`](apps/expo-app/app/index.tsx) accordingly.

### Database

- Defined in [`backend/prisma/schema.prisma`](backend/prisma/schema.prisma)
- Uses SQLite (`dev.db` in the `prisma/` directory)
- Managed via Prisma

## Web and Mobile App (Expo)

- **Tech Stack:** Expo, React, React Native, TypeScript
- **Location:** [`apps/expo-app/`](apps/expo-app/)
- **Entry Point:** [`apps/expo-app/app/index.tsx`](apps/expo-app/app/index.tsx)
- **Features:**
  - Fetch and display items from the backend
  - Add new items
  - Refresh item list

### Setup & Run

1. Install dependencies:
   ```sh
   cd apps/expo-app
   yarn install
   ```
2. Start the Expo development server:
   ```sh
   yarn start
   ```
3. Use the Expo Go app or an emulator to run the app.

**Note:**  
- The app connects to the backend at `http://localhost:4000` on iOS/web, and by default to `http://172.23.192.1:4000` on Android.  
- For Android, you should set `BASE_URL` in [`app/index.tsx`](apps/expo-app/app/index.tsx) to your machine's IP address (e.g., `http://192.168.1.100:4000`) so the app can reach the backend server.

## Development Notes

- Both projects use TypeScript.
- The backend uses Prisma for type-safe database access.
- The mobile app uses React Native components and fetches data from the backend API.
- See each subproject's `package.json` for available scripts.