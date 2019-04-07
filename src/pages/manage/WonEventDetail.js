import React, {Component} from 'react';


class WonEventDetail extends Component{

    render(){
        const ticket = this.props.match.params.id;
        console.log("HOLAs")

        return(
            <div>{ticket}</div>
        )
    }
    
}

export default WonEventDetail;