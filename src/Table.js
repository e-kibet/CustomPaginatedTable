import React, { Component } from "react";
import axios from "axios";
import PaginationTable from "./_components/PaginationTable";
import 'bootstrap/dist/css/bootstrap.css';

export default class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usersData: [],
      loading: false,
      per_page: 5,
      current_page: 1,
      total_data: "",
      currentPosts: []
    };
  }

  async componentDidMount() {
    await axios
      .get("https://reqres.in/api/users")
      .then(res => {
        this.setState({
          usersData: res.data.data,
          loading: false,
          total_data: res.data.data.length
        }, () => {
          this.formatData();
        });
      })
      .catch(err => console.log(err));
  }

  formatData() {
    const indexOfLastPost = this.state.current_page * this.state.per_page;
    const indexOfFirstPage = indexOfLastPost - this.state.per_page;

    const currentPosts = this.state.usersData.slice(
      indexOfFirstPage,
      indexOfLastPost
    );

    this.setState({ currentPosts });
  }

  handleClick = number => {
    this.setState({
      current_page: number
    }, () => {
      this.formatData();
    });
  };

  render() {
    const { per_page, total_data, current_page, currentPosts } = this.state;

    return (
      <div className="container" style={{marginTop:'50px'}}>
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
            <th>Options</th>
              <th>Id</th>
              <th>First Name</th>
              <th>email</th>
              <th>Last Name</th>
            </tr>
          </thead>
          {currentPosts.map(x => {
            return (
              <React.Fragment key={x.id}>
                <tbody>
                  <tr>
                    <td><a hred="" className="btn btn-primary btn-sm text-white">Edit</a></td>
                    <td>{x.id}</td>
                    <td>{x.first_name}</td>
                    <td>{x.email}</td>
                    <td>{x.last_name}</td>
                  </tr>
                </tbody>
              </React.Fragment>
            );
          })}
        </table>
        <PaginationTable
          per_page={per_page}
          current_page={current_page}
          total_data={total_data}
          handleClick={this.handleClick}
        />
      </div>
    );
  }
}
