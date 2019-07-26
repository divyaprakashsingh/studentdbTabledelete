import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class AddOrganization extends Component {

    constructor(props) {
        super(props);
        this.state = { organizationname: '', organizationdesc: '' };
    }

    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }


    handleSubmit = (event) => {
        event.preventDefault();
        var newOrganization = {
            organizationname: this.state.organizationname,
            organizationdesc: this.state.organizationdesc
        };
        this.props.addOrg(newOrganization)
        this.refs.addDialog.hide();
    }

    cancelSubmit = (event) => {
        event.preventDefault();
        this.refs.addDialog.hide();
    }

    render() {

        return (
            <div className="App">
                <SkyLight hideOnOverlayClicked ref="addDialog">
                    <h3>New Organization</h3>
                    <form>
                        <TextField label="Organization Name" placeholder="Organization name" name="organizationname"
                            onChange={this.handleChange} /><br />
                        <TextField label="Organization Description" placeholder="Organization description" name="organizationdesc"
                            onChange={this.handleChange} /><br /><br />
                        <Button variant="outlined" color="primary" onClick={this.handleSubmit}>Save</Button> &nbsp;&nbsp;&nbsp;
                        <Button variant="outlined" color="secondary" onClick={this.cancelSubmit}>Cancel</Button>
                    </form>
                </SkyLight>

                <div>
                    <Button variant="raised" color="primary" style={{ 'margin': '10px' }}
                        onClick={() => this.refs.addDialog.show()}>New Organization</Button>
                </div>

            </div>
        );
    }
}

export default AddOrganization;