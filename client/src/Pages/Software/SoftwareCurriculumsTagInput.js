import React, {Component} from 'react';
import fire from './../../fire';
import TagInput from './../Common/TagInput';

class SoftwareCurriculumsTagInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            suggestions: [],
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    componentDidMount() {
        var self = this;

        if(this.props.software_id) {
            // Get tags
            fire.database().ref("software").child(this.props.software_id).child("curriculums").on("value", function(data) {
                var curriculums = data.val() ? Object.values(data.val()) : [];

                var updatedCurriculums = curriculums.map((curriculum) => {
                    return {
                        id: curriculum,
                        text: curriculum,
                    };
                });

                self.setState({ tags: updatedCurriculums });
            });
        }

        // Get suggestions
        fire.database().ref("curriculums").on("value", function(data) {
            var curriculums = data.val() ? Object.values(data.val()) : [];

            var curriculumNames = curriculums.map((curriculum) => {
                return {
                    id: curriculum.name,
                    text: curriculum.name,
                }
            });
            self.setState({ suggestions: curriculumNames });
        });
    }

    handleDelete(i) {
        var tags = this.state.tags.filter((tag, index) => index !== i);
        var updatedTags = tags.map((tag) => {
            return tag.text;
        });
        fire.database().ref("software").child(this.props.software_id).child("curriculums")
        .set(updatedTags);
    }

    handleAddition(tag) {
        var tags = [...this.state.tags, ...[tag]];
        var updatedTags = [];
        for(var tag_id in tags) {
            var tag = tags[tag_id];
            updatedTags[tag.text] = tag.text;
        }
        fire.database().ref("software").child(this.props.software_id).child("curriculums")
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

        fire.database().ref("software").child(this.props.software_id).child("curriculums")
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
                    handleDrag={this.props.handleDrag ? this.props.handleDrag : this.handleDrag}
                    readOnly={this.props.readOnly} />
            </div>
        )
    }
};

export default SoftwareCurriculumsTagInput;