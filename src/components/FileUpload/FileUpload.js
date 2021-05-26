import React from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import styles from "./FileUpload.module.scss";
import resolve from "resolve";

class FileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            uploadedImage: null,
            errorMessages: [],
            prediction: null
        };

        this.fileUploadContainer = React.createRef();
        this.fileUploadWrapper = React.createRef();
        this.loadingRef = React.createRef();
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
        this.fileUploadWrapper.current.classList.add(styles["loading"]);
        this.loadingRef.current.style.display = "block";

        const API_URL = process.env.REACT_APP_API_URL;
        const base64_image = await this.getBase64(this.state.file).then(base64_image => {
            let base64_image_array = base64_image.split(",");
            base64_image_array.shift();
            return base64_image_array.join(",");
        });
        
        const data = JSON.stringify({
            image: base64_image
        })

        const config = {
            timeout: 30000
        };
        

        const response_body = await axios.post(API_URL, data, config)
        .then(response => response.data)
        .catch(error => {
            console.log("hata verdi");
            // TODO: Handling http errors
            if (error.response) {
                console.log(error.response);
                // client received an error response (5xx, 4xx)
            }
            else if (error.request) {
                console.log(error.request);
                // client never received a response, or request never left
            }
        }).finally(() => {
            this.fileUploadWrapper.current.classList.remove(styles["loading"]);
            this.loadingRef.current.style.display = "none";
        })

        const prediction = response_body.prediction;
        
        this.setState({ prediction })

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
            errorMessages: [],
            prediction: null
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
                                className={styles["file-upload--wrapper"]}
                                ref={this.fileUploadWrapper}
                                >
                            <div
                                {...getRootProps({ className: 'dropzone' })}
                                className={styles["file-upload--container"]}
                                ref={this.fileUploadContainer}
                                >
                                <input {...getInputProps()} multiple={false}/>
                                <p>Drag an image to learn the result</p>
                            </div>
                            </div>
                        )}
                    </Dropzone>
                    <div className={styles["file-upload--output"]}>
                        <div className={styles["loading-gif"]} ref={this.loadingRef}></div>
                        <div className={styles["error"]}></div>
                        {this.state.uploadedImage &&
                        <React.Fragment>
                            {!this.state.prediction && <button onClick={() => this.predict()}>Get Results</button>}
                            {this.state.prediction && <h2 style={{fontSize: 36}}>{this.state.prediction}</h2>}
                            <div className={styles["uploaded-image"]}>
                                <img src={this.state.uploadedImage} alt="Uploaded" />
                            </div>
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