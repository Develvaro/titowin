import React, { Component } from "react";
import { connect } from "react-redux";

class Profile extends Component {
  componentDidMount() {
    // console.log(this.props.user);
  }
  render() {
    const { profile } = this.props;
    (this.props.user);
    return (
      <div>
        <p />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  null
)(Profile);
