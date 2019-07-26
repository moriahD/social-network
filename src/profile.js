// import React from "react";
// import axios from "./axios";
// // it shows new component we gonna make bio editor and it prints out
//
// //show profile component in "App.js" and "profile" will render "bio editor" component.
//
// //pass bio editor to profile.js <BioEditor bio={}/> and it should also have 'edit' btn. if user doesn't have bio, say add your bio now. editing mode-showing text field. if there's already bio, show preload text in textfield.bioeditor will need function that makes ajax request. pass new bio to state.
//
// //profilepic.js is gonna show in this profile.js
//
// export default function Profile(props) {
//     return (
//         <div>
//         // {props.profilePic}
//             <Profile
//                 image={props.image}
//                 first={props.first_name}
//                 last={props.last_name}
//                 onClick={props.onClick}
//             />
//             <div>{this.first_name}</div>
//             <BioEditor bio={props.bio} done={props.changeBio} />
//         </div>
//     );
// }
//
//
// // in App.js
// <Profile
//     bio={this.state.bio}
//     changeBio={bio=>{}}
//     image={this.state.image}
//     first={this.state.first_name}
//     last={this.state.last_name}
//     onClick={() =>
//         this.setState({ uploaderIsVisible: true })}
// />
