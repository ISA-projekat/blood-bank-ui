import React, {Component} from "react";

export default class BloodBankComponent extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            bloodbanks: [],
            name: '',
            city: ''
        }

        this.onFormNameChange = this.onFormNameChange.bind(this);
        this.onFormCityChange = this.onFormCityChange.bind(this);

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormNameChange(event) {
        this.setState({name: event.target.value});
    }

    onFormCityChange(event) {
        this.setState({city: event.target.value});
    }

    onFormSubmit(event) {
        if(this.state.name === '' && this.state.city === '') {
            fetch("http://localhost:8080/bloodbank/search", {
            method: 'GET'
            })
            .then(res => res.json())
            .then(data => this.setState({bloodbanks: data}));
            event.preventDefault();
            return;
        }
        
        if(this.state.city === '') {
            fetch(`http://localhost:8080/bloodbank/search?name=${this.state.name}`, {
            method: 'GET'
            })
            .then(res => res.json())
            .then(data => this.setState({bloodbanks: data}));
            event.preventDefault();
            return;
        }

        if(this.state.name === '') {
            fetch(`http://localhost:8080/bloodbank/search?city=${this.state.city}`, {
            method: 'GET'
            })
            .then(res => res.json())
            .then(data => this.setState({bloodbanks: data}));
            event.preventDefault();
            return;
        }

        if(!(this.state.name === '') && !(this.state.city === '')) {
            fetch(`http://localhost:8080/bloodbank/search?name=${this.state.name}&city=${this.state.city}`, {
            method: 'GET'
            })
            .then(res => res.json())
            .then(data => this.setState({bloodbanks: data}));
            event.preventDefault();
            return;
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/bloodbank", {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => this.setState({bloodbanks: data}));
    }

    render() {
        return (
            <div>
                <div>
                    <form onSubmit={this.onFormSubmit}>
                        <label>
                            Name:
                            <input type="text" value={this.state.name} onChange={this.onFormNameChange} />
                        </label>

                        <label>
                            City:
                            <input type="text" value={this.state.city} onChange={this.onFormCityChange} />
                        </label>

                        <input type="submit" value="Search" />
                    </form>
                </div>

                <div>
                    <ul>
                        {
                            this.state.bloodbanks.map((bb) =>
                                <li key={bb.id}>Name: {bb.name} Rating: {bb.rating}</li>
                            )
                        }
                    </ul>
                </div>
            </div>
        );
    }
}