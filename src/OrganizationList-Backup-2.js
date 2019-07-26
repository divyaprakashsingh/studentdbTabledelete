import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'


class OrganizationList extends Component {

    constructor(props) {
        super(props);
        this.state = { organizations: [] };
    }

    componentDidMount() {
        this.fetchOrgs();
    }

    fetchOrgs = () => {
        fetch('http://localhost:8080/api/organizations')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    organizations: responseData._embedded.organizations,
                });
            })
            .catch(err => console.error(err));
    }



    onDelClick = (link) => {
        fetch(link, { method: 'DELETE' })
            .then(res => {
                toast.success("Organization deleted", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                this.fetchOrgs();
            })
            .catch(err => {
                toast.error("Error when deleting", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                console.error(err)
            })
    }

    confirmDelete = (link) => {
        confirmAlert({
            message: 'Are you sure to delete?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.onDelClick(link)
                },
                {
                    label: 'No',
                }
            ]
        })
    }


    render() {

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
                //Cell: ({ value }) => (<button onClick={() => { this.onDelClick(value) }}>Delete</button>)
                Cell: ({ value }) => (<button onClick= {()=>{this.confirmDelete(value)}}>Delete</button>)
            }
        ]

        return (
            <div className="App">
                <ReactTable data={this.state.organizations} columns={columns}
                    filterable={true} defaultPageSize={5} />

                <ToastContainer autoClose={1500} />
            </div>
        );
    }
}

export default OrganizationList;