
import React, {
  Component,
  PropTypes
} from 'react';
import GridSection from './GridSection.jsx';

export default class GridFooter extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <GridSection
        section="footer"
        appendClass={this.props.appendClass}
        rows={this.props.rows}
      />
    );
  }

}

GridFooter.propTypes = {
  appendClass: PropTypes.string,
  rows: PropTypes.array.isRequired,
};
