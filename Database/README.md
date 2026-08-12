
## Branch and role setup

The Prisma backend now stores branches in the same PostgreSQL database as users. The customer QR contains only a branch ID/code, while branch details are fetched from PostgreSQL after verification.

For a local demo, after applying the Prisma migration, run:

```bash
npx prisma db seed
```

This creates two sample branches and an admin account:

- Email: `admin@bank.com`
- Password: `Admin@12345`

Change the demo credentials before using the application outside the local project demo.
