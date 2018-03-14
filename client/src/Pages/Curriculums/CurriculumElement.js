import React, { Component } from 'react';
import fire from './../../fire';
import './../../CSS/Card.css';

class CurriculumElement extends Component {
	constructor(props) {
		super(props);

		this.state = {
			allowEdits: false,
			name: this.props.name,
			description: this.props.description,
			link: this.props.link,
			color: this.props.color
		};

		this.editCurriculum = this.editCurriculum.bind(this);
		this.saveCurriculum = this.saveCurriculum.bind(this);
		this.goToLink = this.goToLink.bind(this);
	}

	editCurriculum() {
		this.setState({allowEdits: true});
	}

	saveCurriculum() {
        // Update curriculum information
        var updates = {};
        updates['/curriculums/' + this.props.id] = {
			id: this.props.id,
			name: this.state.name,
			description: this.state.description,
			link: this.state.link,
			color: this.state.color
		};
        fire.database().ref().update(updates);
		
		this.setState({allowEdits: false});
	}
	
	goToLink() {
		window.location=this.state.link;
	}
	
	render() {
		var divStyle = {
            backgroundColor: this.state.color
		}
	
		return (
			<div className="CurriculumElement card">
				<div
					className="modal fade"
					id={"curriculumModal-" + this.props.id}
					tabIndex="-1"
					role="dialog"
					aria-labelledby="CurriculumModal"
					aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="curriculumModalTitle">Edit Curriculum</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<form>
								<div className="modal-body">
									<fieldset>
										<label htmlFor="name">Name:</label>
										<input
											type="text"
											name="name"
											onChange={event => this.setState({name: event.target.value})}
											value={this.state.name}
											disabled={ this.state.allowEdits ? false : true } />
									</fieldset>
									<fieldset>
										<label htmlFor="description">Description:</label>
										<input
											type="text"
											name="description"
											onChange={event => this.setState({description: event.target.value})}
											value={this.state.description}
											disabled={ this.state.allowEdits ? false : true } />
									</fieldset>
									<fieldset>
										<label htmlFor="link">Link:</label>
										<input
											type="text"
											name="link"
											onChange={event => this.setState({link: event.target.value})}
											value={this.state.link}
											disabled={ this.state.allowEdits ? false : true } />
									</fieldset>
								</div>

								<div className="modal-footer">
									<button
										type="button"
										className="btn btn-secondary"
										onClick={this.goToLink}>
										Go to Link
									</button>
									{(this.state.allowEdits) ?
										<button
											type="button"
											className="btn btn-secondary"
											onClick={this.saveCurriculum}>
											Save
										</button> :
										<button
											type="button"
											className="btn btn-secondary"
											onClick={this.editCurriculum}>
											Edit
										</button>}
									<button
										type="button"
										className="btn btn-primary"
										data-dismiss="modal">
										Cancel
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>

				<div className="card-img" style={divStyle} data-toggle="modal" data-target={"#curriculumModal-" + this.props.id}></div>
				<div className="card-text" data-toggle="modal" data-target={"#curriculumModal-" + this.props.id}>
					{this.props.name}
				</div>
			</div>
		);
	}
}

export default CurriculumElement;
