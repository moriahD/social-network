import React from "react";

export default class Uploader extends React.Component {
    render() {
        return (
            <div className="uploaderModal">
                <div className="innerModal">
                    <div className="closebtn">Close</div>
                    <p>Want to change your profile image?</p>
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        className="custom-file-input"
                    />
                </div>
            </div>
        );
    }
}
