import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPRInfo, download } from "../actions/actions";

class PRInformation extends Component {
    constructor() {
        super();
        this.export = this.export.bind(this)
    }

    componentDidMount() {
        this.props.getPRInfo();
    }

    export(e) {
        e.preventDefault();
        this.props.download({ fields: ["number", "created_at", "html_url", "web"], data: this.props.list });
    }

    render() {

        return (
            <div className="container" style={{ marginTop: "50px" }}>
                <button type="button" className="btn btn-info" style={{ marginBottom: "50px", float: "right" }} onClick={this.export}>Export</button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>PR number</th>
                            <th>Created</th>
                            <th>Merged</th>
                            <th>Closed</th>
                            <th>URL</th>
                            <th>State</th>
                            <th>Project</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.list.map((pr, i) => {
                            return (
                                <tr key={i}>
                                    <td>{pr.number}</td>
                                    <td>{pr.created_at}</td>
                                    <td>{pr.merged_at}</td>
                                    <td>{pr.closed_at}</td>
                                    <td>{pr.html_url}</td>
                                    <td>{pr.state}</td>
                                    <td>{pr.project}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        );
    }
}

PRInformation.propTypes = {
    getPRInfo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    list: state.prInfo.list,
});

export default connect(
    mapStateToProps,
    {
        getPRInfo,
        download,
    }
)(PRInformation);