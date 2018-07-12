import React, {Component} from 'react';
import CardList from './cardList';
import {connect} from 'react-redux';
import { fetchEvents } from '../actions';

class Home  extends Component{
    componentDidMount() {
        this.props.fetchEvents("españa","cordoba");
      }

      render(){
          if(!this.props.events) {
              return <p>Cargando</p>
          }
          return(
            <div>
                <CardList events={this.props.events}/>
            </div>
        )
      }
}

const mapStateToProps = (state) => ({
    events : state.events
  });
  
  const mapDispatchToProps = (dispatch) => ({
    fetchEvents: (pais, ciudad) => dispatch(fetchEvents(pais, ciudad))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home);