# Task Management Application

## Steps to Run

### Prerequisites
- **Node.js**: Preferably Node 18 to 20
- **Angular CLI**: Use the following command to install Angular CLI if not already installed:

```bash
npm install -g @angular/cli@17
```

- The backend service should be running on **PORT 5000**. Follow instructions in the service branch to start the backend service.

### To Start the Application
1. Clone the repository and navigate to the project directory.
2. Run the following command to install dependencies:

```bash
npm install
```

3. Start the application:

```bash
npm start
```

Once the application is running, it can be accessed at http://localhost:4200.

## How to Use

1. Start by clicking the **Add Task** button at the bottom right of the application.
2. A form will load where you need to provide details of the task. You can't create a task until all the validation criteria are fulfilled.
3. Once the task is saved, all tasks for the user will be available on the dashboard.
4. You can click on any task to view more details.
5. You can edit the status of the task directly from the button provided on the dashboard.
6. Other properties can be edited by clicking the **Edit** button and updating the values in the form.
7. You can delete a task by clicking the **Delete** button. A confirmation dialog will appear to prevent deletion by mistake.
8. Additional details such as description, created date, updated date, and the number of days left for the task due date will be shown. If the due date has passed, it will show a message indicating that the due date is over.
9. You can use the filters to view tasks with a selected status only by using the checkboxes provided.
10. You can search for tasks by title using the search bar at the top.

Relevant error messages will display if no tasks are available, and success messages will appear after a successful operation. If any API requests fail, error messages will be shown.

## Form Validations Used
- **Required Fields**: Title, Description, and Status
- **No Duplicate Title**
- **No Special Characters Allowed** in the Title, except for hyphens (`-`) and underscores (`_`).
- **Maximum Length**:
- Title: 50 characters
- Description: 250 characters

## Running Unit Tests

To run the unit tests for the application, use the following command:
```bash
npm run test
```