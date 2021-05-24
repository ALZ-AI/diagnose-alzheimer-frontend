import React from "react";
import styles from "./style.module.scss";
import FileUpload from "./components/FileUpload/FileUpload";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Content from "./components/Content/Content";

class App extends React.Component {

	render() {

		return (
		
			<div className={styles.container}>
				<Header />
				<Content>
					<FileUpload />
				</Content>
				<Footer />
			</div>
		
		);

	}

}


export default App;
