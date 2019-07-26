import React, { Component } from 'react';
import SkyLight from 'react-skylight';

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

    render() {

        return (
            <div className="App">
                <SkyLight hideOnOverlayClicked ref="addDialog">
                    <h3>New car</h3>
                    <form>
                        <input type="text" placeholder="Organization name" name="organizationname"
                            onChange={this.handleChange} /><br />
                        <input type="text" placeholder="Organization description" name="organizationdesc"
                            onChange={this.handleChange} /><br />
                        <button onClick={this.handleSubmit}>Save</button>
                        <button onClick={this.cancelSubmit}>Cancel</button>
                    </form>
                </SkyLight>

                <div>
                    <button style={{ 'margin': '10px' }}
                        onClick={() => this.refs.addDialog.show()}>New Organization</button>
                </div>

            </div>
        );
    }
}

export default AddOrganization;