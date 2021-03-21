import React, {useState} from 'react';
import MultiCheck, {Option} from './MultiCheck/MultiCheck';

const options: Option[] = [
  {label: 'get up', value: '111',},
  {label: 'break-first', value: '222',},
  {label: 'go to work', value: '333',},
  {label: 'lunch', value: '222',},
  {label: 'go to work', value: '333',},
  {label: 'have fun', value: '444',},
  {label: 'sleep', value: '555',},
  {label: 'dream', value: '666',},
]

const defaultValues: string[] = [
  '111',
  '222',
  // '333',
  '444',
  '555',
  '666',
]

const App: React.FunctionComponent = (): JSX.Element => {
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValues)

  function onSelectedOptionsChange(options: Option[]): void {
    setSelectedValues(options.map(it => it.value))
  }

  return <div>
    <h1>Multi Check Component</h1>
    <MultiCheck label='my-today-plan' options={options}
                onChange={onSelectedOptionsChange}
                values={selectedValues}
                columns={2}/>
    <div>
      <h2>Current selected values:</h2>
      <div>{selectedValues.join(',')}</div>
    </div>
  </div>
}

export default App;
