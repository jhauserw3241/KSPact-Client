import React, { Component } from 'react';
import PanelGroup from './PanelGroup';
import './../../CSS/FilterPanelGroup.css';

class FilterPanelGroup extends Component {
	render() {
		return (
            <div className="FilterPanelGroup">
				<PanelGroup
					buttonText="Filter">
					<input
						className="form-control"
						placeholder="Search"
						id="search"
						onChange={(event) =>
							this.props.updateFilterText(event.target.value)} />

					{this.props.children}
				</PanelGroup>
            </div>
		);
	}
}

export default FilterPanelGroup;
