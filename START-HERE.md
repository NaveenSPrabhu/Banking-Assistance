# Smart Banking Assistant — Final Demo Setup

This package preserves the existing customer UI/design and adds the agreed role/branch flow, multilingual UI, profile/language support, laptop/mobile development support, and a single-instance QR camera lifecycle.

## 1. Backend

Open a terminal in `Backend`:

```cmd
npm install
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

Keep this terminal running.

Your existing `Backend/.env` must contain a valid `DATABASE_URL`.

## 2. Frontend

Open a second terminal in `Frontend`:

```cmd
npm install
npm run dev
```

Vite is configured to listen on `0.0.0.0` and proxy `/api` to the backend on port 5000.

Laptop:

`http://localhost:5173/`

Phone (same Wi-Fi as laptop):

`http://<LAPTOP_IPV4>:5173/`

Find the laptop IPv4 with:

```cmd
ipconfig
```

Do not hardcode the laptop IP into React source files.

## 3. Demo admin

After `npx prisma db seed`:

- Email: `admin@bank.com`
- Password: `Admin@12345`

Customer accounts are created through the normal Signup page and receive the Customer role automatically.

## 4. Main customer flow

Login → Dashboard → Scan QR → Branch Details → Voice Assistance or Step-by-Step Guidance.

The QR contains only the branch identifier/code. Branch details are stored in PostgreSQL and resolved by the backend.

## 5. QR camera

The scanner has explicit lifecycle cleanup so React development StrictMode cannot leave two camera renderers attached to the same scanner element.

On mobile browsers, camera access may require a secure origin (HTTPS) depending on the browser. If the browser blocks camera permission on a LAN HTTP URL, the application itself still works; use an HTTPS development tunnel/origin for camera testing.
