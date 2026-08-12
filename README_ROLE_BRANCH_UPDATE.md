# Role-Based Login and Branch Management Update

This update keeps the existing customer UI and components intact while adding the requested role-based application flow.

## Customer flow

Login -> Customer Dashboard -> Scan QR -> Branch Details -> Voice Assistance OR Step-by-Step Guidance

Customer signup always creates a `Customer` account. The user does not choose a role during signup or login.

## Admin flow

The same login page is used for admins. After authentication, the backend role determines the destination:

- `Customer` -> `/dashboard`
- `Admin` -> `/admin`

Admin accounts are not created through customer signup. The included local demo seed creates one admin account.

## Branch database

Branches are stored in the same PostgreSQL database as users through Prisma. Each user can optionally be associated with the branch they verified.

The QR payload contains only the branch identifier, for example:

```json
{"branchId":"BR001"}
```

The customer app sends that identifier to the backend, the backend fetches the branch record, saves the verified branch on the user, and returns the branch details.

## Demo admin

After configuring `DATABASE_URL` and applying the migration:

```bash
cd Backend
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

Demo admin:

- Email: `admin@bank.com`
- Password: `Admin@12345`

Change this credential before any non-demo use.

## Frontend

```bash
cd Frontend
npm install
npm run dev
```

The admin QR preview uses an online QR image endpoint so no additional frontend QR-generation package is required. The QR itself contains only the branch ID/context value.
