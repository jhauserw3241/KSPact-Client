import React, { Component } from 'react';
import FilterPanelGroup from './../Common/FilterPanelGroup';
import GradeFilter from './../Common/GradeFilter';
import { filterByName, filterByGrade } from './../Common/Filter';

class CurriculumFilter extends Component {
	render() {
		return (
            <div className="CurriculumFilter">
				<FilterPanelGroup
					filterByName={filterByName}
					list={this.props.list}
					handleSuccess={this.props.handleSuccess}>
					<GradeFilter />
				</FilterPanelGroup>
            </div>
		);
	}
}

export default CurriculumFilter;
