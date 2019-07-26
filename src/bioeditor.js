// import React from "react";
// import axios from "./axios";
//
// export default class BioEditor extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }
//     submit(e) {
//         axios
//             .post("/bio", {
//                 bio: this.state.draftBio //setting current props of drafeBio
//             })
//             .then(({ data }) => {
//                 this.setState({
//                     editing: false
//                 });
//                 this.props.done(data);
//             });
//     }
//     render() {
//         return (
//             <div>
//                 {this.state.editing && (
//                     <div>
//                         <textarea name="draftBio" />
//                         <button>save</button>
//                     </div>
//                 )}
//                 {this.props.bio} //this.props is from parents component which is
//                 App.js-this cannot be changed from child component directly
//                 <button onClick={e => this.setState({ editing: true })}>
//                     add
//                 </button>
//             </div>
//         );
//     }
// }
