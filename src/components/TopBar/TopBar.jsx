import { useState } from 'react';
import {Toolbar, Paper, IconButton, InputLabel, MenuItem, FormControl, Select, useMediaQuery } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';
import { getFilterValues } from '../../utils'

const filters = ['none', 'likelihood', 'relevance', 'sector', 'pestle', 'region', 'topic', 'country'];

export default function TopBar({ applyFilter, getOverview, darkMode, setDarkMode, setOpenSide }) {
  const [filter, setFilter] = useState('');
  const [values, setValues] = useState([]);
  const [selected, setSelected] = useState('');
  const matches = useMediaQuery('(max-width:900px)');
  const small = useMediaQuery('(max-width:600px)');

  function handleFilterChange(e){
    setFilter(e.target.value);

    if(e.target.value === 'none'){
      getOverview();
      setFilter("")
      setValues([])
      setSelected("")
      return;
    }
    getFilterValues(e.target.value)
    .then(data => {
      setValues(data)
      setSelected("")
    });
  }

  function handleValueChange(e){
    setSelected(e.target.value)
    applyFilter(filter, e.target.value);
  }

  return (
    <Paper sx={{margin: '20px 0'}}>
      <Toolbar sx={{'gap':'10px', color: '#888', fontSize: '1.3rem'}} >
        {
          matches 
          ? <IconButton onClick={() => setOpenSide(true)}> <MenuIcon /> </IconButton>
          : <FilterListIcon />
        }

        {
          !small &&
          <FilterForm 
          filter={filter}
          filters={filters}
          values={values}
          selected={selected}
          handleFilterChange={handleFilterChange}
          handleValueChange={handleValueChange}
          />
        }

        <div style={{ marginLeft: 'auto', minWidth: '150px', display: 'flex', gap: '20px', alignItems: 'center'}}>
          <IconButton onClick={() => setDarkMode(p => !p)}>
            { darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <NotificationsActiveOutlinedIcon />
          <AccountCircleOutlinedIcon />
        </div>

      </Toolbar>

      {
        small &&
        <Toolbar sx={{ mt: 2, gap: '10px'}}>
          <FilterForm 
          filter={filter}
          filters={filters}
          values={values}
          selected={selected}
          handleFilterChange={handleFilterChange}
          handleValueChange={handleValueChange}
          />
        </Toolbar>
      }
    </Paper>
  )}

  function FilterForm({ filters, filter, values, selected, handleFilterChange, handleValueChange}){
    return(
      <>
        <FormControl sx={{width: '300px'}}>
          <InputLabel id="filter-field">Filter Field</InputLabel>
          <Select
            labelId="filter-field"
            id="filter-select"
            value={filter}
            label="Filter Field"
            onChange={handleFilterChange}
          >
            {filters.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl sx={{ width: '300px'}}>
          <InputLabel id="filter-value">Filter Field</InputLabel>
          <Select
            labelId="filter-value"
            id="filter-value"
            value={selected}
            defaultValue=''
            label="Filter Field"
            onChange={handleValueChange}
          >
            {values.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
          </Select>
        </FormControl>
      </>
    )
  }