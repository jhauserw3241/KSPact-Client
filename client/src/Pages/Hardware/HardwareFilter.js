import React, { Component } from 'react';
import FilterPanelGroup from './../Common/FilterPanelGroup';
import HardwareGradesTagInput from './HardwareGradesTagInput';
import { filterByName, filterByGrade } from './../Common/Filter';

class HardwareFilter extends Component {
	render() {
		return (
            <div className="HardwareFilter">
				<FilterPanelGroup
					filterByName={filterByName}
					list={this.props.list}
					handleSuccess={this.props.handleSuccess}>
				</FilterPanelGroup>
            </div>
		);
	}
}

export default HardwareFilter;
