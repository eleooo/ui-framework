
/**
 * The complexity of this component lies in how its state changes based on
 * different types of interaction (mouse vs keyboard). The user can:
 *
 * 1. Click to OPEN and GAIN FOCUS.
 * 2. Click a second time to CLOSE (but retain focus).
 * 3. Tab onto it to GAIN FOCUS.
 * 4. Tab away to CLOSE and LOSE FOCUS.
 * 5. Press down (if focused) to OPEN.
 * 6. Press escape (if focused) to CLOSE.
 * 7. Press enter (if focused) to CLOSE.
 */

import React, {
  Component,
  PropTypes,
} from 'react';
import classNames from 'classnames';

export default class BaseDropdown extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hasFocus: false,
      isOpen: false,
      focusedOptionIndex: -1,
    };

    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onClickLabel = this.onClickLabel.bind(this);
    this.onMouseDownLabel = this.onMouseDownLabel.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSelectOption = this.onSelectOption.bind(this);
    this.onMouseOverOption = this.onMouseOverOption.bind(this);
  }

  onBlur() {
    this.setState({
      hasFocus: false,
      isOpen: false,
      focusedOptionIndex: -1,
    });
  }

  onFocus() {
    this.setState({
      hasFocus: true,
    });
  }

  onMouseDownLabel(event) {
    // Set focus as soon as the mouse is pressed down. Prevent the default
    // behavior, which would take focus away from the input again.
    this.refs.input.focus();
    event.preventDefault();
  }

  onClickLabel() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  onMouseOverOption(index) {
    this.setState({
      focusedOptionIndex: index,
    });
  }

  onKeyDown(event) {
    // Let tab continue to cycle focus.
    if (event.keyCode === 9) {
      return;
    }

    // Let special keyboard commands have normal effects.
    if (event.metaKey || event.altKey || event.ctrlKey) {
      return;
    }

    event.preventDefault();

    switch (event.keyCode) {
      // Enter
      case 13: {
        // Select the focused option if the dropdown is open.
        if (this.state.isOpen) {
          this.onSelectOption(
            this.props.options[this.state.focusedOptionIndex]
          );
        }
        break;
      }

      // Escape
      case 27: {
        this.setState({
          isOpen: false,
        });
        break;
      }

      // Up
      case 38: {
        // Focus the previous option if the dropdown is open.
        if (this.state.isOpen) {
          this.focusPreviousOption();
        }
        break;
      }

      // Down
      case 40: {
        // Open the options and focus the next one.
        this.setState({
          isOpen: true,
        });
        this.focusNextOption();
        break;
      }

      default: {
        break;
      }
    }
  }

  onSelectOption(option) {
    this.props.onSelect(option);
    this.setState({
      isOpen: false,
    });
  }

  focusNextOption() {
    const focusedOptionIndex =
      this.state.focusedOptionIndex === this.props.options.length - 1 ?
      0 :
      this.state.focusedOptionIndex + 1;

    this.setState({
      focusedOptionIndex,
    });
  }

  focusPreviousOption() {
    const focusedOptionIndex =
      this.state.focusedOptionIndex === 0 ?
      this.props.options.length - 1 :
      this.state.focusedOptionIndex - 1;

    this.setState({
      focusedOptionIndex,
    });
  }

  render() {
    const labelStateClasses = {};
    if (this.state.hasFocus) {
      labelStateClasses[this.props.labelFocusClasses] = true;
    }
    const labelClasses = classNames(this.props.labelClasses, labelStateClasses);

    const label = this.props.labelProvider(this.props.selectedOption);

    let optionList;

    if (this.state.isOpen) {
      const options = this.props.options.map((option, index) => {
        return React.createElement(this.props.optionType, {
          key: index,
          option,
          index,
          hasFocus: this.state.focusedOptionIndex === index,
          onMouseOver: this.onMouseOverOption,
          onClick: this.onSelectOption,
          children: this.props.optionLabelProvider(option),
        });
      });

      optionList = (
        <div
          ref="optionList"
          className={this.props.optionListClasses}
        >
          {options}
        </div>
      );
    }

    return (
      <div className={this.props.classes}>
        {/* Allow this component to be focusable by adding a hidden input. */}
        <input
          ref="input"
          className={this.props.inputClasses}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onKeyDown={this.onKeyDown}
          type="hidden"
        />
        <div
          className={labelClasses}
          onClick={this.onClickLabel}
          onMouseDown={this.onMouseDownLabel}
        >
          {label}
        </div>
        {optionList}
      </div>
    );
  }

}

BaseDropdown.propTypes = {
  classes: PropTypes.string.isRequired,
  inputClasses: PropTypes.string.isRequired,
  labelClasses: PropTypes.string.isRequired,
  labelFocusClasses: PropTypes.string.isRequired,
  optionListClasses: PropTypes.string.isRequired,
  optionType: PropTypes.func.isRequired,
  options: PropTypes.array,
  selectedOption: PropTypes.any,
  onSelect: PropTypes.func.isRequired,
  labelProvider: PropTypes.func.isRequired,
  optionLabelProvider: PropTypes.func.isRequired,
};

BaseDropdown.defaultProps = {
  options: [],
};
