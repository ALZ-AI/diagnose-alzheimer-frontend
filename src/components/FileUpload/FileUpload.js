import React from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
// TODO: import styles from "./FileUpload.module.scss";

class FileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadedImage: [],
            errorMessages: []
        };
        this.onDropAccepted = this.onDropAccepted.bind(this);
        this.onDropRejected = this.onDropRejected.bind(this);
        this.produceErrorMessage = this.produceErrorMessage.bind(this);
    }

    post() {
        const URL = "";

        axios.post(URL);
    }

    onDropAccepted(files) {
        // * There is only one file in files variables
        const file = files[0];
        const uploadedImage = URL.createObjectURL(file);
        this.setState({
            uploadedImage,
            errorMessages: []
        });
    }

    produceErrorMessage(errorCode) {
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

    onDropRejected(files) {
        alert("merhanba");
        let errorCodes = [];

        files.map(item => {
            errorCodes.push(item.errors[0].code);
        });
        errorCodes = [...new Set(errorCodes)];

        const errorMessages = errorCodes.map(errorCode => {
            return this.produceErrorMessage(errorCode);
        });

        this.setState({ errorMessages });
    }

    render() {
        return (
            <div>
                <Dropzone accept="image/*" maxFiles={1} onDropAccepted={this.onDropAccepted} onDropRejected={this.onDropRejected}>
                    {({ getRootProps, getInputProps }) => (
                        <section className="container">
                            <div {...getRootProps({ className: 'dropzone' })} style={{
                                cursor: "copy", background: "red", height: 300, fontFamily: "roboto"
                            }}>
                                <input {...getInputProps()} multiple={false} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                        </section>
                    )}
                </Dropzone>
                {this.state.errorMessages &&
                <ul>
                    {this.state.errorMessages.map(errorMessage => <li key={Math.random()}>{errorMessage}</li>)}
                </ul>
                }
                {this.state.uploadedImage &&
                <img src={this.state.uploadedImage} width={200} />}
            </div>
        );

    }
}

export default FileUpload;