# Task Management Service

## Prerequisites
1. **MongoDB**: Ensure that the MongoDB service is running on `localhost:27017`. This is hardcoded for simplicity.
2. **Database Setup**:
   - Create a database in your local MongoDB with the name `task-mg-app`.
   - Create two collections: `users` and `tasks`. You can skip importing data to the `tasks` collection as it is automatically handled by the service. However, **the `users` collection data is needed to be manually added**.
   - Import data into the `users` and `tasks` collections from the JSON files present in the `db_initial_data` folder.

## Setup Instructions

1. **Start MongoDB**: Ensure that MongoDB is running on `localhost:27017` and the `task-mg-app` database is set up with the necessary collections (`users` and `tasks`).

2. **Install Dependencies**: Once MongoDB is running, install the dependencies by running:
   ```bash
   npm install
   ```
3. **Start the application**: Start the node.js service by running:
   ```bash
   npm start
   ```
This will start the service at http://localhost:5000.

4. Frontend Application: After starting the service, you can start the frontend application by running it separately. The frontend application will be accessible at http://localhost:4200.

If you need to customize the database URL or any other database configurations, you can make changes in the **utils/database.js** file.