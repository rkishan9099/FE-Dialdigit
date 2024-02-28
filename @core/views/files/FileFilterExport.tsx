import { useState } from 'react'
import { CSVLink } from 'react-csv'
// @mui
import { alpha } from '@mui/material/styles'
import { Box, Stack, Button, Typography, CardActionArea } from '@mui/material'
// components
// import Label from '../../../../components/label';
import IconifyIcon from '@/@core/components/icon'
import FileThumbnail from './FileThumbnail'
// import { fDate } from '../../../../utils/formatTime';
//
import FileFilterButton from './FileFilterButton'
import moment from 'moment'
import Label from '@/@core/components/label/Label'
import MenuPopover from '../menu-popover/MenuPopover'

// ----------------------------------------------------------------------

type Props = {
  optionsType: string[]
  filterType: string
  onFilterType: (type: string) => void
  onReset: VoidFunction
  dataFiltered: any
}

export default function FileFilterExport({ optionsType, filterType, onFilterType, onReset, dataFiltered }: Props) {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget)
  }

  const handleClosePopover = () => {
    onReset()
    setOpenPopover(null)
  }

  const isSelected = !!filterType?.length

  const renderLabel = 'Export'

  return (
    <>
      <FileFilterButton
        isSelected={isSelected}
        endIcon={<IconifyIcon icon={openPopover ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
        onClick={handleOpenPopover}
      >
        {renderLabel}
        {filterType && (
          <Label color='info' sx={{ ml: 1, textTransform: 'capitalize' }}>
            {filterType}
          </Label>
        )}
      </FileFilterButton>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ p: 2.5 }}>
        <Stack spacing={2.5}>
          <Box display='grid' gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }} gap={1}>
            {optionsType.map(type => {
              const selected = filterType === type || false

              return (
                <CardActionArea
                  key={type}
                  onClick={() => onFilterType(type)}
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    cursor: 'pointer',
                    color: 'text.secondary',
                    border: theme => `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
                    ...(selected && {
                      color: 'text.primary',
                      bgcolor: 'action.selected'
                    })
                  }}
                >
                  <Stack spacing={0.5} direction='row' alignItems='center'>
                    <FileThumbnail file={type} />

                    <Typography variant='body2'>{type}</Typography>
                  </Stack>
                </CardActionArea>
              )
            })}
          </Box>

          <Stack spacing={1} direction='row' alignItems='center' justifyContent='flex-end'>
            <Button variant='outlined' color='inherit' onClick={handleClosePopover}>
              Close
            </Button>

            {filterType && (
              <Button variant='contained' onClick={handleClosePopover}>
                <CSVLink
                  data={dataFiltered}
                  filename={`customers-list-${moment(new Date(), 'MM-dd-yyyy')}`}
                  style={{ color: 'white' }}
                >
                  Export
                </CSVLink>
              </Button>
            )}
          </Stack>
        </Stack>
      </MenuPopover>
    </>
  )
}
