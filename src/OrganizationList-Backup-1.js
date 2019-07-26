import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';

class OrganizationList extends Component {

    constructor(props) {
        super(props);
        this.state = { organizations: [] };
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/organizations')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    organizations: responseData._embedded.organizations,
                });
            })
            .catch(err => console.error(err));
    }

    render() {
       /*
        const tableRows = this.state.organizations.map((organization, index) =>
            <tr key={index}>
                <td>{organization.organizationname}</td>
                <td>{organization.organizationdesc}</td>
            </tr>
        );*/
        const columns = [
            {
                Header: 'name',
                accessor: 'organizationname'
            }, {
                Header: 'Description',
                accessor: 'organizationdesc',
            },
            {
                id: 'delbutton',
                sortable: false,
                filterable: false,
                width: 150,
                accessor: '_links.self.href',
                Cell: ({ value }) => (<button onClick={() => { this.onDelClick(value) }}>Delete</button>)
            }
        ]

        return (
            <div className="App">
                <ReactTable data={this.state.organizations} columns={columns}
                    filterable={true} defaultPageSize={5} />
            </div>
        );
    }
}

export default OrganizationList;