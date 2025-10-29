# auth-rbac

Minimal Express server showing **Authentication + RBAC** (role-based access control).
For demo purposes, users are mocked and roles are assigned statically.

- `POST /login` – exchange username for a fake session cookie
- `GET /admin` – requires role: `admin`
- `GET /profile` – requires any authenticated user

**Not production auth** – just demonstrates RBAC middleware composition.
