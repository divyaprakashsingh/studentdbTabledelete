import React, { Component } from "react";
import "react-table/react-table.css";
import ReactTable from "react-table";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AddOrganization from "./AddOrganization";
import {CSVLink} from 'react-csv';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SnaclBar from '@material-ui/core/Snackbar';
import Snackbar from "@material-ui/core/Snackbar";
import {SERVER_URL} from '../constant'

class Organization extends Component {

  constructor(props) {
      super(props);
      this.state = { organizations: [] , open:false, message:'' };
  }

  componentDidMount() {
      this.fetchOrgs();
  }

  fetchOrgs = () => {
      fetch(SERVER_URL+'/api/organizations')
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
              this.setState({open:true, message:'Organization Deleted'})
              ;
              this.fetchOrgs();
          })
          .catch(err => {
              this.setState({open:true,message:'Error when deleteing'})
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
              this.setState({open:true,message:'Changed saved'}))
          .catch(err =>
              this.setState({open:true,message:'Error when saving'})
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
  handleClose=(event,reason)=>{

    this.setState({open:false});
  };

  render() {

      const columns = [
          {
              Header: 'Name',
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
                  (<Button size='small' variant='flat' color='primary'onClick={() => { this.editOrg(row, value) }}>
                      Save</Button>)
          },
          {
              id: 'delbutton',
              sortable: false,
              filterable: false,
              width: 150,
              accessor: '_links.self.href',
              //Cell: ({ value }) => (<button onClick={() => { this.onDelClick(value) }}>Delete</button>)
              Cell: ({ value }) => (<Button size='small' variant='flat' color='primary' onClick={() => { this.confirmDelete(value) }}>Delete</Button>)
          }
      ]

      return (
          <div className="App">
            <Grid container>
                <Grid item>
              <AddOrganization addOrg={this.addOrg} fetchOrgs={this.fetchOrgs} />
              </Grid> 
              <Grid item style={{ padding:20}}>
              
              
               <CSVLink data ={this.state.organizations} separator=";">Export CSV</CSVLink>
               </Grid>
               </Grid>
              <ReactTable data={this.state.organizations} columns={columns}
                  filterable={true} defaultPageSize={5} />

       {   /*    <ToastContainer autoClose={1500} />*/}

       <Snackbar style={{width: 300, color:'green'}}
       open={this.state.open}onClose={this.handleClose}
       autoHideDuration={1500}message={this.state.message}/>
          </div>
      );
  }
}
export default Organization;
