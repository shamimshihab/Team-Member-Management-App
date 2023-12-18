# Team Member Management App

It is an application designed to efficiently manage team members information within an organization.

## Technology Used In This Project:

- **Frontend Framework:** React
- **Frontend Architecture:** Microfrontend using React's capabilities and Module Federation
- **UI Framework:** Material UI for user interface
- **Backend:** Node.js and Express.js for the server-side environment
- **Database:** MongoDB for data storage
- **Build Tool:** Webpack 5 with Module Federation for efficient code splitting and module loading

## Project Organization

The project can be divided into two parts: frontend and backend.

### Backend

This backend system is designed using Node.js and Express, offering a set of RESTful APIs to handle team member data. MongoDB serves as the database

### Features

- **Routes**: Configured endpoints for CRUD (Create, Read, Update, Delete) operations on team members.

- **Endpoints**:
  - `/team/addTeamMember`: POST request to add a new team member.
  - `/team/updateTeamMember/:id`: PUT request to update an existing team member by ID.
  - `/team/teamMembers`: GET request to fetch paginated team members.
  - `/team/teamMember/:id`: GET request to retrieve a specific team member by ID.
  - `/team/teamMember/:id`: DELETE request to remove a team member by ID.

1. **Running the Backend:**
   - Navigate to the `backend` folder using:
     ```
     cd backend
     ```
   - Install npm packages:
     ```
     npm install
     ```
   - Start the backend server:
     ```
     nodemon index.js
     ```

### Frontend

The frontend is structured into micro frontend apps (`teamMember`, `addTeamMember`) and a shell container named `mainApp`.

#### Micro Frontends:

1. **`teamMember` Micro Frontend:**

   - Contains ListPage displaying team members' list and EditTeamMemberPage for individual team member information edit and delete.

2. **`addTeamMember` Micro Frontend:**
   - Includes AddMemberPage for entering and saving team member information.

#### Shell Container - `mainApp`:

The `mainApp` integrates the micro frontends (`teamMember` and `addTeamMember`) to create the complete application.

**Running the Frontend:**

### Micro Frontend - `teamMember` and `addTeamMember`

1. **Navigate to the `teamMember` directory:**

   ```
   cd frontend/teamMember
   ```

2. **Install required npm packages:**

   ```
   npm install
   ```

3. **Start the `teamMember` micro frontend:**

   ```
   npm start
   ```

4. **Repeat the above steps for the `addTeamMember` micro frontend:**

### Shell Container - `mainApp`

After running, both micro frontend, running `mainApp` can be started

Upon running both micro frontends, executing the mainApp will initiate its launch.

1. **Navigate to the `mainApp` directory:**

   ```
   cd frontend/mainApp
   ```

2. **Install required npm packages:**

   ```
   npm install
   ```

3. **Start the `mainApp` shell container:**
   ```
   npm start
   ```

## Features Added

This project incorporates several key features enhancing the user experience:

### Pagination Implementation

Pagination functionality has been integrated into both the backend and frontend. This addition allows better management and display of team members' data by breaking it into organized and easily navigable sections.

### Mandatory Input Fields

During team member form submission, all input fields are set as obligatory. This ensures that all required fields must be filled before saving a team member's information. If any mandatory field is left blank, the data won't be saved until all required inputs are provided.

### Input Validation for Contact and Email

- **Contact Information:** A validation mechanism has been implemented for the team member's contact input. Only numerical values are accepted in this field. Any input other than numbers will trigger an error, ensuring valid contact information is entered.
- **Email Validation:** In the team member's email input section, the system checks for the presence of the '@' symbol. Without the '@' symbol in the email field, an error is displayed, prompting users to enter a valid email address format.

### Confirmation Prompt for Deletion

When a user attempts to delete a team member's profile, a confirmation prompt appears to ensure intentional deletion. This feature minimizes accidental deletions, providing a safety mechanism to prevent unintentional data loss.


