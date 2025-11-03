📝 Blog Backend

A RESTful API backend for a blogging platform, built with Node.js, Express, and MongoDB.
It supports user authentication, post and comment management, and secure access using JWT.

🚀 Features

🔐 User authentication (Register, Login, Logout)

✍️ Create, Read, Update, Delete (CRUD) blog posts

💬 Comment system for posts

🧑‍💻 Role-based access control (Admin/User)

🖼️ Image upload support for posts

🗄️ MongoDB integration with Mongoose

🧰 Error handling and validation


🧩 Tech Stack
Layer	Technology
Server	         Node.js, Express.js
Database	       MongoDB (Mongoose)
Authentication	 JWT (JSON Web Tokens)
File Uploads	   Multer
Environment	     dotenv


⚙️ Installation and Setup

1️⃣ Clone the repository
git clone https://github.com/your-username/blog-backend.git
cd blog-backend

2️⃣ Install dependencies
npm install

3️⃣ Create a .env file
Add the following environment variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4️⃣ Start the development server
 npm run dev
Server runs by default on http://localhost:5000

🧑‍💻 Author

ahmed hefow
github.com/hefow https://www.linkedin.com/in/ahmed-ibrahim-hefow-ba5588267/

