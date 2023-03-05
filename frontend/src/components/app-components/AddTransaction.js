import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { connect } from "react-redux";
import { add_transaction } from "../../actions/transaction-action";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class AddTransaction extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            title: '',
            amount: 0,
            // date: new Date(),
            category: -1,
            source: -1,
            type: '',
            errors: {}
        }
    }

    handleClose = () => {
        this.setState({'show': false})
    }

    handleShow = () => {
        this.setState({'show': true})
    }

    handleSubmit = () => {
        let error = {}
        if(this.state.title == ''){
            error['title'] = 'Title should be there'
        }
        if(this.state.amount <= 0){
            error['amount'] = 'Amount should be more than 0'
        }
        if(this.state.type == ''){
            error['type'] = 'Type should be selected'
        }
        if(this.state.category == -1){
            error['category'] = 'category should be selected'
        }
        if(this.state.source == -1){
            error['source'] = 'source should be selected'
        }
        console.log(error)

        this.setState({errors: {...this.state.errors, ...error}})

        let data = this.state
        delete data.errors
        this.props.add_transaction(data)
    }

    handleInput = (type, value) => {
        let error = this.state.errors
        console.log({[type]:''}, {type:'', error: {...error, [type]: ''}})
        this.setState({
            [type]: value,
            errors: {...error, [type]: ''}
        })
    }

    render(){
        return(
            <>
                <Button variant="primary" onClick={this.handleShow}>
                    Add Transaction
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add Transaction</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group className="mb-3" controlId="transactionForm.Title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    autoFocus
                                    onChange={(e) => this.handleInput('title', e.target.value)}
                                    value={this.state.title}
                                />
                                <p className="text-danger">{this?.state?.errors?.title}</p>
                            </Form.Group>

                            <Form.Group
                            className="mb-3"
                            controlId="transactionForm.Type"
                            >
                                <Form.Label>Type</Form.Label>
                                <Form.Select 
                                aria-label="Default select example" 
                                onChange={(e) => this.handleInput('type', e.target.value)}
                                value={this.state.type}
                                >
                                    <option value=''>Open this select menu</option>
                                    <option value="Credit">Credit</option>
                                    <option value="Debit">Debit</option>
                                    <option value="Transfer">Transfer</option>
                                </Form.Select>
                                <p className="text-danger">{this?.state?.errors?.type}</p>
                            </Form.Group>

                            <Form.Group
                            className="mb-3"
                            controlId="transactionForm.Amount"
                            >
                                <Form.Label>Amount</Form.Label>
                                <Form.Control
                                    type="number"
                                    onChange={(e) => this.handleInput('amount', e.target.value)}
                                    value={this.state.amount}
                                />
                                <p className="text-danger">{this?.state?.errors?.amount}</p>
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group
                                className="mb-3"
                                controlId="transactionForm.Category"
                                as={Col}
                                >
                                    <Form.Label>Category</Form.Label>
                                    <Form.Select 
                                    aria-label="Default select example" 
                                    onChange={(e) => this.handleInput('category', e.target.value)}
                                    value={this.state.type}
                                    >
                                        <option value={-1}>Open this select menu</option>
                                        {this.props.category.map((cat) => {
                                            <option value={cat.id}>cat.title</option>
                                        })}
                                    </Form.Select>
                                    <p className="text-danger">{this?.state?.errors?.category}</p>
                                </Form.Group>

                                <Form.Group
                                className="mb-3"
                                controlId="transactionForm.Source"
                                as={Col}
                                >
                                    <Form.Label>Source</Form.Label>
                                    <Form.Select 
                                    aria-label="Default select example" 
                                    onChange={(e) => this.handleInput('source', e.target.value)}
                                    value={this.state.type}
                                    >
                                        <option value={-1}>Open this select menu</option>
                                        {this.props.category.map((cat) => {
                                            <option value={cat.id}>cat.title</option>
                                        })}
                                    </Form.Select>
                                    <p className="text-danger">{this?.state?.errors?.source}</p>
                                </Form.Group>
                            </Row>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        Add
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        add_transaction: (data) => dispatch(add_transaction(data))
    }
}

const mapStateToProps = state => {
    return{
        user_name: state?.user?.name || 'test',
        category: state?.widget?.transaction?.category || [],
        source: state?.widget?.source?.category || [],
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction)