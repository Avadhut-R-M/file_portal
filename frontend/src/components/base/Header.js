import React from "react";
import { connect } from "react-redux";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import { logout } from "../../actions/auth-action";

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            search:'',
        }
    }
    render(){
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand ><Link to="/">Home</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link ><Link to="/upload">Upload</Link></Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={() => this.props.logout()}>Logout</Nav.Link>
                        {this.props.user_name && this.props.is_loggedin && <Nav.Link>
                        <Link to="/me">{`Hi, ${this.props.user_name}`}</Link>
                        </Nav.Link>}
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
}

const mapStateToProps = state => {
    return{
        user_name: state?.user?.username,
        is_loggedin: state.auth.is_loggedin
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
// export default Header;