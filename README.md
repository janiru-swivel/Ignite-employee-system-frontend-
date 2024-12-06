Here’s an updated **README.md** tailored for your **Next.js** application for the User Management System:

```markdown
# User Management System - Frontend

This is the frontend application for the **User Management System**, built using **Next.js**. It provides an interface to manage users, including features such as creating, viewing, updating, and deleting user records. The application integrates with a backend API for managing user data.

---

## **Features**

- View all users in a responsive table.
- Add new users through a form.
- Edit existing user details.
- Delete users with confirmation dialogs.
- Notifications for success and error messages using `react-hot-toast`.
- Fully responsive design using **Bootstrap**.

---


---

## **Technologies Used**

- **Next.js**: Framework for building server-rendered React applications.
- **Axios**: For handling HTTP requests.
- **Bootstrap**: For responsive UI design.
- **React Hot Toast**: For toast notifications.
- **React Query** (optional): For data fetching and state management.

---

## **Setup and Installation**

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Steps to Install and Run

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/user-management-nextjs.git
   cd user-management-nextjs
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Environment Variables**
   Create a `.env.local` file in the root directory and add your backend API URL:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

---

## **Pages and Navigation**

| **Page**           | **Path**          | **Description**                     |
|---------------------|-------------------|-------------------------------------|
| Home                | `/`               | Displays a table of users           |
| Add User            | `/add`            | Form to add a new user              |
| Edit User           | `/edit/[id]`      | Form to edit an existing user       |

---

## **API Integration**

The application communicates with the following backend API endpoints:

| Endpoint           | Method | Description                |
|--------------------|--------|----------------------------|
| `/api/users`       | GET    | Fetch all users            |
| `/api/user/:id`    | GET    | Fetch user by ID           |
| `/api/user`        | POST   | Add a new user             |
| `/api/user/:id`    | PUT    | Update user by ID          |
| `/api/user/:id`    | DELETE | Delete user by ID          |

---

## **Custom Scripts**

### Development Server
```bash
npm run dev
# or
yarn dev
```

### Build for Production
```bash
npm run build
# or
yarn build
```

