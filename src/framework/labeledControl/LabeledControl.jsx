
import React, {
  PropTypes,
} from 'react';
import classNames from 'classnames';

import Label from '../label/Label.jsx';

const LabeledControl = props => {
  const layoutClassMap = {
    [LabeledControl.LAYOUT.TWO_FIFTHS]: 'labeledControl--twoFifths',
    [LabeledControl.LAYOUT.ONE_THIRD]: 'labeledControl--oneThird',
    [LabeledControl.LAYOUT.ONE_FOURTH]: 'labeledControl--oneFourth',
    [LabeledControl.LAYOUT.ONE_FIFTH]: 'labeledControl--oneFifth',
    [LabeledControl.LAYOUT.ONE_SIXTH]: 'labeledControl--oneSixth',
  };

  const classes = classNames('labeledControl', layoutClassMap[props.layout], {
    'labeledControl--withLabeledField': props.withLabeledField,
  });

  let label;

  if (typeof props.label === 'string') {
    label = React.createElement(Label, {
      children: props.label,
      isAlignedWithField: !props.withLabeledField,
      isAlignedWithLabeledField: props.withLabeledField,
    });
  } else {
    label = props.label;
  }

  return (
    <div className={classes}>

      {/* Label. */}
      <div className="labeledControl__label">
        {label}
      </div>

      {/* Control. */}
      <div className="labeledControl__control">
        {props.children}
      </div>
    </div>
  );
};

LabeledControl.LAYOUT = {
  TWO_FIFTHS: 'TWO_FIFTHS',
  ONE_THIRD: 'ONE_THIRD',
  ONE_FOURTH: 'ONE_FOURTH',
  ONE_FIFTH: 'ONE_FIFTH',
  ONE_SIXTH: 'ONE_SIXTH',
};

LabeledControl.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
  label: PropTypes.any,
  layout: PropTypes.string.isRequired,
  withLabeledField: PropTypes.bool,
};

LabeledControl.defaultProps = {
  layout: LabeledControl.LAYOUT.ONE_THIRD,
};

export default LabeledControl;
