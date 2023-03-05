import React from "react";
import { connect } from "react-redux";
import AddTransaction from "./AddTransaction";
import { add_transaction_widget } from "../../actions/transaction-action";

class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    
    componentDidMount(){
        this.props.add_transaction_widget(
            {'transaction_categorie': 'all'}
        )
    }

    render(){
        return(
            <div className='rowC'>
                <AddTransaction/>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        add_transaction_widget: (data) => dispatch(add_transaction_widget(data))
    }
}

const mapStateToProps = state => {
    return{
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)