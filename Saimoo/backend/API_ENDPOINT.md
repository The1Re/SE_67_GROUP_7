# API Endpoints Summary

## Authentication
| Endpoint                            | Method | Description        | Body                                                 |
|-------------------------------------|--------|--------------------|------------------------------------------------------|
| `/api/login`                        | POST   | Login user         | `{ "username": "tony", "email": "tony@gamil.com", "password": "1234" }`         |
| `/api/register`                     | POST   | Register user      | `{ "username": "tam@tony", "password": "1234" }`         |
| `/api/current-user`                 | POST   | Get current user   | None                                                 |
| `/api/current-admin`                | POST   | Get current admin  | None                                                 |
