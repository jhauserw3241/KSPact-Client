import { Component } from 'react';
import fire from './../../fire';

class LoginRequired extends Component {
    constructor(props) {
		super(props);
		this.state = {
            user: fire.auth().currentUser,
            priv: "none",
            privNum: 0,
            minRole: "member",
            maxRole: "owner",
        };
        
        this.getPrivNum = this.getPrivNum.bind(this);
        this.getUserPrivLevel = this.getUserPrivLevel.bind(this);
        this.checkPrivs = this.checkPrivs.bind(this);
    }

    getPrivNum(priv) {
        switch(priv) {
            case "owner":
                return 4;
            case "admin":
                return 3;
            case "member":
                return 2;
            case "pending member":
                return 1;
            case "none":
                return 0;
            default:
                return 0;
        }
    }

    getUserPrivLevel() {
        var self = this;

        if(self.state.user) {
            // Get the user's permission level
            var memberPrivRef = fire.database().ref("member_priv");
            memberPrivRef.on("value", function(data) {
                if( (data.val() !== undefined) &&
                    (data.val() !== null)) {
                    var priv = data.val()[self.state.user.uid];
                    self.setState({
                        priv: priv ? priv : "none",
                        privNum: priv ? self.getPrivNum(priv) : 0,
                    });
                } else {
                    self.setState({
                        priv: "none",
                        privNum: 0,
                    });
                }
            });
        } else {
            self.setState({
                priv: "none",
                privNum: 0,
            });
        }
    }

    checkPrivs() {
        var minRoleNum = this.getPrivNum(this.state.minRole);
        var maxRoleNum = this.getPrivNum(this.state.maxRole);

        return (minRoleNum <= this.state.privNum) &&
            (this.state.privNum <= maxRoleNum);
    }

    componentDidMount() {
        // Setup handler for change in authentication state
        var self = this;
        fire.auth().onAuthStateChanged(function(user) {
            self.setState({user: user ? user : undefined});
            self.getUserPrivLevel();
        });

        // Check if min role is specified
        if( (this.props !== undefined) &&
            (this.props.minRole !== undefined) &&
            (this.props.minRole !== null) &&
            (this.props.minRole !== "")) {
            this.setState({minRole: this.props.minRole});
        }

        // Check if max role is specified
        if( (this.props !== undefined) &&
            (this.props.maxRole !== undefined) &&
            (this.props.maxRole !== null) &&
            (this.props.maxRole !== "")) {
            this.setState({maxRole: this.props.maxRole});
        }

        // Get current permission level
        this.getUserPrivLevel();
    }

	render() {
        return this.checkPrivs() ? this.props.children : null;
	}
}

export default LoginRequired;