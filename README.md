# MediConnect - Frontend (React)

This is the React frontend for MediConnect, built with **dummy data** so it
runs and can be demoed completely on its own, with no backend, AWS account,
or internet connection required. Every page listed in the Frontend
Architecture Plan is here and working: Login/Register, Search Providers,
Provider Details, Book Appointment, My Bookings, Provider Dashboard, Manage
Doctors, Manage Slots, and Admin Dashboard.

Booking an appointment actually works end-to-end in this dummy version - it
updates an in-memory "fake database" (see `src/data/db.js`), so the flow
behaves exactly like it will once the real backend is connected.

---

## 1. Software to install first

You only need to install these once:

1. **Node.js** (version 18 or newer - version 20 LTS recommended)
   Download from https://nodejs.org and install it. This also installs
   `npm`, which is what actually runs and builds the project.

   To check it worked, open a terminal and run:
   ```
   node -v
   npm -v
   ```
   Both should print a version number.

2. **Visual Studio Code** (if not already installed)
   https://code.visualstudio.com

3. **Recommended VS Code extensions** (optional but helpful):
   - **ES7+ React/Redux/React-Native snippets** - shortcuts for writing React
   - **ESLint** - flags obvious code mistakes as you type
   - **Prettier - Code formatter** - keeps formatting consistent across the team
   - **Auto Rename Tag** - handy for editing JSX

That's everything. No AWS account, no database, and no other software is
needed to run this dummy version.

---

## 2. Getting the project running

1. Unzip this folder and open it in VS Code (`File > Open Folder`).
2. Open a terminal inside VS Code (`` Terminal > New Terminal ``, or `` Ctrl+` ``).
3. Install the project's dependencies (only needed once, or after pulling
   new changes that add a package):
   ```
   npm install
   ```
   This creates a `node_modules` folder - that's normal, don't worry about
   its size, and it doesn't get shared/committed (see `.gitignore`).
4. Start the app:
   ```
   npm run dev
   ```
5. Terminal will print a local address, usually:
   ```
   Local:   http://localhost:5173/
   ```
   Open that link in a browser. The app is now running locally.
6. To stop the server, click back in the terminal and press `Ctrl+C`.

Any change saved to a file while `npm run dev` is running shows up in the
browser automatically - no need to restart it.

---

## 3. Logging in (dummy login)

There is no real backend yet, so the login screen accepts **any**
username/password. Instead, use the **"Log in as"** dropdown to choose which
part of the app to view:

- **Patient** - search clinics, view a provider, book an appointment, view
  "My Bookings"
- **Provider** - dashboard, manage doctors, manage slots (uses a fixed demo
  clinic, "Hamilton East Health Centre")
- **Admin** - approve/reject pending providers, view basic stats

This matches the login flow described in the architecture plan - once
Cognito is wired up, only `src/api/auth.js` changes; no page needs to change.

---

## 4. Project structure

```
src/
  api/          -> dummy functions standing in for the real backend calls
                    (this is the ONLY place that changes once the real
                    API/AWS backend is ready - see section 5 below)
  auth/         -> Login and Register pages
  components/   -> reusable pieces: Navbar, Button, Card, ProviderCard,
                    SlotCard, Loading
  pages/
    patient/    -> Search, Provider Details, Book Appointment, My Bookings
    provider/   -> Dashboard, Manage Doctors, Manage Slots
    admin/      -> Admin Dashboard
  context/      -> AuthContext - the one shared place that knows who is
                    logged in and what role they have
  routes/       -> ProtectedRoute - blocks a page if the logged-in role
                    doesn't match
  data/         -> db.js - the in-memory dummy "database" (providers,
                    doctors, slots, bookings)
  styles/       -> index.css - all styling for the app
  App.jsx       -> wires routing and login together
  main.jsx      -> the entry point, rarely needs touching
```

---

## 5. Connecting the real backend later

When API Gateway/Cognito/DynamoDB are ready, only the files inside
**`src/api/`** need to change - swap the dummy logic in each function for a
real `fetch()` call to the actual endpoint, keeping the same function name
and return shape. No page, component, or route needs to change, because
pages only ever call functions from `src/api/`, never a backend URL
directly. `src/data/db.js` can be deleted once that swap is done.

---

## 6. Useful commands

| Command | What it does |
|---|---|
| `npm install` | Installs all dependencies (run this first, and again after pulling changes that add a package) |
| `npm run dev` | Starts the app locally with live reload |
| `npm run build` | Builds the production version into a `dist/` folder (this is what eventually gets uploaded to S3) |
| `npm run preview` | Serves the built `dist/` folder locally, to sanity-check a production build |

---

## 7. If something goes wrong

- **"npm: command not found"** - Node.js isn't installed correctly. Reinstall
  from nodejs.org and restart the terminal.
- **Port 5173 already in use** - close whatever else is using it, or just
  let Vite pick another port (it will ask/print the new one).
- **Blank page in the browser** - check the terminal for an error message
  first; also check the browser console (`F12` > Console tab).
- **`node_modules` issues after pulling changes** - delete the `node_modules`
  folder and run `npm install` again.
