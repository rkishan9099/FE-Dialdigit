import { useCallback, useEffect, useState } from 'react'
// @mui
import { Stack, Dialog, Button, TextField, DialogProps, DialogTitle, DialogContent, DialogActions } from '@mui/material'
// components
import IconifyIcon from '@/@core/components/icon'
import FileUploaderRestrictions from '../form/form-element/file-uploader/FileUploaderRestrictions'
import { RHFSelect } from '@/hooks/hook-form'
import { fileData } from './utils'
import numeral from 'numeral'

// ----------------------------------------------------------------------

interface Props extends DialogProps {
  title?: string
  //
  onCreate?: VoidFunction
  onUpdate?: VoidFunction
  onSubmit?: VoidFunction
  setValue?: any
  type?: any
  //
  folderName?: string
  onChangeFolderName?: (event: React.ChangeEvent<HTMLInputElement>) => void
  //
  open: boolean
  onClose: VoidFunction
  category?: string
  setCategory?: any
}

export default function FileNewFolderDialog({
  title = 'Upload Files',
  open,
  onClose,
  //
  onCreate,
  onUpdate,
  onSubmit,
  setValue,
  type,
  //
  folderName,
  onChangeFolderName,
  category,
  setCategory,
  ...other
}: Props) {
  const [files, setFiles] = useState<(File | string)[]>([])

  useEffect(() => {
    if (!open) {
      setFiles([])
    }
  }, [open])

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles: any = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )

      const { size = 0 } = fileData(newFiles)
      newFiles.size = numeral(size).format('0.0 b')
      setFiles([...files, ...newFiles])
    },
    [files]
  )
  useEffect(() => {
    setValue('file', files)
  }, [files]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleUpload = () => {
    onClose()
    console.log('ON UPLOAD')
  }

  // const handleRemoveFile = (inputFile: File | string) => {
  //   const filtered = files.filter(file => file !== inputFile)
  //   setFiles(filtered)
  // }
  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  return (
    <Dialog fullWidth maxWidth='sm' open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ p: theme => theme.spacing(3, 3, 2, 3) }}> {title} </DialogTitle>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        {(onCreate || onUpdate) && (
          <TextField fullWidth label='Folder name' value={folderName} onChange={onChangeFolderName} sx={{ mb: 3 }} />
        )}

        <FileUploaderRestrictions
          maxFilesAllowed={5}
          acceptedFiles={{}}
          // files={files}
          handleDrop={handleDrop}
          // onRemove={handleRemoveFile}
        />
        <RHFSelect
          sx={{ mt: 10 }}
          native
          name='category'
          label='Select Category'
          value={category}
          onChange={e => setCategory && setCategory(e.target.value)}
        >
          <option value='INSURANCE_DECLARATION' label='Insurance declaration' />
          <option value='PAYSTUB' label='Paystub' />
          <option value='ACCIDENT_PICTURE' label='Accident Picture' />
          <option value='WORK_CONTRACT' label='Work Contract' />
          <option value='OTHER' label='Other' />
        </RHFSelect>
      </DialogContent>

      <DialogActions>
        <Button
          variant='contained'
          startIcon={<IconifyIcon icon='eva:cloud-upload-fill' />}
          onClick={onSubmit || handleUpload}
          type={type ? 'submit' : 'button'}
        >
          Upload
        </Button>

        {!!files.length && (
          <Button variant='outlined' color='inherit' onClick={handleRemoveAllFiles}>
            Remove all
          </Button>
        )}

        {(onCreate || onUpdate) && (
          <Stack direction='row' justifyContent='flex-end' flexGrow={1}>
            <Button variant='outlined' onClick={onCreate || onUpdate}>
              {onUpdate ? 'Save' : 'Create'}
            </Button>
          </Stack>
        )}
      </DialogActions>
    </Dialog>
  )
}
