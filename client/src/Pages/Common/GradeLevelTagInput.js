import React, {Component} from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import "./../../CSS/Tag.css";

const grade_levels = [
    { id: 'Kindergarden', text: 'Kindergarden' },
    { id: '1st', text: '1st' },
    { id: '2nd', text: '2nd' },
    { id: '3rd', text: '3rd' },
    { id: '4th', text: '4th' },
    { id: '5th', text: '5th' },
    { id: '6th', text: '6th' },
    { id: '7th', text: '7th' },
    { id: '8th', text: '8th' },
    { id: '9th', text: '9th' },
    { id: '10th', text: '10th' },
    { id: '11th', text: '11th' },
    { id: '12th', text: '12th' },
];

class GradeLevelTagInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: this.props.tags,
            suggestions: grade_levels
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {
        const { tags } = this.state;
        this.setState({tags: [...tags, ...[tag]] });
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
    }

    render() {
        const { tags, suggestions } = this.state;
        return (
            <div>
                <ReactTags tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    readOnly={this.props.readOnly} />
            </div>
        )
    }
};

export default GradeLevelTagInput;