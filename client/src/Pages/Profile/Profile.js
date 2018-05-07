import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';
import { formatTagsForDB } from './../Common/TagsFunctions';
import MemberGradesTagInput from './../Common/MemberGradesTagInput';
import fire from './../../fire';
import './../../CSS/Form.css';
import './../../CSS/Profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: fire.auth().currentUser,
            first_name: "",
            last_name: "",
            email: "",
            school: "",
            bio: "",
            grade_levels: [],
            title: "",
            pic: "",
            facebook_id: "",
            twitter_id: "",
            disable_edits: true
        }

        this.toggleEditting = this.toggleEditting.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.handlePic = this.handlePic.bind(this);
    }

    componentDidMount() {
        var self = this;

        // Handle changes in authentication state
        fire.auth().onAuthStateChanged(function(user) {
            if (user) {
                self.setState({user: user});    
            } else {
                self.setState({user: undefined});
            }
        });

        // Get information about user and update state variable
		if(this.state.user) {
            var membersRef = fire.database().ref("members/");
            membersRef.child(this.state.user.uid).on("value", function(data) {
                if(data.val()) {
                    var member = data.val();
                    self.setState({
                        first_name: member.first_name,
                        last_name: member.last_name,
                        email: member.email,
                        school: member.school,
                        bio: member.bio,
                        title: member.title,
                        pic: member.pic,
                        facebook_id: member.facebook_id,
                        twitter_id: member.twitter_id,
                    });
                }
            });
        }
    }

    toggleEditting(event) {
        this.setState({disable_edits: !this.state.disable_edits});
    }

    saveChanges(event) {
        // Update profile information
        var updates = {};
        updates['/members/' + this.state.user.uid + '/first_name'] = this.state.first_name;
        updates['/members/' + this.state.user.uid + '/last_name'] = this.state.last_name;
        updates['/members/' + this.state.user.uid + '/email'] = this.state.email;
        updates['/members/' + this.state.user.uid + '/school'] = this.state.school;
        updates['/members/' + this.state.user.uid + '/bio'] = this.state.bio;
        updates['/members/' + this.state.user.uid + '/title'] = this.state.title;
        updates['/members/' + this.state.user.uid + '/pic'] = this.state.pic;
        updates['/members/' + this.state.user.uid + '/facebook_id'] = this.state.facebook_id;
        updates['/members/' + this.state.user.uid + '/twitter_id'] = this.state.twitter_id;
        fire.database().ref().update(updates);

        // Change the profile contact info to be disabled
        this.toggleEditting(event);
    }

    handlePic(event) {
        event.preventDefault();
        var self = this;

        var file = event.target.files[0];
        var ref = fire.storage().ref('profiles').child(file.name);        
        ref.put(file).then(()=>{
            ref.getDownloadURL().then((url) => {
                self.setState({pic: url});
            }).catch((err) => {
                self.setState({ formError: err.code + ": " + err.message });
            });
        }).catch((error) => {
            self.setState({ formError: error.code + ": " + error.message });
        });
    }

	render() {
		var divStyle = {
			backgroundImage: `url(${this.state.pic})`
		}
		
		if(this.state.user) {
            return (
				<div className="Home">
					<div className="container">
                        <div className="content">
                            <h1 className="form-header">Profile</h1>
                            <form method="POST">
                                <div className="form-group">
                                    <div className="profile-img" style={divStyle}></div>
                                </div>
                                <div className="prof-btns">
                                    { this.state.disable_edits ?
                                        <input
                                            type="button"
                                            value="Edit"
                                            className="btn btn-warning"
                                            onClick={this.toggleEditting} /> : null }
                                    { !this.state.disable_edits ?
                                        <input
                                            type="button"
                                            value="Save"
                                            className="btn btn-success"
                                            onClick={this.saveChanges} /> : null }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name:</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        className="form-control"
                                        value={this.state.first_name}
                                        onChange={(event) => this.setState({first_name: event.target.value})}
                                        disabled={this.state.disable_edits} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name:</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        className="form-control"
                                        value={this.state.last_name}
                                        onChange={(event) => this.setState({last_name: event.target.value})}
                                        disabled={this.state.disable_edits} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="text"
                                        name="email"
                                        className="form-control"
                                        value={this.state.email}
                                        onChange={(event) => this.setState({email: event.target.value})}
                                        disabled={this.state.disable_edits} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="school">School:</label>
                                    <input
                                        type="text"
                                        name="school"
                                        className="form-control"
                                        value={this.state.school}
                                        onChange={(event) => this.setState({school: event.target.value})}
                                        disabled={this.state.disable_edits} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="bio">Bio:</label>
                                    <textarea
                                        type="text"
                                        name="bio"
                                        className="form-control"
                                        value={this.state.bio}
                                        onChange={(event) => this.setState({bio: event.target.value})}
                                        disabled={this.state.disable_edits}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="gradeLevel">Grade Levels:</label>
                                    <MemberGradesTagInput
                                        member_id={this.state.user.uid}
                                        readOnly={this.state.disable_edits} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="title">Title:</label>
                                    <input
                                        type="text"
                                        name="title"
                                        className="form-control"
                                        value={this.state.title}
                                        onChange={(event) => this.setState({title: event.target.value})}
                                        disabled={this.state.disable_edits} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pic">Picture:</label>
                                    <input
                                        type="file"
                                        name="pic"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={this.handlePic}
                                        disabled={this.state.disable_edits} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="facebookId">Facebook ID:</label>
                                    <input
                                        type="text"
                                        name="facebookId"
                                        className="form-control"
                                        value={this.state.facebook_id}
                                        onChange={(event) => this.setState({facebook_id: event.target.value})}
                                        disabled={this.state.disable_edits} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="twitterId">Twitter ID:</label>
                                    <input
                                        type="text"
                                        name="twitterId"
                                        className="form-control"
                                        value={this.state.twitter_id}
                                        onChange={(event) => this.setState({twitter_id: event.target.value})}
                                        disabled={this.state.disable_edits} />
                                </div>
                                <div className="form-group">
                                    { this.state.disable_edits ?
                                        <input
                                            type="button"
                                            value="Edit"
                                            className="btn btn-warning"
                                            onClick={this.toggleEditting} /> : null }
                                    { !this.state.disable_edits ?
                                        <input
                                            type="button"
                                            value="Save"
                                            className="btn btn-success"
                                            onClick={this.saveChanges} /> : null }
                                </div>
                            </form>
                        </div>
					</div>
				</div>
			);
        } else {
            return (
                <Redirect to='/login' />
            );
        }
	}
}

export default Profile;
