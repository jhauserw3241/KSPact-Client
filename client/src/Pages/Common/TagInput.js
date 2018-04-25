import React, {Component} from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import "./../../CSS/Tag.css";

class TagInput extends Component {
    render() {
        return (
            <div>
                <ReactTags
                    tags={this.props.tags || []}
                    suggestions={this.props.suggestions || []}
                    handleDelete={this.props.handleDelete}
                    handleAddition={this.props.handleAddition}
                    handleDrag={this.props.handleDrag}
                    readOnly={this.props.readOnly} />
            </div>
        )
    }
};

export default TagInput;