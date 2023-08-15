# App

GymPass API
The API allows developers to manage gym checkIns, book check Ins, and retrieve user information.
The API was made using Fastify and Prisma.

## FRs (Functional Requirements)

- [x] It should be possible to register;
- [x] It should be possible to authenticate;
- [x] It should be possible to get the profile of a logged-in user;
- [x] It should be possible to get the number of check-ins performed by the logged-in user;
- [x] It should be possible for the user to get their check-in history;
- [x] It should be possible for the user to search for nearby gyms;
- [x] It should be possible for the user to search for gyms by name;
- [x] It should be possible for the user to check-in at a gym;
- [x] It should be possible to validate a user's check-in;
- [x] It should be possible to register a gym;

## BRs (Business Rules)

- [x] The user should not be able to register with a duplicated email;
- [x] The user cannot make 2 check-ins on the same day;
- [x] The user cannot check-in if not close (100m) to the gym;
- [x] The check-in can only be validated up to 20 minutes after it is created;
- [ ] The check-in can only be validated by administrators;
- [ ] The gym can only be registered by administrators;

## RNFs (Non-Functional Requirements)

- [x] The user's password needs to be encrypted;
- [x] The application data needs to be persisted in a PostgreSQL database;
- [x] All data lists need to be paginated with 20 items per page;
- [x] The user should be identified by a JWT (JSON Web Token);
