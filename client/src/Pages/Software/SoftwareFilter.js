import React, { Component } from 'react';
import FilterPanelGroup from './../Common/FilterPanelGroup';
import SoftwareGradesTagInput from './SoftwareGradesTagInput';
import { filterByName, filterByGrade } from './../Common/Filter';

class SoftwareFilter extends Component {
	render() {
		return (
            <div className="SoftwareFilter">
				<FilterPanelGroup
					filterByName={filterByName}
					list={this.props.list}
					handleSuccess={this.props.handleSuccess}>
				</FilterPanelGroup>
            </div>
		);
	}
}

export default SoftwareFilter;
