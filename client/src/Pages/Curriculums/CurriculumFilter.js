import React, { Component } from 'react';
import FilterPanelGroup from './../Common/FilterPanelGroup';
import GradeFilter from './../Common/GradeFilter';

class CurriculumFilter extends Component {
	render() {
		return (
            <div className="CurriculumFilter">
				<FilterPanelGroup
					updateFilterText={this.props.updateFilterText}>

					<GradeFilter
						updateFilterGrades={this.props.updateFilterGrades}
						getFilterGradeChecked={this.props.getFilterGradeChecked} />
				</FilterPanelGroup>
            </div>
		);
	}
}

export default CurriculumFilter;
