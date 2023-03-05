import React from "react";
import { connect } from "react-redux";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { get_file_data, get_user_data,  add_file} from "../../actions/file-action";
import { get_user_files } from "../../actions/user-action";
// import Home from "./Home";

    class Upload extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
        this.props.get_user_files()
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

    onclick = (e) => {
        e.preventDefault()
        let formData = new FormData();
        // datas['file'] = this.state.file
        formData.append('document', this.state.file)
        this.props.add_file(formData)
        this.setState({file: ''})
    }


    render(){
        return(
            <div style={{maring:'1em', padding: '1em'}}>
                <Form>
                    <Row>
                    <Col xs={7}>
                        <Form.Label>Upload File</Form.Label>
                        <Form.Control type="file" onChange={(e) => this.state.file = e.target.files[0]} value={this.state.file}/></Col>
                        <Col xs={7} className="my-1">
                        <Button onClick={this.onclick} type="submit">Submit</Button>
                        </Col>
                    </Row>
                </Form>
                <this.ColoredLine color="red" />
                <div style={{maring:'1em', padding: '1em'}}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th className="text-center">File Name</th>
                            <th className="text-center">Uploaded at</th>
                            <th className="text-center">File type</th>
                            <th className="text-center">Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.files.map((file) => (
                                <tr>
                                    <td className="text-center">{file.description}</td>
                                    <td className="text-center">{file.uploaded_at}</td>
                                    <td className="text-center">{file.document_type}</td>
                                    <td className="text-center">
                                        <Button variant="secondary">
                                            <a style={{textDecoration:'none', color:'white'}} target={'_blank'} href={`http://127.0.0.1:8000/api/file/${file.id}`}>Download</a>
                                        </Button>
                                    </td>
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
        get_user_files: () => dispatch(get_user_files()),
        get_file_data: (username) => dispatch(get_file_data(username)),
        add_file: (username) => dispatch(add_file(username)),


    }
}

const mapStateToProps = state => {
    return{
        files : state?.user?.files || []
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload)