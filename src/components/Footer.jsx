import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer card">
      <small>© {new Date().getFullYear()} AccessPath — Desenvolvido por Clara</small>
    </footer>
  );
}
