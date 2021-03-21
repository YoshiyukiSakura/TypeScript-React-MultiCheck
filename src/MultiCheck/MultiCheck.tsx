import './MultiCheck.css';

import React, {useState} from 'react';

export type Option = {
  label: string,
  value: string
}

/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. If columns > 1, the options should be placed from top to bottom in each column
 *
 * @param {string} label - the label text of this component
 * @param {Option[]} options - options
 * @param {string[]} values - default checked option values
 * @param {number} columns - default value is 1
 * @param {Function} onChange - when checked options are changed,
 *                             they should be passed to outside
 */
type Props = {
  label?: string,
  options: Option[],
  columns?: number,
  values: string[]
  onChange?: (options: Option[]) => void,
}

const MultiCheck: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {options, values} = props
  return <div className='MultiCheck'>
    <span>
      <input type="checkbox" defaultChecked={options.every(option => values.includes(option.value))}/>
      <label>Select All</label>
    </span>
    {
      options.map((option, offset) => {
        return <span key={offset}>
                <input type="checkbox" defaultChecked={values.includes(option.value)}/>
                <label>{option.label}</label>
              </span>
      })
    }
  </div>
}

export default MultiCheck;
