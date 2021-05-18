import React from "react";
import styles from "./style.module.scss";
import FileUpload from "./components/FileUpload/FileUpload";

class App extends React.Component {

	constructor(props) {
		super(props);
	}


	render() {

		return (
			<div className={styles.container}>
				<FileUpload />
			</div>
		);

	}

}


export default App;
