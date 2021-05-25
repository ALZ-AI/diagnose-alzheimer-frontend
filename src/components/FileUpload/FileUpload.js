import React from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import styles from "./FileUpload.module.scss";

class FileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            uploadedImage: null,
            errorMessages: []
        };

        this.fileUploadContainer = React.createRef();
    }


    getBase64 = file => {
        return new Promise(resolve => {
            let baseURL = "";

            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    };
     

    predict = async () => {
        const API_URL = process.env.REACT_APP_API_URL;
        const base64_image = this.getBase64(this.state.file);
        console.log(base64_image);
        const response = await axios({
            method: "post",
            url: API_URL,
            headers: { "Content-Type": "application/json" },
            data: {
                image: base64_image
            }
        }).catch(error => {
            // TODO: Handling http errors
            if (error.response) {
                // client received an error response (5xx, 4xx)
            }
            else if (error.request) {
                // client never received a response, or request never left
            }
        });

        console.log(response)

        // TODO: Create response UI
    }
    
    onDropAccepted = async files => {
        // * There is only one file in files variables
        const file = files[0];
        const uploadedImage = URL.createObjectURL(file);
        this.fileUploadContainer.current.classList.remove(styles["drag-over"]);

        this.setState({
            file,
            uploadedImage,
            errorMessages: []
        });
    }

    produceErrorMessage = errorCode => {
        const codeMessages = {
            "too-many-files": "Lütfen sadece 1 dosya yükleyin",
            "file-invalid-type": "Sadece resim formatındaki dosyaları yükleyebilirsiniz"
        };

        if (codeMessages[errorCode]) {
            return codeMessages[errorCode];
        }
        else {
            throw new Error("Invalid Error Code");
        }
    }

    onDropRejected = files => {
        let errorCodes = [];

        files.map(item => {
            errorCodes.push(item.errors[0].code);
        });
        errorCodes = [...new Set(errorCodes)];

        const errorMessages = errorCodes.map(errorCode => {
            return this.produceErrorMessage(errorCode);
        });
        this.fileUploadContainer.current.classList.remove(styles["drag-over"]);

        this.setState({ errorMessages, uploadedImage: null, file: null });
    }

    onDragEnter = () => {
        this.fileUploadContainer.current.classList.add(styles["drag-over"]);
    }

    onDragLeave = () => {
        this.fileUploadContainer.current.classList.remove(styles["drag-over"]);
    }

    render() {
        return (
            <React.Fragment>
                <div className={styles["container"]}>
                    <Dropzone accept="image/*"
                        maxFiles={1}
                        onDropAccepted={this.onDropAccepted}
                        onDropRejected={this.onDropRejected}
                        onDragEnter={this.onDragEnter}
                        onDragLeave={this.onDragLeave}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div
                                {...getRootProps({ className: 'dropzone' })}
                                className={styles["file-upload--container"]}
                                ref={this.fileUploadContainer} >
                                <input {...getInputProps()} multiple={false} />
                                <p>Drag an image to learn the result</p>
                            </div>
                        )}
                    </Dropzone>
                    <div className={styles["file-upload--output"]}>
                        <div className={styles["error"]}></div>
                        {this.state.uploadedImage &&
                        <React.Fragment>
                            <div className={styles["uploaded-image"]}>
                                <img src={this.state.uploadedImage} alt="Uploaded" />
                            </div>
                            <button onClick={this.predict}>Get Results</button>
                        </React.Fragment>
                        }
                    </div>
                    {this.state.errorMessages &&
                    <ul>
                        {this.state.errorMessages.map(errorMessage => <li key={Math.random()}>{errorMessage}</li>)}
                    </ul>
                    }
                </div>
            </React.Fragment>
        );

    }
}

export default FileUpload;