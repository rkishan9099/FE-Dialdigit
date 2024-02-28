import NextLink from 'next/link'
// @mui
import { Box, Stack, Typography, PaperProps, Button } from '@mui/material'
// hooks
// // utils
// // @types
import IconifyIcon from '@/@core/components/icon'
import FileThumbnail from './FileThumbnail'
import { fDateTime } from '@/Utils/formatTime'
import { ICustomerFile } from '@/types/apps/file'
import useResponsive from '@/@core/hooks/useResponsive'

// ----------------------------------------------------------------------

interface Props extends PaperProps {
  file: ICustomerFile
  onDelete?: VoidFunction
}

export default function FileGeneralRecentCard({ file, sx, ...other }: Props) {
  const isDesktop = useResponsive('up', 'sm')

  return (
    <Stack
      spacing={isDesktop ? 1.5 : 2}
      direction={isDesktop ? 'row' : 'column'}
      alignItems={isDesktop ? 'center' : 'flex-start'}
      sx={{
        p: 2.5,
        mb: 2,
        borderRadius: 2,
        position: 'relative',
        border: theme => `solid 1px ${theme.palette.divider}`,
        '&:hover': {
          bgcolor: 'background.paper'
          // boxShadow: (theme) => theme.customShadows.z20,
        },
        ...(isDesktop && {
          p: 1.5,
          borderRadius: 1.5
        }),
        ...sx
      }}
      {...other}
    >
      <FileThumbnail file={file.fileType} />

      <Stack
        sx={{
          width: 1,
          flexGrow: { sm: 1 },
          minWidth: { sm: '1px' }
        }}
      >
        <Typography variant='subtitle2' noWrap>
          {file.fileName || 'Uploaded File'}
        </Typography>

        <Stack
          spacing={0.75}
          direction='row'
          alignItems='center'
          sx={{ typography: 'caption', color: 'text.disabled', mt: 0.5 }}
        >
          {/* <Box> {fData(file.size) || '* MB'} </Box> */}

          {/* <Box sx={{ width: 2, height: 2, borderRadius: '50%', bgcolor: 'currentColor' }} /> */}

          <Box> {fDateTime(file.createdAt)} </Box>
        </Stack>
      </Stack>

      <Stack>
        <Button
          component={NextLink}
          href={file?.url}
          target='_blank'
          startIcon={
            <IconifyIcon
              icon='ic:baseline-sim-card-download'
              // sx={{
              //   p: 0,
              //   width: 30,
              //   height: 30,
              // }}
            />
          }
        />
      </Stack>
    </Stack>
  )
}
