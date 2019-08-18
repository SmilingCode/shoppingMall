import React from 'react';

import FileUpload from './react-fileupload.js';

class FileUploader extends React.Component {
    render(){
        /*set properties*/
        const options={
            baseUrl:'/manage/product/upload.do',
            fileFieldName: 'upload_file',
            dataType: 'json',
            chooseAndUpload: true,
            uploadSuccess: this.props.onSuccess,  //res => {console.log(res)},
            uploadError: this.props.onError     // err => {console.log(err)}
        }
        /*Use FileUpload with options*/
        /*Set two dom with ref*/
        return (
            <FileUpload options={options}>
                <button className="btn btn-xs btn-primary" ref="chooseAndUpload">choose</button>
            </FileUpload>
        )
    }
}

export default FileUploader;
