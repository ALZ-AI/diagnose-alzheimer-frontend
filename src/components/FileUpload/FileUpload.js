import React from "react";
import axios from "axios";
import Dropzone from "react-dropzone";

// TODO: import styles from "./FileUpload.module.scss";

class FileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            uploadedImage: null,
            errorMessages: []
        };
    }


    getBase64 = file => {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                console.log("Called", reader);
                baseURL = reader.result;
                console.log(baseURL);
                resolve(baseURL);
            };
            console.log(fileInfo);
        });
    };
    
    
    predict = async () => {
        const URL = "";

        try {

            const response = await axios.post(URL, {
                headers: { "Accept": "application/json" }
            });

            if (!response)
                throw Error("Internet connection is weak");
            
            console.log(response);

            

        }
        catch(error) {
            throw new Error(error);
        }
    }
    
    onDropAccepted = async files => {
        // * There is only one file in files variables
        const file = files[0];
        const uploadedImage = URL.createObjectURL(file);
        this.setState({
            file,
            uploadedImage,
            errorMessages: []
        });
        const response = await axios({
            method: "post",
            url: "https://u4omlv2i51.execute-api.eu-central-1.amazonaws.com/dev/example-function",
            headers: {},
            data: {
                name: "enesince",
                image: ""
            }
        });
        console.log(response);
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

        files.foreach(item => {
            errorCodes.push(item.errors[0].code);
        });
        errorCodes = [...new Set(errorCodes)];

        const errorMessages = errorCodes.map(errorCode => {
            return this.produceErrorMessage(errorCode);
        });

        this.setState({ errorMessages, uploadedImage: null, file: null });
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
                <img src={this.state.uploadedImage} width={200} alt="Uploaded" />}
            </div>
        );

    }
}

export default FileUpload;