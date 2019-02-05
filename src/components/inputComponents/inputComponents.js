import React from 'react'
import {Input, Checkbox, Form, Label} from 'semantic-ui-react'

export const renderTextInputField = props => {
  const {
    input,
    label,
    type,
    meta: {touched, error}
  } = props

  return (
    <div className="registration__form-item">
      <label className="registration__form-item-label">{`${label} *`}</label>
      <div className="registration__form-item-content">
        <Form.Field inline className="form-field-with-label">
          <Input error={!!(touched && error)} {...input} placeholder={label} type={type} />
          {touched &&
            error && (
              <Label pointing="left" className="warning-label">
                {error}
              </Label>
            )}
        </Form.Field>
      </div>
    </div>
  )
}

export const renderСommonTextInput = props => {
  const {input, label, type} = props
  const placeholder = label.trim().lastIndexOf('*') === label.length - 1 ? label.slice(0, label.length - 1) : label

  return (
    <div className="login__form-item">
      <label className="login__form-item-label">{label}</label>
      <div className="login__form-item-content">
        <Input {...input} placeholder={placeholder} type={type} />
      </div>
    </div>
  )
}

export const renderEmailInput = props => {
  const {
    input,
    label,
    type,
    meta: {asyncValidating, touched, error}
  } = props

  return (
    <div className="registration__form-item">
      <label className="registration__form-item-label">{`${label} *`}</label>
      <div className={`login__form-item-content`}>
        <Form.Field inline className="form-field-with-label">
          <Input error={!!(touched && error)} {...input} placeholder={label} type={type} loading={asyncValidating} />
          {touched &&
            error && (
              <Label pointing="left" className="warning-label">
                {error}
              </Label>
            )}
        </Form.Field>
      </div>
    </div>
  )
}

export const renderCheckboxInputField = props => {
  const {input, label} = props

  return (
    <div className="registration__form-item">
      <Checkbox
        label={label}
        checked={input.value ? true : false}
        onChange={(e, {checked}) => input.onChange(checked)}
      />
    </div>
  )
}

export const renderDateInputField = props => {
  const {input, label, type, min, max} = props

  return (
    <div className="registration__form-item">
      <label className="registration__form-item-label">{label}</label>
      <div className="registration__form-item-content">
        <Input {...input} type={type} min={min} max={max} />
      </div>
    </div>
  )
}
