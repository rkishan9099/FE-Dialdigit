// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import MenuItem from '@mui/material/MenuItem'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import { SelectChangeEvent } from '@mui/material/Select'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Custom Components Imports
import CustomChip from '@/@core/components/mui/chip'
import CustomTextField from '@/@core/components/mui/text-field'

const furnishingArray = [
  'AC',
  'TV',
  'RO',
  'Bed',
  'WiFi',
  'Sofa',
  'Fridge',
  'Cupboard',
  'Microwave',
  'Dining Table',
  'Washing Machine'
]

const StepPropertyFeatures = () => {
  // ** State
  const [furnishingDetails, setFurnishingDetails] = useState<string[]>(['Fridge', 'AC', 'TV', 'Wifi'])

  const handleChange = (event: SelectChangeEvent<typeof furnishingDetails>) => {
    const {
      target: { value }
    } = event
    setFurnishingDetails(typeof value === 'string' ? value.split(',') : value)
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <CustomTextField fullWidth label='Bedrooms' placeholder='3' />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextField fullWidth label='Floor No' placeholder='12' />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextField fullWidth label='Bathroom' placeholder='4' />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextField select fullWidth id='demo-simple-select' label='Furnished Status' defaultValue=''>
          <MenuItem value='Fully Furnished'>Fully Furnished</MenuItem>
          <MenuItem value='Furnished'>Furnished</MenuItem>
          <MenuItem value='Semi Furnished'>Semi Furnished</MenuItem>
          <MenuItem value='UnFurnished'>UnFurnished</MenuItem>
        </CustomTextField>
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          select
          fullWidth
          id='select-furnishing-details'
          SelectProps={{
            multiple: true,
            value: furnishingDetails,
            onChange: e => handleChange(e as SelectChangeEvent<typeof furnishingDetails>),
            renderValue: selected => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {(selected as string[]).map(value => (
                  <CustomChip rounded key={value} label={value} skin='light' size='small' />
                ))}
              </Box>
            )
          }}
        >
          {furnishingArray.map(furniture => (
            <MenuItem key={furniture} value={furniture}>
              {furniture}
            </MenuItem>
          ))}
        </CustomTextField>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl>
          <FormLabel id='common-area-radio' sx={{ fontSize: theme => theme.typography.body2.fontSize }}>
            Common Area?
          </FormLabel>
          <RadioGroup defaultValue='yes' name='common-area-group' aria-labelledby='common-area-radio'>
            <FormControlLabel value='yes' control={<Radio />} label='Yes' />
            <FormControlLabel value='no' control={<Radio />} label='No' />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl>
          <FormLabel id='gated-radio' sx={{ fontSize: theme => theme.typography.body2.fontSize }}>
            Is a gated colony?
          </FormLabel>
          <RadioGroup defaultValue='yes' name='gated-group' aria-labelledby='gated-radio'>
            <FormControlLabel value='yes' control={<Radio />} label='Yes' />
            <FormControlLabel value='no' control={<Radio />} label='No' />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default StepPropertyFeatures
