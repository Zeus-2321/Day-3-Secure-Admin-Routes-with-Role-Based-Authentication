import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [content, setContent] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/";
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.user.role === 'admin') {
          setIsAdmin(true);
          setContent(response.data.message);
        } else {
          setIsAdmin(false);
          setErrorMessage("You do not have admin access. This page is confidential.");
        }
      } catch (error) {
        setErrorMessage("Access denied or token expired.");
        console.log(error);
        setIsAdmin(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Countdown and redirect logic
  useEffect(() => {
    if (!isAdmin && errorMessage) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            window.location.href = "/";
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isAdmin, errorMessage]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {!isAdmin ? (
        <div>
          <p>{errorMessage}</p>
          {errorMessage && <p>Redirecting in {countdown} seconds...</p>}
        </div>
      ) : (
        <div>
          <p>{content}</p>
          <button onClick={handleLogout} style={{ marginTop: '1rem' }}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Admin;
