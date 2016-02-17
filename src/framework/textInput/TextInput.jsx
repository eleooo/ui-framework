
import React, {
  PropTypes,
} from 'react';
import classNames from 'classnames';

const TextInput = props => {
  const classes = classNames('textInput', props.className, {
    'textInput--fullWidth': props.isFullWidth,
    'textInput--error': props.isError,
  });

  const extendedProps = Object.assign({}, props, {
    className: classes,
  });

  return (
    <input
      data-id={props.dataId}
      {...extendedProps}
    />
  );
};

TextInput.propTypes = {
  isError: PropTypes.bool,
  dataId: PropTypes.string,
  isFullWidth: PropTypes.bool,
};

export default TextInput;
