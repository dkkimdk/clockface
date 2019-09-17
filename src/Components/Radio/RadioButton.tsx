// Libraries
import React, {Component} from 'react'
import classnames from 'classnames'

// Types
import {StandardClassProps} from '../../Types'

interface Props extends StandardClassProps {
  /** Toggles radio button active state */
  active: boolean
  /** Input value of the selected radio button */
  value: any
  /** Function to be called on radio button click */
  onClick: (value: any) => void
  /** Text to be displayed on hover tooltip */
  titleText: string
  /** Toggles disabled state */
  disabled: boolean
  /** Text to be displayed on hover tooltip when radio button is disabled */
  disabledTitleText: string
}

export class RadioButton extends Component<Props> {
  public static readonly displayName = 'RadioButton'

  public static defaultProps = {
    disabled: false,
    disabledTitleText: 'This option is disabled',
    testID: 'radio--button',
  }

  public render() {
    const {children, disabled, testID, id, style} = this.props

    return (
      <button
        type="button"
        className={this.className}
        disabled={disabled}
        onClick={this.handleClick}
        title={this.title}
        data-testid={testID}
        id={id}
        style={style}
      >
        {children}
      </button>
    )
  }

  private get className(): string {
    const {active, disabled, className} = this.props

    return classnames('cf-radio-button', {
      active,
      disabled,
      [`${className}`]: className,
    })
  }

  private get title(): string | undefined {
    const {titleText, disabledTitleText, disabled} = this.props

    if (disabled) {
      return disabledTitleText
    }

    return titleText
  }

  private handleClick = () => {
    const {onClick, value} = this.props

    onClick(value)
  }
}
