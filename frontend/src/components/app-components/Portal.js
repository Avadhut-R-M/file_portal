import React from "react";
import { connect } from "react-redux";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { get_file_data, get_user_data } from "../../actions/file-action";
// import Home from "./Home";

class Portal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    getRenderComponent = () => {
        switch (1){
            case 'Home':
                return <div/>
            default:
                return <div/>
        }
    }
    

    ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 5
            }}
        />
    );

    componentDidMount(){
        this.props.get_user_data()
        this.props.get_file_data()
    }

    onselect = (e) => {
        this.setState({'selectd_user': e})
        this.props.get_file_data(e)
    }


    render(){
        return(
            <div style={{maring:'1em', padding: '1em'}}>
               <DropdownButton id="dropdown-basic-button" title={this.state.selectd_user || "Select User"} onSelect={this.onselect}>

                    {Object.values(this.props?.portal?.users_data || {}).map((user_data) => (
                        <Dropdown.Item eventKey={user_data?.user} >{`${user_data.user} --> ${user_data.count}`}</Dropdown.Item>
                    ))}
                </DropdownButton>

                <div style={{marginTop: '5em'}}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th className="text-center">File Type</th>
                                <th className="text-center">Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(this.props?.portal?.files_data || {})?.map((file_data) => (
                                <tr>
                                    <td className="text-center">{file_data.document_type}</td>
                                    <td className="text-center">{file_data.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        get_user_data: () => dispatch(get_user_data()),
        get_file_data: (username) => dispatch(get_file_data(username))
    }
}

const mapStateToProps = state => {
    return{
        portal: state.portal
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portal)