# Aamira Bridal Dashboard

Planned modules:

- Overview
- Gown collections
- Wedding and engagement content
- Appointment requests
- Customer inquiries and leads
- Editorial content
- Media library
- Settings

This module will manage the Aamira Bridal experience. It does not need the
same inventory and checkout workflow as Aamira Basic unless Bridal products
are sold directly online in the future.

Dashboard-ready domain contracts are located in `lib/bridal/`:

- `types.ts` — gown, collection, appointment, publishing, and SEO models
- `collections.ts` — centralized collection registry
- `appointments.ts` — shared appointment defaults and validation
- `repositories.ts` — database adapter contracts for future CRUD operations
