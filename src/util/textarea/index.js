import React from 'react';

import Simditor from 'simditor';
import 'simditor/styles/simditor.scss';
import './index.scss';

// textarea(Simditor) which is based on Jquery and module.js
class TextArea extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.loadTextArea();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.defaultDetail == nextProps.defaultDetail) {
            return;
        }

        this.simditor.setValue(nextProps.defaultDetail);
    }

    loadTextArea() {
        let ele = this.refs['textarea'];
        this.simditor = new Simditor({
            textarea: $(ele),
            defaultValue: this.props.placeholder || 'please edit your product detail here',
            upload: {
                url: '/manage/product/richtext_img_upload.do',
                defaultImage: '',
                filekey: 'upload_file'
            }
        });
        this.bindEditorEvent();
    }

    bindEditorEvent() {
        this.simditor.on('valuechanged', e => {
            this.props.onValueChange(this.simditor.getValue());
        })
    }

    render(){
        return (
            <div>
                <textarea ref="textarea"></textarea>
            </div>
        )
    }
}

export default TextArea;
