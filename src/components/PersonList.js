import React, {Component} from "react";
import axios from "axios";
import "./PersonList.css";


export default class PersonList extends Component{
    state = {
        persons: []
    };

    componentDidMount() {
        axios.get("https://randomuser.me/api/?results=10")
            .then(res => {
                console.log(res.data);
                const persons = res.data.results;
                // Step 3: Update the state with the fetched data
                this.setState({ persons });
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }

    render() {
        return (
            <div>
                <h2 className="header">User List</h2>
                {this.state.persons.map((person, index) => (
                    <div key={index} className="person-card">
                        <h3>{`${person.name.title} ${person.name.first} ${person.name.last} - ${person.login.uuid}`}</h3>
                        <div className="person-details">
                            <img src={person.picture.large} alt={`${person.name.first}`} className="profile-pic" />
                            <div className="details">
                                <p><strong>User Name:</strong> {person.login.username}</p>
                                <p><strong>Gender:</strong> {person.gender.toUpperCase()}</p>
                                <p><strong>Time Zone Description:</strong> {person.location.timezone.description}</p>
                                <p><strong>Address:</strong> {`${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state}, ${person.location.country} - ${person.location.postcode}`}</p>
                                <p><strong>Email:</strong> {person.email}</p>
                                <p><strong>Birth Date and Age:</strong> {`${person.dob.date} (${person.dob.age})`}</p>
                                <p><strong>Register Date:</strong> {person.registered.date}</p>
                                <p><strong>Phone:</strong> {person.phone}</p>
                                <p><strong>Cell:</strong> {person.cell}</p>
                                <button className="details-button">Details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}