import React from "react";
import styles from "./Header.module.scss";
import Logo from "./src/header_logo.jpg";
class Header extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <header className={styles.header}>
                <a href="/">
                    <img src={Logo} alt="Menu Icon" className={styles["logo"]} />
                </a>
                <ul className={styles["menu-items"]}>
                    <a>
                        <li>Ana Sayfa</li>
                    </a>
                    <a>
                        <li>Hakkımızda</li>
                    </a>
                    <a>
                        <li>Sponsorlarımız</li>
                    </a>
                    <a>
                        <li>İletişim</li>
                    </a>
                </ul>
            </header>
        )
    }

}


export default Header;