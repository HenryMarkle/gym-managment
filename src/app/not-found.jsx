import React from "react";

const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>404</h1>
        <p style={styles.subtitle}>Page Not Found</p>
        <p style={styles.description}>
          Oops! The page you are looking for does not exist. It might have been
          moved or deleted.
        </p>
        <a href="/panel" style={styles.homeButton}>
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f8f9fa",
    color: "#5540fb",
    textAlign: "center",
  },
  content: {
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "white",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "96px",
    margin: "0",
    color: "#ff6700",
  },
  subtitle: {
    fontSize: "36px",
    margin: "10px 0",
  },
  description: {
    fontSize: "18px",
    margin: "20px 0",
  },
  homeButton: {
    display: "inline-block",
    padding: "10px 20px",
    fontSize: "18px",
    color: "white",
    backgroundColor: "#5540fb",
    textDecoration: "none",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  },
  homeButtonHover: {
    backgroundColor: "#4030fb",
  },
};

export default NotFoundPage;
