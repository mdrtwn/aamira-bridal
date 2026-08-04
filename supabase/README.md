# Supabase setup

## Apply the Bridal appointment migration

1. Open the Aamira project in Supabase.
2. Open **SQL Editor**.
3. Create a new query.
4. Copy the complete contents of
   `migrations/202608040001_bridal_appointments.sql` into the editor.
5. Click **Run** once.

The migration is designed to be safe to run again if table creation was
already completed. It creates:

- dashboard profiles and roles;
- appointments;
- appointment notes;
- appointment audit logs;
- indexes and updated-at triggers;
- the public appointment submission RPC;
- Row Level Security policies and grants.

The oldest existing Supabase Auth user becomes the initial `owner`. New users
receive the `viewer` role until an owner or admin changes it.

Never paste a Supabase secret or service-role key into this repository. The
website and dashboard use the publishable key with RLS.
