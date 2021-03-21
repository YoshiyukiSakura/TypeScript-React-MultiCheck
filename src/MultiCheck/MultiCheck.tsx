import './MultiCheck.css';

import React, {ChangeEvent, useEffect, useState} from 'react';
import construct = Reflect.construct;

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
  columns: number,
  values: string[]
  onChange?: (options: Option[]) => void,
}

const MultiCheck: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {options, values} = props
  const [checkboxStatusList, setCheckboxList] = useState(options.map(option => values.includes(option.value)))
  const allChecked = Array(options.length).fill(true)//its a cache, makes toggleAll() faster
  const unChecked = Array(options.length).fill(false)
  const columnSize = Math.ceil((options.length + 1) / props.columns)
  console.log((options.length + 1), columnSize)

  useEffect(() => {
    callOnChange()
  }, checkboxStatusList)

  function isAllSelected(): boolean {
    return checkboxStatusList.every(checked => checked)
  }

  function toggleAll(alreadySelected: boolean): void {
    setCheckboxList(alreadySelected ? unChecked : allChecked)
    callOnChange()
  }

  function handleCheckboxChange(event: ChangeEvent, offset: number): void {
    let copy = Array.from(checkboxStatusList)
    copy[offset] = !copy[offset]
    setCheckboxList(copy)
    callOnChange()
  }

  function callOnChange(): void {
    if (props.onChange) {
      let selectedOptions: Option[] = []
      checkboxStatusList.forEach((checked, offset) => {
        if (checked) selectedOptions.push(options[offset])
      })
      props.onChange(selectedOptions)
    }
  }

  let checkList = []

  for (let i = 0; i < options.length; i++) {
    //for the first column, if checkList.length + (select all) equals columnSize, do a wrap
    //afterwards, wrap when a new column.length equals columnSize
    const warpFlag = i === columnSize - 2 || (i > columnSize && (i - columnSize + 2) % columnSize === 0)
    checkList.push(
      <span key={i} className='CheckItem'>
        <input id={'cb' + i} type="checkbox" onChange={event => handleCheckboxChange(event, i)}
               checked={checkboxStatusList[i]}/>
        <label htmlFor={'cb' + i}>{options[i].label}</label>
      </span>
    )
    if (warpFlag) {
      //please check CSS comments to see how this works
      checkList.push(<br key={-i}/>)
    }
  }

  return (
    <div className='MultiCheck'>
      <h2>{props.label}</h2>
      <div className='CheckList'>
        <span className='CheckItem'>
          <input id="all" onChange={() => toggleAll(isAllSelected())} type="checkbox" checked={isAllSelected()}/>
          <label htmlFor="all">Select All</label>
        </span>
        {checkList}
      </div>
    </div>
  )
}

export default MultiCheck;
