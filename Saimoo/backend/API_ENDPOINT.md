# API Endpoints Summary

## Authentication
| Endpoint                            | Method | Description        | Body                                                 |
|-------------------------------------|--------|--------------------|------------------------------------------------------|
| `/api/login`                        | POST   | Login user         | `{ "username": "tony", "email": "tony@gamil.com", "password": "1234" }`         |
| `/api/register`                     | POST   | Register user      | `{ "username": "tam@tony", "password": "1234" }`         |
| `/api/current-user`                 | POST   | Get current user   | None                                                 |

## Trips
| Endpoint                            | Method | Description        | Body                                                 |
|-------------------------------------|--------|--------------------|------------------------------------------------------|
| `/api/trips`                        | GET   | Get all trip available         |   None       |
| `/api/trips/:id`                     | GET   | Get trip available detail      |  None        |
| `/api/trips`                 | POST   | create new trips   | `{ "title": "หาเพื่อนเที่ยววัดเชี่ยงใหม่ 3 วัน 2 คืน", "description": "หาเพื่อนงับ", "dateStart": "2023-01-01", "dateEnd": "2023-01-03", "maxPerson": 10, "ownerTripId": 1, "type": "free", "price": 0 }`                                                 |

## Wallet
| Endpoint                            | Method | Description        | Body                                                 |
|-------------------------------------|--------|--------------------|------------------------------------------------------|
| `/api/wallets`                        | GET   | Get your wallet         |     None     |
| `/api/wallets/topup`                     | POST   | Topup your wallet      | `{ "amount": 1000 }`         |
| `/api/wallets/withdraw`                 | POST   | Withdraw your wallet  | `{ "amount": 1000 }`      |
| `/api/wallets/transaction`                        | GET   | Get your wallet transaction         |  None        |