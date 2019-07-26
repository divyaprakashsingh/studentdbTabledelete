import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import AddOrganization from './AddOrganization';


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


    addOrg(organization) {
        fetch('http://localhost:8080/api/organizations',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(organization)
            })
            .then(res => this.fetchOrgs())
            .catch(err => console.error(err))
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

    editOrg(organization, link) {
        fetch(link,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(organization)
            })
            .then(res =>
                toast.success("Changes saved", {
                    position: toast.POSITION.BOTTOM_LEFT
                })
            )
            .catch(err =>
                toast.error("Error when saving", {
                    position: toast.POSITION.BOTTOM_LEFT
                })
            )
    }

    tableColumnEditable = (cellInfo) => {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.organizations];
                    data[cellInfo.index][cellInfo.column.id] =
                        e.target.innerHTML;
                    this.setState({ organizations: data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.organizations[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    render() {

        const columns = [
            {
                Header: 'name',
                accessor: 'organizationname',
                Cell: this.tableColumnEditable
            }, {
                Header: 'Description',
                accessor: 'organizationdesc',
                Cell: this.tableColumnEditable
            }, 
            {
                id: 'savebutton',
                sortable: false,
                filterable: false,
                width: 100,
                accessor: '_links.self.href',
                Cell: ({ value, row }) =>
                    (<button onClick={() => { this.editOrg(row, value) }}>
                        Save</button>)
            },
            {
                id: 'delbutton',
                sortable: false,
                filterable: false,
                width: 150,
                accessor: '_links.self.href',
                //Cell: ({ value }) => (<button onClick={() => { this.onDelClick(value) }}>Delete</button>)
                Cell: ({ value }) => (<button onClick={() => { this.confirmDelete(value) }}>Delete</button>)
            }
        ]

        return (
            <div className="App">
                <AddOrganization addOrg={this.addOrg} fetchOrgs={this.fetchOrgs} />

                <ReactTable data={this.state.organizations} columns={columns}
                    filterable={true} defaultPageSize={5} />

                <ToastContainer autoClose={1500} />
            </div>
        );
    }
}

export default OrganizationList;