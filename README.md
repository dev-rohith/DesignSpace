# 🖌️ Collaborative Design Space Platform 🎨

## 🚀 About the Project
The Collaborative Design Space Platform is a full-stack MERN application that connects designers, clients, and associates for seamless collaboration. 
It provides a space where designers can showcase their portfolios, communicate with clients, and manage projects efficiently.

## 🎯 Problem It Solves
- **Bridging the Gap**: Clients struggle to find and interact with designers, while designers need a platform to showcase their work and get hired (freelance).
- **Real-time Communication**: Enables chat between designers and clients with media sharing (supports images, audio, video, more will be added in later versions).
- **Project Management**: Clients can accept projects and track progress effortlessly.
- **Role-Based Access**: Different users (designers, clients, associates, and admins) have dedicated functionalities.

## 🛠️ Tech Stack
- **Frontend**: React + Vite + Tailwind CSS (without using component libraries)
- **Backend**: Node.js, Express.js, MongoDB, Redis (caching, chat feature optimization, login and token rotation optimization)
- **Authentication**: JWT & Token rotation with help of cookies
- **State Management**: Redux Toolkit & Context API
- **Real-time Features**: Socket.io for instant messaging
- **Deployment**: Aws(ssl, sub domain, pm2, secure connection, strict cors) (Backend), Vercel (Frontend with domain), dns on point.

## ✨ Features
- ✅ Interactive Chat System (with media sharing & real-time updates)
- ✅ Project & Task Management (designers create projects, associates accept tasks)
- ✅ Premium Membership (clients unlock more features & communication access)
- ✅ Secure Payment Integration (for subscription purchases which allow clients to talk with designers unlimited until subscription expires)
- ✅ Admin Dashboard (managing users & platform analytics)

## 🔗 Live Demo
Live deployed link with secure connection:
https://www.designspace.live/

### Login Credentials for Testing

#### Admin Login:
- Email: admin@gmail.com
- Password: Admin@123

#### Client Login:
- Email: client@gmail.com
- Password: Client@123

#### Designer Login:
- Email: designer1@gmail.com
- Password: Designer@123

#### Associate Login:
- Email: associate1@gmail.com
- Password: Associate@123

## 📌 Getting Started

```bash
# Clone the repository
git clone you will find it on green code button

# Navigate to the project folder
cd repo-name

# Install dependencies
npm install

# Run the application
npm run dev (for both frontend and backend as development run)
```

## 🛡️ Security Considerations
- JWT rotation for enhanced security
- OAuth integration for seamless login
- Role-based access control to protect sensitive data

## 🤝 Contributing
We welcome contributions! Follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m "Added new feature"`)
4. Push to your branch (`git push origin feature-branch`)
5. Open a Pull Request (guidelines should be followed)

## 📬 Contact & Support
For queries, reach out via Email or open an issue.

---

📌 Star the repository ⭐ if you found it useful!
