
import React, {
  PropTypes,
} from 'react';
import classNames from 'classnames';
import keyMirror from 'keymirror';

const Progress = props => {
  const sizeToClassMap = {
    [Progress.SIZE.SMALL]: 'progress--small',
  };

  const classes = classNames(
    'progress',
    sizeToClassMap[props.size]
  );

  return (
    <div className={classes}>
      <div className="progress__dot" />
      <div className="progress__dot" />
      <div className="progress__dot" />
      <div className="progress__dot" />
    </div>
  );
};

Progress.SIZE = keyMirror({
  SMALL: null,
});

Progress.propTypes = {
  size: PropTypes.string,
};

export default Progress;

// We need to export these components after the default export because they
// depend on it.
export {
  default as ProgressModal,
} from './ProgressModal.jsx';

export {
  default as ProgressSuccess,
} from './ProgressSuccess.jsx';
