import React, { Component } from "react";

export default class BloodBankComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bloodbanks: [],
      name: "",
      city: "",
      rating: 0.0,
    };

    this.loadAllBloodBanks = this.loadAllBloodBanks.bind(this);
    this.onFormNameChange = this.onFormNameChange.bind(this);
    this.onFormCityChange = this.onFormCityChange.bind(this);
    this.onFormRatingChange = this.onFormRatingChange.bind(this);

    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onFilterSubmit = this.onFilterSubmit.bind(this);
  }

  onFormNameChange(event) {
    this.setState({ name: event.target.value });
  }

  onFormCityChange(event) {
    this.setState({ city: event.target.value });
  }

  onFormRatingChange(event) {
    this.setState({ rating: event.target.value });
  }

  onSearchSubmit(event) {
    if (this.state.name === "" && this.state.city === "") {
      fetch("http://localhost:8080/bloodbank/search", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => this.setState({ bloodbanks: data }));
      event.preventDefault();
      return;
    }

    if (this.state.city === "") {
      fetch(`http://localhost:8080/bloodbank/search?name=${this.state.name}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => this.setState({ bloodbanks: data }));
      event.preventDefault();
      return;
    }

    if (this.state.name === "") {
      fetch(`http://localhost:8080/bloodbank/search?city=${this.state.city}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => this.setState({ bloodbanks: data }));
      event.preventDefault();
      return;
    }

    if (!(this.state.name === "") && !(this.state.city === "")) {
      fetch(
        `http://localhost:8080/bloodbank/search?name=${this.state.name}&city=${this.state.city}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((data) => this.setState({ bloodbanks: data }));
      event.preventDefault();
      return;
    }
  }

  loadAllBloodBanks() {
    fetch("http://localhost:8080/bloodbank", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          bloodbanks: data,
          name: "",
          city: "",
          rating: 0,
        })
      );
  }

  componentDidMount() {
    this.loadAllBloodBanks();
  }

  onFilterSubmit(event) {
    var filteredBloodBanks = [];
    this.state.bloodbanks.forEach((bb) => {
      if (bb.rating >= this.state.rating) {
        filteredBloodBanks.push(bb);
      }
    });

    this.setState({ bloodbanks: filteredBloodBanks });
    event.preventDefault();
  }

  render() {
    return (
      <div className="pages-wrapper">
        <div>
          <div>
            <form onSubmit={this.onSearchSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  value={this.state.name}
                  onChange={this.onFormNameChange}
                />
              </label>

              <label>
                City:
                <input
                  type="text"
                  value={this.state.city}
                  onChange={this.onFormCityChange}
                />
              </label>

              <input type="submit" value="Search" />
            </form>
          </div>

          <div>
            <form onSubmit={this.onFilterSubmit}>
              <label>
                Rating:
                <input
                  type="number"
                  value={this.state.rating}
                  onChange={this.onFormRatingChange}
                />
              </label>

              <input type="submit" value="Filter" />
            </form>
          </div>
          <div>
            <button onClick={this.loadAllBloodBanks}>Reset</button>
          </div>
        </div>

        <div>
          <ul>
            {this.state.bloodbanks.map((bb) => (
              <li key={bb.id}>
                Name: {bb.name}
                <br />
                Rating: {bb.rating} <br />
                Address: {bb.address.street} {bb.address.number},{" "}
                {bb.address.city}, {bb.address.country}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
