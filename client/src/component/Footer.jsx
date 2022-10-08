import { Link } from "react-router-dom";
import logo from "./../img/logo.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="left">
        <img src={logo} alt="Shaheb 10" width={30} />
        copyright&copy; 2022, by
        <Link
          className="link"
          to="http://www.github.com/systembugbd"
          target={"_blank"}
          rel="noopener noreferrer"
        >
          Shaheb Ali
        </Link>
      </div>
      <div className="right">
        Made with love and Full Stack ( <b>React, Node, MySql</b> ) Blog Site,
      </div>
    </footer>
  );
}

export default Footer;
