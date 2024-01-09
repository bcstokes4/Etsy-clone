import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <ul className="footer-container">
      <li className="footer-name">Brian Stokes</li>
      <l1>
        <a
          className="footer-links"
          target="_blank"
          href="https://github.com/bcstokes4"
        >
          <i className="fa-brands fa-github"></i>
        </a>
      </l1>
      <li>
        <a
          className="footer_links linkedin"
          target="_blank"
          href="https://www.linkedin.com/in/brian-stokes-86a842124/"
        >
          <i className="fa-brands fa-linkedin"></i>
        </a>
      </li>
    </ul>
  );
}
export default Footer;
