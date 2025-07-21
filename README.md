# Eventa - UI

The UI client for Eventa, a minimal event booking platform where users can browse
events, book tickets, and manage their bookings.

## Setup:
Requirements:
- Node (get it [here](https://nodejs.org/en/download))

## Setup
1. Clone repo:
    ```:bash
    git clone https://github.com/irfiacre/eventa-ui.git
    ```
2. cd into the repo:
    ```:bash
    cd eventa-backend
    ```

3. Install dependencies:
    ```:bash
    npm install
    ```

3. Run project:
    ```:bash
    npm run build && npm start
    ```

You can find the backend [here](https://github.com/irfiacre/eventa-backend)

## Sample Env file 
> Please note that the file is to be named .env

```:plain
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<can be got on cloudinary>
NEXT_PUBLIC_CLOUDINARY_PRESET_NAME=<can be got on cloudinary>
CLOUDINARY_API_SECRET=<can be got on cloudinary>
CLOUDINARY_API_KEY=<can be got on cloudinary>
NEXT_PUBLIC_BACKEND_BASE_URL=<backendURL>
```
