import React from "react";
import styles from "./Footer.module.scss";

class Footer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className={styles.footer}>
                merhaba dünya
            </footer>
        )
    }


}

export default Footer;