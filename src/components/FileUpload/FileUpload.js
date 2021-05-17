import React from "react";
import axios from "axios";

class FileUpload extends React.Component {

    constructor(props) {
        super(props);
    }

    post() {
        const URL = "";
        
        axios.post(URL);
    }

    render() {

        return (
            <div>
                Merhaba dünya
            </div>
        );

    }
}

export default FileUpload;