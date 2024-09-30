# Welcome to Advanced Role-Based Access Control (RBAC)!

![Placeholder Image](https://raw.githubusercontent.com/vivekkv178/cdn/main/rbac/Thumbnail.png)

Looking to manage user roles and permissions with precision and control? Our Role-Based Access Control (RBAC) system is designed to give you powerful management over user access in your applications. With modern technology and a user-friendly interface, we offer a comprehensive set of features to handle user authentication and authorization.

---

**Key Features:**

1. **Sign Up:** Easily onboard new users with a secure registration process. Manage role assignment from the start.

2. **Sign In:** Authenticate users through a robust, secure login system to ensure access only to authorized individuals.

3. **Manage Users - List, Add, Read, Update, Delete:**
   - **List:** View all users in the system.
   - **Add:** Add new users with specific role assignments.
   - **Read:** Retrieve detailed information about individual users, including their permissions and roles.
   - **Update:** Modify user roles or permissions to reflect changes in access levels.
   - **Delete:** Remove users and revoke access efficiently.

---

This platform is built for flexibility, scalability, and security, ensuring that your applications have the right access control mechanism in place to grow as your user base and complexity increase.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- Node.js (version 20 or higher)
- npm (Node package manager)
- Git

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/vivekkv178/rbac-be.git
   cd rbac-be
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

### Configuration

Make sure to set up your environment variables. Create a `.env` file in the root of your project and add the necessary configurations.

#### Backend Environment Variables

```plaintext
MONGO_URL=mongodb+srv://<username>:<password>@<cluster>/<dbname>?retryWrites=true&w=majority&appName=<appname>
TYPEORM_LOGGING=false
JWT_SECRET=secret
OPEN_API_DOMAIN=http://localhost:3001
```

### Running the Application

To start the development server, run:

```bash
npm run start:dev
```

Open your browser and navigate to [http://localhost:3001](http://localhost:3001) to view your application.
