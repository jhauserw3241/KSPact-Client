import React, {Component} from 'react';
import { grade_levels } from './../Common/GradeLevels';
import TagInput from './../Common/TagInput';
import fire from './../../fire';    

class CurriculumGradesTagInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: this.props.tags,
            suggestions: grade_levels,
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    componentDidMount() {
        var self = this;

        // Get tags if they are available
        if(this.props.curriculum_id) {
            // Get tags
            fire.database().ref("curriculums").child(this.props.curriculum_id).child("grade_levels").on("value", function(data) {
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
        fire.database().ref("curriculums").child(this.props.curriculum_id).child("grade_levels")
        .set(updatedTags);
    }

    handleAddition(tag) {
        var tags = [...this.state.tags, ...[tag]];
        var updatedTags = [];
        for(var tag_id in tags) {
            var tag = tags[tag_id];
            updatedTags[tag.text] = tag.text;
        }
        fire.database().ref("curriculums").child(this.props.curriculum_id).child("grade_levels")
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

        fire.database().ref("curriculums").child(this.props.curriculum_id).child("grade_levels")
        .set(updatedTags);
    }

    render() {
        return (
            <div>
                <TagInput
                    tags={this.state.tags}
                    suggestions={this.state.suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    readOnly={this.props.readOnly} />
            </div>
        )
    }
};

export default CurriculumGradesTagInput;