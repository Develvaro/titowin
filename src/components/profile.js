import React, {Component} from 'react';
import {connect} from 'react-redux'

class Profile extends Component {

    render(){
        const { profile } = this.props;
        console.log(profile);
        return(
            <div>
                <p></p>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    user: state.user,
    profile: state.profile,
});

export default connect(mapStateToProps, null) (Profile);