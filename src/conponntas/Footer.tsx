import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { TRootState } from "../store/store";

const Footer = () => {
  const user = useSelector((state: TRootState) => state.user.user);

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>

      
        <div style={styles.brand}>
          This Is My Web
        </div>

      
        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/about" style={styles.link}>About</Link>

          {user && (
            <>
              <Link to="/profile" style={styles.link}>Profile</Link>
              <Link to="/favourites" style={styles.link}>Favorites</Link>
              <Link to="/userCards" style={styles.link}>My Cards</Link>
              {user.isAdmin && <Link to="/admin" style={styles.link}>Admin</Link>}
            </>
          )}

          {!user && (
            <>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/register" style={styles.link}>Register</Link>
            </>
          )}
        </nav>

      
        <div style={styles.copyright}>
          © {new Date().getFullYear()} This Is My Web. All rights reserved to Ofir Dayan.
        </div>
      </div>
    </footer>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  footer: {
    backgroundColor: "#111827",
    color: "white",
    padding: "1.5rem 1rem",
    marginTop: "2rem",
    borderTop: "1px solid #374151",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
  },
  brand: {
    fontWeight: "800",
    fontSize: "1.5rem",
    fontFamily: "monospace",
  },
  nav: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    justifyContent: "center",
    flexGrow: 1,
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "300",
    letterSpacing: "0.1em",
    transition: "color 0.3s ease",
  },
  copyright: {
    flexBasis: "100%",
    textAlign: "center",
    marginTop: "1rem",
    fontSize: "0.875rem",
    color: "#9ca3af",
  },
};

export default Footer;
