# Expense Tracker Application

A comprehensive full-stack application designed to help you track your income and expenses efficiently. This application features a modern React frontend and a robust Spring Boot backend, providing a seamless user experience for managing personal finances.

## 🚀 Features

-   **User Authentication**: Secure login and registration using JWT (JSON Web Tokens) and Google OAuth2 configuration.
-   **Dashboard**: Visual overview of your financial health with interactive charts and summaries.
-   **Income Management**: Add, view, edit, and delete income sources.
-   **Expense Tracking**: detailed categorization of expenses to see where your money goes.
-   **Reports & Analytics**: Generate insights into your spending habits with graphical representations.
-   **Responsive Design**: Built with Tailwind CSS for a mobile-friendly interface.

## 🛠️ Tech Stack

### Frontend
-   **Link**: `Frontend-Expense-Tracker/`
-   **Framework**: [React](https://react.dev/) (powered by [Vite](https://vitejs.dev/))
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Libraries**:
    -   `axios` for API requests
    -   `recharts` for data visualization
    -   `lucide-react` for icons
    -   `react-router-dom` for navigation

### Backend
-   **Link**: `Backend-Expense-Tracker/ExpenceTrackerBackend/`
-   **Framework**: [Spring Boot 3.4.1](https://spring.io/projects/spring-boot)
-   **Language**: Java 17
-   **Database**: MySQL
-   **Security**: Spring Security, OAuth2 Client, JWT
-   **Build Tool**: Maven

## 📋 Prerequisites

Ensure you have the following installed on your local machine:
-   **Node.js** (v18 or higher)
-   **Java Development Kit (JDK)** (v17 or higher)
-   **MySQL Server**
-   **Git**

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/expense-tracker-application.git
cd expense-tracker-application
```

### 2. Backend Setup
Navigate to the backend directory:
```bash
cd Backend-Expense-Tracker/ExpenceTrackerBackend
```

**Configuration**:
1.  Open `src/main/resources/application.properties` (create if it doesn't exist).
2.  Configure your MySQL database connection and OAuth2 settings:
    ```properties
    spring.application.name=ExpenceTrackerBackend
    
    # Database Configuration
    spring.datasource.url=jdbc:mysql://localhost:3306/expense_tracker_db
    spring.datasource.username=YOUR_DB_USERNAME
    spring.datasource.password=YOUR_DB_PASSWORD
    spring.jpa.hibernate.ddl-auto=update
    
    # OAuth2 Configuration (if using Google Login)
    spring.security.oauth2.client.registration.google.client-id=YOUR_GOOGLE_CLIENT_ID
    spring.security.oauth2.client.registration.google.client-secret=YOUR_GOOGLE_CLIENT_SECRET
    
    # JWT Secret (if applicable)
    jwt.secret=YOUR_SECURE_JWT_SECRET
    ```

**Run the Backend**:
```bash
./mvnw spring-boot:run
```
The backend server will start on `http://localhost:8080`.

### 3. Frontend Setup
Navigate to the frontend directory:
```bash
cd ../../Frontend-Expense-Tracker
```

**Install Dependencies**:
```bash
npm install
```

**Run the Development Server**:
```bash
npm run dev
```
The frontend application will start on `http://localhost:5173` (or the port shown in your terminal).

## 🔌 API Endpoints

| Controller | Description | Base Path |
| :--- | :--- | :--- |
| **AuthController** | User registration and login | `/api/auth` (inferred) |
| **IncomeController** | Manage income records | `/api/income` (inferred) |
| **ExpenseController** | Manage expense records | `/api/expense` (inferred) |
| **ReportController** | Generate financial reports | `/api/reports` (inferred) |

> **Note**: Verify exact endpoints in the controller files.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
