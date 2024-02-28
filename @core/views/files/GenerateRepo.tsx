// @mui
import { alpha } from '@mui/material/styles'
import { Box, Stack, Typography, CardActionArea } from '@mui/material'
import FileThumbnail from './FileThumbnail'
// components

// ----------------------------------------------------------------------

type Props = {
  filterType: string
  optionsType?: string[]
  onFilterType: (value: string) => void
}

export default function GenerateRepo({ optionsType, filterType, onFilterType }: Props) {
  return (
    <Stack spacing={2.5}>
      <Box display='grid' gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }} gap={1}>
        {optionsType?.map((row: any) => {
          const selected = filterType === row.id || row._id || false

          return (
            <CardActionArea
              key={row.id || row._id}
              onClick={() => onFilterType(row.id || row._id)}
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
                <FileThumbnail file='pdf' />

                <Typography variant='body2'>{row.name}</Typography>
              </Stack>
            </CardActionArea>
          )
        })}
      </Box>
    </Stack>
  )
}
