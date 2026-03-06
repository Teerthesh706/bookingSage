**🎬 Booking Sage (Movie Ticket Booking System)**
====================================
<!-- ![Project Banner](https://images.unsplash.com/photo-1505685296765-3a2736de412f) -->

**Discription**
------------
A **full-stack Movie Ticket Booking application** built with the **MERN stack (MongoDB, Express, React, Node.js)**.

The platform allows users to browse movies, check showtimes, select seats, and book movie tickets online.

This project demonstrates **authentication, REST API architecture, seat booking logic, and database integration**.

---

# **🚀 Features**

### **🎟 User Features**
- User Authentication (JWT Login / Signup)
- Browse available movies
- View showtimes
- Select seats
- Book movie tickets
- View booking history
- Responsive UI

### **🔐 Security**
- JWT Authentication
- Protected Routes
- Secure API requests
- MongoDB database validation

### **⚡ Booking Logic**
- Seat availability checking
- Prevents double booking
- Booking confirmation flow

---

# **🧠 Booking Workflow**

```
User selects movie
        ↓
Select showtime
        ↓
Choose seats
        ↓
Check seat availability
        ↓
Confirm booking
        ↓
Store booking in database
```

---

# **🛠 Tech Stack**

## **Frontend**
- React.js
- Vite
- React Router
- Axios
- CSS / Tailwind

## **Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## **Tools**
- Git
- GitHub
- Postman

---

# **📂 Project Structure**

```
movie-ticket-booking
│
├── bms-frontend
│   ├── src
│   ├── components
│   ├── pages
│
├── bms-backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│
└── README.md
```

---

# **⚙️ Installation & Setup**

## **1️⃣ Clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/movie-ticket-booking.git
cd movie-ticket-booking
```

---

## **2️⃣ Install Backend Dependencies**

```bash
cd bms-backend
npm install
```

---

## **3️⃣ Install Frontend Dependencies**

```bash
cd ../bms-frontend
npm install
```

---

# **🔐 Environment Variables**

Create a `.env` file inside **bms-backend**

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Example:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bms
JWT_SECRET=supersecuresecretkey
```

---

# **▶️ Run the Application**

### **Start Backend**

```bash
cd bms-backend
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

### **Start Frontend**

```bash
cd bms-frontend
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# **📸 Screenshots**

### **Home Page**
(Add screenshot here)

### **Movie Selection**
(Add screenshot here)

### **Seat Booking**
(Add screenshot here)

### **Booking Confirmation**
(Add screenshot here)

---

# **🔌 Example API Endpoints**

### **Authentication**

```
POST /api/auth/register
POST /api/auth/login
```

### **Movies**

```
GET /api/movies
GET /api/movies/:id
```

### **Bookings**

```
POST /api/bookings
GET /api/bookings/:userId
```

---

# **🧪 Testing**

Use **Postman** to test API endpoints.

Example request:

```
POST /api/auth/login
```

---

# 🌟 Future Improvements

- Online Payment Integration (Stripe / Razorpay)
- Admin Dashboard
- Movie Reviews & Ratings
- Email Booking Confirmation
- Real-time seat locking

---

# 🤝 Contributing

1. Fork the repository  
2. Create a new branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# **👨‍💻 Author**

****Teerthesh Jain****

GitHub  
https://github.com/Teerthesh706

---

# **⭐ Support**

If you like this project, please ⭐ the repository.

<img alt="Footer" width=100% src="https://capsule-render.vercel.app/api?type=waving&color=305cde&height=100&section=footer">
