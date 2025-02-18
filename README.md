# Code Square

Code Square is a backend project that provides a platform for developers to share and discuss coding articles. It facilitates knowledge exchange and fosters a community of developers interested in various programming topics.

## Features

- **Article Management**: Users can create, edit, and delete their coding articles.
- **Discussion Forums**: Each article has an associated discussion thread where users can comment and engage in conversations.
- **User Authentication**: Secure user registration and login functionalities.
- **Profile Management**: Users can manage their profiles, including updating personal information and viewing their contributions.

## Technologies Used

- **Backend**: Node.js with Express.js framework
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **ORM**: Mongoose

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/AchrfJR/code-square.git
   cd code-square
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```ini
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   UPLOADS_DIR=./assets/uploads
   ```

4. **Start the Server**:
   ```bash
   npm start
   ```
   The server should now be running on http://localhost:3000.

## API Endpoints

### User Authentication

- **Register a New User**
  - `POST /api/auth/register`: Register a new user

- **User Login**
  - `POST /api/auth/login`: User login

### Articles

- **Get All Articles**
  - `GET /api/articles`: Retrieve all articles

- **Create a New Article**
  - `POST /api/articles`: Create a new article (Authenticated users only)

- **Retrieve a Specific Article**
  - `GET /api/articles/:id`: Retrieve a specific article

- **Update an Article**
  - `PUT /api/articles/:id`: Update an article (Author only)

- **Delete an Article**
  - `DELETE /api/articles/:id`: Delete an article (Author only)

### Comments

- **Get Comments for an Article**
  - `GET /api/articles/:id/comments`: Retrieve all comments for an article

- **Add a Comment to an Article**
  - `POST /api/articles/:id/comments`: Add a new comment (Authenticated users only)

- **Delete a Comment**
  - `DELETE /api/comments/:id`: Delete a comment (Author only)

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.

