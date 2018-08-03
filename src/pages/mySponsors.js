import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileNav from "../components/profileNav";
import {
    fetchUserSponsors
} from '../actions';

import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import TextInput from "../components/form/textinput";
import {Field} from "redux-form";

class MySponsors extends Component {
  componentDidMount() {

    this.props.fetchUserSponsors(this.props.user.uid);
    //console.log(this.props);
    //this.props.location.pathname
  }
  render() {
    const { profile, userSponsors } = this.props;
    return (
      <div>
        <ProfileNav/>
        {
            userSponsors ?
                userSponsors.map(sponsor => 
                    <p>{sponsor.urlPhoto}</p>
                )
                :
                <p>Cargando tus sponsors.</p>
        }
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  profile: state.profile,
  userSponsors: state.userSponsors,
});

const mapDispatchToProps = dispatch => ({
    fetchUserSponsors: (userID) => dispatch(fetchUserSponsors(userID)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MySponsors);
