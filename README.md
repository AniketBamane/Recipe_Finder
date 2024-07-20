<h1>Recipe Finder</h1>

<h2>Overview</h2>
<p>Recipe Finder is a web application designed to help users search for recipes, manage their favorites, and share recipes with others. The project uses a MERN stack (MongoDB, Express.js, React.js, Node.js) and includes features like user authentication, infinite scrolling, and email notifications.</p>

<h2>Table of Contents</h2>
<ul>
  <li><a href="#features">Features</a></li>
  <li><a href="#technologies-used">Technologies Used</a></li>
  <li><a href="#installation">Installation</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#screenshots">Screenshots</a></li>
  <li><a href="#contributing">Contributing</a></li>
  <li><a href="#team-members">Team</a></li>
</ul>

<h2 id="features">Features</h2>
<ul>
  <li>User authentication (signup, login, logout)</li>
  <li>Search for recipes with filters</li>
  <li>Add recipes to favorites</li>
  <li>Share recipes with others</li>
  <li>Infinite scrolling for recipe browsing</li>
  <li>Email notifications using Nodemailer</li>
  <li>Responsive design</li>
</ul>

<h2 id="technologies-used">Technologies Used</h2>
<h3>Frontend:</h3>
<ul>
  <li>React.js</li>
  <li>React Hot Toast for notifications</li>
</ul>
<h3>Backend:</h3>
<ul>
  <li>Node.js</li>
  <li>Express.js</li>
  <li>MongoDB</li>
</ul>
<h3>Other:</h3>
<ul>
  <li>Nodemailer for sending email notifications</li>
</ul>

<h2 id="installation">Installation</h2>
<h3>Prerequisites</h3>
<ul>
  <li>Node.js and npm installed on your machine</li>
  <li>MongoDB installed and running</li>
</ul>

<h3>Backend Setup</h3>
<ol>
  <li>Clone the repository:
    <pre><code>git clone https://github.com/yourusername/recipe-finder.git
cd recipe-finder</code></pre>
  </li>
  <li>Install backend dependencies:
    <pre><code>cd backend
npm install</code></pre>
  </li>
  <li>Create a <code>.env</code> file in the <code>backend</code> directory and add your environment variables:
    <pre><code>PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password</code></pre>
  </li>
  <li>Start the backend server:
    <pre><code>npm start</code></pre>
  </li>
</ol>

<h3>Frontend Setup</h3>
<ol>
  <li>Install frontend dependencies:
    <pre><code>cd ../client
npm install</code></pre>
  </li>
  <li>Create a <code>.env</code> file in the <code>frontend</code> directory and add your environment variables:
    <pre><code>VITE_BACKEND_URL=http://localhost:3000</code></pre>
  </li>
  <li>Start the frontend development server:
    <pre><code>npm run dev</code></pre>
  </li>
</ol>

<h2 id="usage">Usage</h2>
<ol>
  <li>Open your browser and navigate to <code>http://localhost:5173</code> (or the port specified by Vite).</li>
  <li>Sign up or log in to your account.</li>
  <li>Search for recipes, add to favorites, and share them with others.</li>
  <li>Enjoy exploring new recipes!</li>
</ol>

<h2 id="screenshots">Screenshots</h2>
<img src="https://github.com/user-attachments/assets/1f1cd8b2-e7a6-4173-9eb7-c2e721d1c122"  alt="home page">
<img src="https://github.com/user-attachments/assets/6d197a19-ccf9-45da-983d-e47186e90433"  alt="recipe page">
<img src="https://github.com/user-attachments/assets/1cd31aa8-d017-4078-a40e-90c7a9a12a64"  alt="favourite page">

<h2 id="contributing">Contributing</h2>
<p>Contributions are welcome! Please fork the repository and create a pull request with your changes.</p>
<ol>
  <li>Fork the Project</li>
  <li>Create your Feature Branch (<code>git checkout -b feature/YourFeature</code>)</li>
  <li>Commit your Changes (<code>git commit -m 'Add some YourFeature'</code>)</li>
  <li>Push to the Branch (<code>git push origin feature/YourFeature</code>)</li>
  <li>Open a Pull Request</li>
</ol>

<h2 id="team-members">Team Members</h2>
<ul>
  <li>Eshwar Gunisetti - Full Stack Web Developer</li>
  <li>Kirti Swami - Frontend Developer</li>
  <li>Mohd Sufiyan - Frontend Developer </li>
  <li>Pardeep - Backend Developer</li>
  <li>Shantha Priya T - Full Stack Web Developer</li>
  <li>Taiba Khan - Frontend Developer</li>
  <li>Aniket Bamane  - Full Stack Web Developer</li>
</ul>

