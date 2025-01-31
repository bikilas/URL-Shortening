import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import validator from "validator";
import "./App.css";

const Home = ({ isAuthenticated }) => {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleShorten = async () => {
    if (!validator.isURL(url)) {
      alert("Please enter a valid URL.");
      return;
    }

    try {
      const response = await fetch("https://tinyurl.com/api-create.php?url=" + encodeURIComponent(url));
      if (response.ok) {
        const tinyUrl = await response.text();
        setShortenedUrl(tinyUrl);
      } else {
        alert("Failed to shorten the URL.");
      }
    } catch (error) {
      console.error("Error shortening URL:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">URL Shortener</h1>
        <nav>
          <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link>
        </nav>
      </header>

      <main className="main">
        <div className="input-container">
          <input
            type="text"
            className="url-input"
            placeholder="Enter your URL here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className="shorten-button" onClick={handleShorten}>
            Shorten URL
          </button>
        </div>

        {shortenedUrl && (
          <div className="result">
            <p>Your shortened URL:</p>
            <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
              {shortenedUrl}
            </a>
          </div>
        )}
      </main>
    </div>
  );
};

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      alert("Login successful");
      setIsAuthenticated(true);
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
};

const SignUp = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = () => {
    localStorage.setItem("user", JSON.stringify({ email, password }));
    alert("Sign-up successful! Please log in.");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignUp}>Sign Up</button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </Router>
  );
};

export default App;
