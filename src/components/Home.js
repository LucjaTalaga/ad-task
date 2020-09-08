import React, {Component} from "react";
import { InputGroup, FormControl, Button, ListGroup } from 'react-bootstrap';
import getDataFromAPI, {postDataToAPI} from "./api/GetDataFromAPI";

class Home extends Component {
    state = {
        toAdd: '',
        tasks: []
    }

    getTasks = () => {
        getDataFromAPI('/get').then(resp => {
            this.setState({ tasks: resp.tasks});
            }).catch(error => {
                alert(error);
            });
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    addButtonHandler = () => {
        const data = {add: this.state.toAdd}
        postDataToAPI('/add', data).then((resp) => {
            this.setState({toAdd: ''});
            this.getTasks();
        }).catch(error => {
            alert(error);
        });
    }

    deleteButtonHandler = (task) => {
        fetch( '/get', { 
            method : 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({task: task})
            }).then(resp => {
                if (resp.ok){
                    this.getTasks();        
                }   
                else {
                    resp.text().then(resp =>  {alert(resp)});
                }
            });
    }


    componentDidUpdate(prevProps){
        const {isLogged} = this.props;
        if (isLogged && (isLogged !== prevProps.isLogged )){
            this.getTasks();
        }
    }
    render() {
        const {tasks} = this.state;
        const notLogged =
            <h1 className='header'>Welcome to CRUD app. Log In to see the content</h1>;

        const logged =
            <section className="container">
                <header>
                    <h1>TODO list</h1>
                    <InputGroup className="mb-3" type="text" >
                        <FormControl value={this.state.toAdd} name="toAdd"  onChange={this.handleChange}
                            placeholder="Add new thing to the list"
                            aria-label="Add new thing to the list"
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary" onClick={this.addButtonHandler}>Add</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </header>
                <ListGroup>
                    {tasks.map(task => <ListGroup.Item>{task}<Button className='destroy' variant="outline-secondary" onClick={() => this.deleteButtonHandler(task)}></Button></ListGroup.Item>)}
                </ListGroup>
            </section>
        return (
         <>
            {this.props.isLogged ? logged : notLogged}
        </>
        )
    }
}
export default Home;