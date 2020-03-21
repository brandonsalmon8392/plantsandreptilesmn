import React, {Component} from "react";
import { connect } from 'react-redux';
import * as actions from './authenticate';
class Auth extends Component {
    state = {
        controls: {
            username: null,
            password: null
        }
    };

    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(this.state.controls.username, this.state.controls.password);
    }

    render () {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <input type="text" required="true" placeholder="Username"/>
                    <input type="password" required="true"/>
                    <button type="submit">Log In</button>
                </form>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.auth(username, password))
}
}
export default connect(null, mapDispatchToProps)(Auth);