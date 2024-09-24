# 🌟 **RLexicon** – A Freemium Multi-Tenant Blog SaaS Platform 📝🚀

Welcome to **RLexicon**, a modern **freemium Blog SaaS platform** built to empower content creators to manage, write, and publish their blogs seamlessly. Whether you're a beginner or a seasoned writer, RLexicon offers the tools to take your content creation to the next level! 🎯

### **Features**:
- **Free for Readers**: Browse and enjoy content from various authors, all for free! 🌍📖
- **Freemium Model for Authors**:
  - Create blog posts with a **Notion-style rich text editor** 📝.
  - **Free Tier**: Basic blog creation tools with limited channels and functionality 🚶‍♂️.
  - **Premium Tier**: Unlock advanced features like **AI Writer** 🤖, **SEO Check Assistant** 🕵️‍♂️, additional channels, multi-user collaboration, and more! 🚀.
- **Multi-Tenant Support**: Each author gets their own blog with a unique URL (`blogplatform.com/userID/channelName`) 🌐.
- **Seamless File Uploads**: Easily upload images and media files via **Uploadthing** and **Cloudinary** 📷📂.
- **Real-Time Updates**: Engage with readers through real-time comments, views, and interactions using **Supabase Realtime** 💬⚡.
- **Payments & Subscriptions**: Integrated **Stripe** for easy subscription management and payments 💳.

### **Tech Stack**:
- **Frontend & Backend**: Built with **Next.js 15 with ShadcnUI and Tailwind CSS** ⚛️.
- **Database**: Managed with **Prisma ORM** and **Supabase** for secure, multi-tenant data handling 🛠️.
- **Authentication**: Handled by **KindAuth** for secure logins and role-based access control 🔒.
- **Global State Management**: Powered by **Redux Toolkit** for smooth and scalable state handling ⚙️.

### **Premium Features**:
- **AI Writer**: Let AI help you generate high-quality content in minutes 🤖✨.
- **SEO Check Assistant**: Real-time SEO analysis to optimize your blog for search engines 📈🔍.
- **Collaboration**: Add editors, assign roles, and collaborate with your team to create great content together 🤝.

### **How to Run the Project**:
1. **Clone the Repository**:  
```bash
git clone https://github.com/yourusername/RLexicon.git
```
2. **Install the Dependencies**:  
```bash
npm install
```
3. **Set Up API Keys for Supabase, Stripe, and Cloudinary and others in** .env
4. **Run the Project**:  
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

