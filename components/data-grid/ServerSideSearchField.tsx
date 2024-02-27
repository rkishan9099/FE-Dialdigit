// ** React Imports
import { ChangeEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'


// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface Props {
  onChange: (val: any) => void
}

const ServerSideSearchField = (props: Props) => {

  const [searchValue, setSearchValue] = useState<string | null>('')

  useEffect(() => {
    props.onChange(searchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <Box
      sx={{
        gap: 2,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: theme => theme.spacing(2, 5, 4, 5)
      }}
    >
      <TextField
        size='small'
        value={searchValue}
        onChange={handleSearchInput}
        placeholder='Search…'
        InputProps={{
          startAdornment: (
            <Box sx={{ mr: 2, display: 'flex' }}>
              <Icon icon='tabler:search' fontSize={20} />
            </Box>
          ),
          endAdornment: (
            <IconButton size='small' title='Clear' aria-label='Clear' onClick={() => setSearchValue('')}>
              <Icon icon='tabler:x' fontSize={20} />
            </IconButton>
          )
        }}
        sx={{
          width: {
            xs: 1,
            sm: 'auto'
          },
          '& .MuiInputBase-root > svg': {
            mr: 2
          }
        }}
      />
    </Box>
  )
}

export default ServerSideSearchField
