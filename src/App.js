import React from 'react';
import moment from "moment";
import API from "./API/api";
import Table from "./components/Employee";
import Nav from "./components/Nav";


const sortingFunction = {
  up: {
    class: "sortup",
    fn: (a, b) => a.name.localeCompare(b.name),
  },
  down: {
    class: "sortdown",
    fn: (a, b) => b.name.localeCompare(a.name),
  },
  default: {
    class: "sort",
    fn: (a) => a,
  },
};

export default class App extends React.Component {
  state = {
    results: [],
    search: "",
    present: "up",
    icon: <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-sort-alpha-up-alt" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M4 14a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-1 0v11a.5.5 0 0 0 .5.5z" />
      <path fillRule="evenodd" d="M6.354 4.854a.5.5 0 0 0 0-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L4 3.207l1.646 1.647a.5.5 0 0 0 .708 0z" />
      <path d="M9.027 7h3.934v-.867h-2.645v-.055l2.567-3.719v-.691H9.098v.867h2.507v.055L9.027 6.309V7zm.637 7l.418-1.371h1.781L12.281 14h1.121l-1.78-5.332h-1.235L8.597 14h1.067zM11 9.687l.652 2.157h-1.351l.652-2.156H11z" />
    </svg>
  };

  componentDidMount() {
    API.searchEmployee()
      .then((res) =>
        res.data.results.map((result) => ({
          name: `${result.name.first} ${result.name.last}`,
          searchName: `${result.name.first}${result.name.last}`,
          id: result.registered.date,
          photo: result.picture.large,
          email: result.email,
          phone: result.phone,
          location: result.location.city,
          dob: moment(result.dob.date).format("MM/DD/YYYY"),
        }))
      )
      .then((newData) => this.setState({ results: newData }))
      .catch((error) => console.log(error));
  }

  onSortChange = () => {
    const { present } = this.state;
    let next;
    let icon;

    if (present === "up") {
      next = "down";
      icon = (
        <svg>
          <path
            fillRule="evenodd"
            d="M4 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11A.5.5 0 0 1 4 2z"
          />
          <path
            fillRule="evenodd"
            d="M6.354 11.146a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L4 12.793l1.646-1.647a.5.5 0 0 1 .708 0z"
          />
          <path d="M9.027 7h3.934v-.867h-2.645v-.055l2.567-3.719v-.691H9.098v.867h2.507v.055L9.027 6.309V7zm.637 7l.418-1.371h1.781L12.281 14h1.121l-1.78-5.332h-1.235L8.597 14h1.067zM11 9.687l.652 2.157h-1.351l.652-2.156H11z" />
        </svg>
      );
    } else if (present === "down") {
      next = "up";
      icon = (
        <svg>
          <path
            fillRule="evenodd"
            d="M4 14a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-1 0v11a.5.5 0 0 0 .5.5z"
          />
          <path
            fillRule="evenodd"
            d="M6.354 4.854a.5.5 0 0 0 0-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L4 3.207l1.646 1.647a.5.5 0 0 0 .708 0z"
          />
          <path d="M9.027 7h3.934v-.867h-2.645v-.055l2.567-3.719v-.691H9.098v.867h2.507v.055L9.027 6.309V7zm.637 7l.418-1.371h1.781L12.281 14h1.121l-1.78-5.332h-1.235L8.597 14h1.067zM11 9.687l.652 2.157h-1.351l.652-2.156H11z" />
        </svg>
      );
    }

    this.setState({
      present: next,
      icon,
    });
  };

  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value.toLowerCase(),
    });
  };

  render() {
    const data = this.state.results;
    const { present } = this.state;

    return (
      data.length > 0 && (
        <div>
          <Nav
            handleInputChange={this.handleInputChange}
            search={this.state.search}
          />
          <div className="container mt-5">
            <div className="row">
              <div className="col">
                <table className="table table-striped table-secondary table-active">
                  <thead className="bg-primary text-center rounded">
                    <tr>
                      <th>
                        <button onClick={this.onSortChange} className="h2 rounded bg-white align-middle">
                          {this.state.icon}
                        </button>
                      </th>
                      <th scope="col"><h3>Employee Name</h3></th>
                      <th scope="col"><h3>Email</h3></th>
                      <th scope="col"><h3>Phone</h3></th>
                      <th scope="col"><h3>Location</h3></th>
                      <th scope="col"><h3>Birthday</h3></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...data].sort(sortingFunction[present].fn).filter((employee) =>
                      employee.name.toLowerCase().includes(this.state.search))
                      .map((employee) => (
                        <Table
                          key={employee.name}
                          photo={employee.photo}
                          name={employee.name}
                          email={employee.email}
                          location={employee.location}
                          phone={employee.phone}
                          dob={employee.dob}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}