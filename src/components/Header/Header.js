import React from "react";
import styles from "./Header.module.scss";
import Logo from "./src/header_logo.png";
class Header extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <header className={styles["header"]}>
                <a href="/">
                    <img src={Logo} alt="Menu Icon" className={styles["logo"]} />
                </a>
                <ul className={styles["menu-items"]}>
                    <a href="#home">
                        <li>Home</li>
                    </a>
                    <a href="#about-us">
                        <li>About Us</li>
                    </a>
                    <a href="#our-sponsors">
                        <li>Our Sponsors</li>
                    </a>
                    <a href="#contact-us">
                        <li>Contact Us</li>
                    </a>
                </ul>
            </header>
        )
    }

}


export default Header;