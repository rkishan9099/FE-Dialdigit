// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { styled, useTheme } from '@mui/material/styles'

// ** Icon Imports
import Icon from '@/@core/components/icon'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'

interface FileProp {
  name: string
  type: string
  size: number
}
interface Props {
  width?: string
  height?: string
  handleDrop?: any
  maxFilesAllowed?: number
  acceptedFiles?: any
  restFile?: boolean
}

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  width: 48,
  height: 48,
  marginBottom: theme.spacing(8.5)
}))

const FileUploaderRestrictions = ({ width, height, handleDrop, maxFilesAllowed, acceptedFiles, restFile }: Props) => {
  // ** State
  const [files, setFiles] = useState<File[]>([])

  // ** Hooks
  const theme = useTheme()
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: maxFilesAllowed || 1,
    maxSize: 10000000,
    accept: acceptedFiles || {
      'text/xlsx': ['.xlsx', '.xlsm', '.xlsb', '.csv', '.xls']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
      handleDrop(acceptedFiles)
    },
    onDropRejected: () => {
      toast.error('You can only upload 2 files & maximum size of 2 MB.', {
        duration: 2000
      })
    }
  })

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)} />
    } else {
      return <Icon icon='tabler:file-description' />
    }
  }

  const handleRemoveFile = (file: FileProp) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)
    setFiles([...filtered])
  }

  useEffect(() => {
    if (restFile && files.length > 0) {
      setFiles([])
    }
  }, [restFile, files])

  const fileList = files.map((file: FileProp) => (
    <ListItem key={file.name}>
      <div className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name'>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <Icon icon='tabler:x' fontSize={20} />
      </IconButton>
    </ListItem>
  ))

  return (
    <Fragment>
      <div {...getRootProps({ className: 'dropzone' })} style={{ width: width, height: height }}>
        <input {...getInputProps()} />
        <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Img alt='Upload img' src={`/images/misc/upload-${theme.palette.mode}.png`} />
          <Typography variant='h5' sx={{ mb: 2.5 }}>
            Drop files here or click to upload.
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Allowed
            {acceptedFiles && Object.keys(acceptedFiles).length > 0
              ? Object.keys(acceptedFiles).map(key => acceptedFiles[key])
              : ' All files'}
          </Typography>
          {/* <Typography sx={{ color: 'text.secondary' }}>Max 2 files and max size of 2 MB</Typography> */}
        </Box>
      </div>
      {files.length ? (
        <Fragment>
          <List>{fileList}</List>
        </Fragment>
      ) : null}
    </Fragment>
  )
}

export default FileUploaderRestrictions
