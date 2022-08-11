import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './styles.css';

const options = ['All','Pending', 'In Progress', 'Done'];

export default function ControllableStates({setValues}) {
  const [inputValue, setInputValue] = React.useState('');

  const handleChange = (event, value) => {
    setValues(value);
  };
  return (
    
    <div className='filter'>
      <Autocomplete
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 200,padding:1,height:25 }}
        renderInput={(params) => <TextField {...params} label="Status" />}
      />
    </div>
  );
}