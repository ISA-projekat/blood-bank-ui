import React, {Component} from "react";

export default class BloodBankComponent extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            bloodbanks: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/bloodbank", {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => this.setState({bloodbanks: data}))
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.bloodbanks.map((bb) =>
                        <li key={bb.id}>Name: {bb.name} Rating: {bb.rating}</li>
                    )}
                </ul>
            </div>
        );
    }
}