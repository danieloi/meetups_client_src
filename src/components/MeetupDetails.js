import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class MeetupDetails extends Component {//you capitalize component names to help react distinguish between them and regular html elements
    constructor(props){
        super(props);

        this.state = {
            details: ''
        }
    }

    componentWillMount() {
        this.getMeetups();
    }

    getMeetups() {
        let meetupId = this.props.match.params.id;
        axios.get(`http://localhost:3000/api/meetups/${meetupId}`)
            .then(response => {
                this.setState({details: response.data}, () =>{
                    console.log(this.state);
                });
            }
        ).catch(err => console.log(err));
    }

    onDelete() {
        let meetupId = this.state.details.id;
        axios.delete(`http://localhost:3000/api/meetups//${meetupId}`)
            .then(respone => {
                this.props.history.push('/');
            }).catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <br />
                <Link className='btn grey' to='/'>Back</Link>
                <h1>{this.state.details.name}</h1>
                <ul className='collection'>
                    <li className='collection-item'>City: {this.state.details.city} </li>
                    <li className='collection-item'>Address: {this.state.details.address} </li>
                </ul>
                <Link className='btn' to={`/meetups/edit/${this.state.details.id}`}>Edit</Link>

                <button onClick={this.onDelete.bind(this)} className='btn red right'>Delete</button>
            </div>
        )
    }
}

export default MeetupDetails