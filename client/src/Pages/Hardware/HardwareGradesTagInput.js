import React, {Component} from 'react';
import fire from './../../fire';
import TagInput from './../Common/TagInput';

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

class HardwareGradesTagInput extends Component {
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

    componentDidMount() {
        var self = this;

        if(this.props.hardware_id) {
            // Get tags
            fire.database().ref("hardware").child(this.props.hardware_id).child("grade_levels").on("value", function(data) {
                var gradeLevels = data.val() ? Object.values(data.val()) : [];

                var updatedGradeLevels = gradeLevels.map((grade) => {
                    return {
                        id: grade,
                        text: grade,
                    };
                });

                self.setState({ tags: updatedGradeLevels });
            });
        }
    }

    handleDelete(i) {
        var tags = this.state.tags.filter((tag, index) => index !== i);
        var updatedTags = tags.map((tag) => {
            return tag.text;
        });
        fire.database().ref("hardware").child(this.props.hardware_id).child("grade_levels")
        .set(updatedTags);
    }

    handleAddition(tag) {
        var tags = [...this.state.tags, ...[tag]];
        var updatedTags = [];
        for(var tag_id in tags) {
            var tag = tags[tag_id];
            updatedTags[tag.text] = tag.text;
        }
        fire.database().ref("hardware").child(this.props.hardware_id).child("grade_levels")
        .set(updatedTags);
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        var updatedTags = newTags.map((tag) => {
            return tag.text;
        });

        fire.database().ref("hardware").child(this.props.hardware_id).child("grade_levels")
        .set(updatedTags);
    }

    render() {
        return (
            <div>
                <TagInput
                    tags={this.props.tags ? this.props.tags : this.state.tags}
                    suggestions={this.state.suggestions}
                    handleDelete={this.props.handleDelete ? this.props.handleDelete : this.handleDelete}
                    handleAddition={this.props.handleAddition ? this.props.handleAddition : this.handleAddition}
                    handleDrag={this.props.handleDrag ? this.props.handleDrag: this.handleDrag}
                    readOnly={this.props.readOnly} />
            </div>
        )
    }
};

export default HardwareGradesTagInput;