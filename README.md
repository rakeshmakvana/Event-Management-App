# Event Management App

An Event Management Application built with React, Node.js, Express, and MongoDB. This application allows users to create, manage, and RSVP to events. It includes features such as image uploads, JWT token authentication, and a responsive UI.

## Features

- User Authentication using JWT
- Create, Read, Update, and Delete (CRUD) operations for events
- RSVP functionality for event invitations
- Image upload for events using Multer
- Responsive and user-friendly interface
- Data stored in MongoDB Atlas

## Technologies Used

- **Frontend:** React, Axios, Context API
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Image Upload:** Multer
- **Authentication:** JWT
- **CSS Framework:** Tailwind CSS (or any other framework you choose)

## Environment Variables

Before running the application, set up the following environment variables :-

  MONGO_URL= your db link

  JWT_SECRET = your secret

  PORT = 4000


## Getting Started

### Clone the Repository

```bash
git clone https://github.com/rakeshmakvana/Event-Management-App
```

## Frontend Setup

```bash
cd frontend
```

```bash
npm install
```

```bash
npm run dev
```

## Backend Setup

```bash
cd backend
```

```bash
npm install
```

```bash
npm start
```

## URLs

Frontend URL: http://localhost:5173

Backend URL: http://localhost:4000

## Usage

Creating an Event: Users can create new events by filling out a form that includes details like title, description, date, time, location, and an optional image.
Viewing Events: Users can view a list of all events and click to see more details.
RSVP to Events: Users can RSVP to events they are interested in.

## Troubleshooting

If you encounter any issues while running the application, please ensure :-

You have set the correct environment variables.
The MongoDB Atlas connection string is correct and your IP is whitelisted.
Both frontend and backend servers are running without errors.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
