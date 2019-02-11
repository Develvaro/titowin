import React, {Component} from 'react';
import { fetchProfile, 
        fetchValidationCompanyDetail,
        postValidateCompany,
} from '../actions';
import { connect } from "react-redux";
class ValidateCompanyDetail extends Component {
    componentDidMount() {
        if(this.props.user){
            this.props.fetchProfile(this.props.user);
        }
        this.props.fetchValidationCompanyDetail(this.props.match.params.id);
    }
    render(){
        if(this.props.validationCompanyDetail){
            console.log(this.props.validationCompanyDetail);
        }
        return(
            <div></div>
        )};
}

const mapStateToProps = state => ({
    profile: state.profile,
    user: state.user,
    validationCompanyDetail: state.validationCompanyDetail,
  });
  
  const mapDispatchToProps = dispatch => ({
      fetchValidationCompanyDetail: (id) => dispatch(fetchValidationCompanyDetail(id)),
      fetchProfile: (user) => dispatch(fetchProfile(user)),
      postValidateCompany: (id) => dispatch(postValidateCompany(id)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(ValidateCompanyDetail);