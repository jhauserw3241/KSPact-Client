import { Component } from 'react';
import fire from './../../fire';

class LoginRequired extends Component {
    constructor(props) {
		super(props);
		this.state = {
            user: fire.auth().currentUser,
            priv: "none",
            requiredRole: "member"
        };
        
        this.checkPrivs = this.checkPrivs.bind(this);
        this.getPrivLevel = this.getPrivLevel.bind(this);
    }

    checkPrivs() {
        switch(this.state.requiredRole) {
            // Check if the user is logged in as an amdin
            case "owner":
                return this.state.user &&
                    this.state.priv === "owner";
            // Check if the user is logged in as an admin
            case "admin":
                return this.state.user &&
                    (this.state.priv === "owner" ||
                    this.state.priv === "admin");
            // Check if the user is logged in as a member
            case "member":
                return this.state.user &&
                    (this.state.priv === "owner" ||
                    this.state.priv === "admin" ||
                    this.state.priv === "member");
            // Check if the user is logged in as a pending member
            case "pending member":
                return this.state.user &&
                    (this.state.priv === "owner" ||
                    this.state.priv === "admin" ||
                    this.state.priv === "member" ||
                    this.state.priv === "pending member");
            // Check if the user isn't logged in
            case "none":
                return !this.state.user &&
                    this.state.priv === "none";
            // Default to not showing information
            default:
                return false;
        }
    }

    getPrivLevel() {
        var self = this;

        if(self.state.user) {
            // Get the user's permission level
            var memberPrivRef = fire.database().ref("member_priv");
            memberPrivRef.on("value", function(data) {
                if( (data.val() !== undefined) &&
                    (data.val() !== null)) {
                    var priv = data.val()[self.state.user.uid];
                    self.setState({priv: priv ? priv : "none"});
                } else {
                    self.setState({priv: "none"});
                }
            });
        } else {
            self.setState({priv: "none"});
        }
    }

    componentDidMount() {
        // Setup handler for change in authentication state
        var self = this;
        fire.auth().onAuthStateChanged(function(user) {
            if (user) {
                self.setState({user: user});
                self.getPrivLevel();
            } else {
                self.setState({user: undefined});
                self.getPrivLevel();
            }
        });

        // Check if required role is specified
        if( (this.props !== undefined) &&
            (this.props.requiredRole !== undefined) &&
            (this.props.requiredRole !== null) &&
            (this.props.requiredRole !== "")) {
            this.setState({requiredRole: this.props.requiredRole});
        }

        // Get current permission level
        this.getPrivLevel();
    }

	render() {
        return this.checkPrivs() ? this.props.children : null;
	}
}

export default LoginRequired;