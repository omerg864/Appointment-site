# Appointment Making Website

This is a web application developed using Express.js, JavaScript, React, CSS, and MongoDB. The application is designed to help users book and manage appointments online.

## Features

- User authentication and authorization
- Appointment scheduling and management
- Email notifications for new appointments and appointment changes
- Easy-to-use user interface
- Mobile-friendly design

## Getting Started

To use the application, you need to install Node.js and MongoDB on your machine.

### Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory using the terminal.
3. Run the command `npm install` to install all the dependencies in the backend and frontend folders.
4. Run the command `npm run dev` to start the application in both directories.

### Configuration

You need to set the following environment variables before running the application:

- `MONGO_URI`: The URI for the MongoDB instance.
- `PORT`: The port number on which the server will run.
- `JWT_SECRET`: The secret key used to encrypt the JSON Web Tokens.
- `SITE_ADDRESS`: The URL of the website.
- `SITE_TITLE`: The title of the website.
- `SITE_HEADER`: The header text of the website.
- `NODE_ENV`: The Node.js environment (`development`, `production`, or `test`).
- `EMAIL_SERVICE`: The email service provider used to send emails.
- `EMAIL_ADDRESS`: The email address of the sender.
- `EMAIL_PASSWORD`: The password of the email sender.

You can set the environment variables using a `.env` file in the project directory or by setting them in the environment variables of your system.

### Usage

Once the application is running, you can access it using a web browser at `http://localhost:3000`. 

## Contribution

I would appreciate any feedback, bug reports, or feature requests you may have. Please feel free to create an issue on the GitHub repository or send me an email with your suggestions. Thank you for your support!