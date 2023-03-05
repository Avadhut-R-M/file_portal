import React from "react";
import { connect } from "react-redux";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { get_user_addresses } from "../../actions/user-action";
import { add_user_addresses, } from "../../actions/user-action";
import { update_user } from "../../actions/auth-action";

class Me extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showUserModal: false,
            showAddressModal: false,
            address1: '',
            address2: '',
            zip_code: '',
            city: '',
            username: ''
        }
    }

    handleUserModalClose = () => {
        this.setState({'showUserModal': false, username: ''})
    }

    handleUserModalShow = () => {
        this.setState({'showUserModal': true})
    }

    handleAddressModalClose = () => {
        this.setState({'showAddressModal': false, address1: '', address2: '', zip_code: '', city: ''})
    }

    handleAddressModalShow = () => {
        this.setState({'showAddressModal': true})
    }

    handleUsernameSubmit = () =>{
        this.props.update_user(this.state.username)

    }

    handleAddressSubmit = () => {
        let data = {}
        data['address1'] = this.state.address1
        data['address2'] = this.state.address2
        data['zip_code'] = this.state.zip_code
        data['city'] = this.state.city

        this.props.add_user_addresses(data)
        this.handleAddressModalClose()
    }
    
    componentDidMount(){
        this.props.get_user_addresses()
    }

    render(){
        return(
            <div style={{'marginTop': '1rem', 'marginLeft': '1rem'}}>
                <div>
                    <span>User Profile - </span>
                    <div style={{'marginTop': '1rem', 'marginLeft': '2rem', display: 'flex', flexDirection:'column'}}>
                        <div style={{display: 'flex', columnGap: '1em'}}>
                            <div>Username - {this.props.name}</div>
                            <Button variant="warning" onClick={this.handleUserModalShow}>Chnage Username</Button>
                            <Modal show={this.state.showUserModal} onHide={this.handleUserModalClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Change Username</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={this.onSubmit}>
                                        <Form.Group className="mb-3" controlId="transactionForm.Title">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                autoFocus
                                                onChange={(e) => this.setState({'username': e.target.value})}
                                                value={this.state.title}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleUserModalClose}>
                                    Close
                                </Button>
                                <Button variant="primary" type="submit" disabled={this.props.api?.username_update?.loading ? 'disabled': ''} onClick={this.handleUsernameSubmit}>
                                    Add
                                </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                        <div>email - {this.props.email}</div>
                    </div>
                </div>

                <div>
                    <span>Address - </span>
                    <div style={{'marginTop': '1rem', 'marginLeft': '2rem', display: 'flex', flexDirection:'column', marginRight: '5em'}}>
                        <div style={{display: 'flex', rowGap: '1em', flexDirection: 'column'}}>
                            {this.props.addresses.map((address) => (
                                <div key={address.id} style={{padding: '10px',display:'flex', flexDirection:'column', columnGap:'1em', border:'black solid 1px', marginBottom:'.5em', marginLeft:'1em'}}>
                                    <span> Address Line 1 - {address.address1} </span>
                                    <span> Address Line 2 - {address.address2} </span>
                                    <span> Zip Code - {address.zip_code} </span>
                                    <span> City - {address.city} </span>
                                </div>
                            ))}
                            <Button variant="warning" onClick={this.handleAddressModalShow}>Add Address</Button>
                            <Modal show={this.state.showAddressModal} onHide={this.handleAddressModalClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Add Address</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={this.onSubmit}>
                                        <Form.Group className="mb-3" controlId="transactionForm.Title">
                                            <Form.Label>Address Line 1</Form.Label>
                                            <Form.Control
                                                autoFocus
                                                onChange={(e) => this.setState({'address1': e.target.value})}
                                                value={this.state.address1}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="transactionForm.Title">
                                            <Form.Label>Address Line 2</Form.Label>
                                            <Form.Control
                                                autoFocus
                                                onChange={(e) => this.setState({'address2': e.target.value})}
                                                value={this.state.address2}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="transactionForm.Title">
                                            <Form.Label> Zip Code</Form.Label>
                                            <Form.Control
                                                autoFocus
                                                onChange={(e) => this.setState({'zip_code': e.target.value})}
                                                value={this.state.zip_code}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="transactionForm.Title">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control
                                                autoFocus
                                                onChange={(e) => this.setState({'city': e.target.value})}
                                                value={this.state.city}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleAddressModalClose}>
                                    Close
                                </Button>
                                <Button variant="primary" type="submit" disabled={this.state.address1 && this.state.address2 && this.state.zip_code && this.state.city ? '' : 'disabled'} onClick={this.handleAddressSubmit}>
                                    Add
                                </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        get_user_addresses: () => dispatch(get_user_addresses()),
        add_user_addresses: (data) => dispatch(add_user_addresses(data)),
        update_user: (username) => dispatch(update_user(username))
    }
}

const mapStateToProps = state => {
    return{
        name : state.user.username || 'test',
        email: state.user.email || 'test@email.com',
        addresses: state.user.address || [{'zip_code': 1}],
        api: state.api || {}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Me)