import { useState } from 'react'
import { isSameDay, isSameMonth, getYear, isBefore } from 'date-fns'
// utils
//
import { DateRangePickerProps } from './types'
import moment from 'moment'

// ----------------------------------------------------------------------

type ReturnType = DateRangePickerProps

export default function useDateRangePicker(start: Date | null, end: Date | null): ReturnType {
  const [open, setOpen] = useState(false)

  const [endDate, setEndDate] = useState(end)

  const [startDate, setStartDate] = useState(start)

  const isError = (startDate && endDate && isBefore(new Date(endDate), new Date(startDate))) || false

  const currentYear = new Date().getFullYear()

  const startDateYear = startDate ? getYear(startDate) : null

  const endDateYear = endDate ? getYear(endDate) : null

  const isCurrentYear = currentYear === startDateYear && currentYear === endDateYear

  const isSameDays = startDate && endDate ? isSameDay(new Date(startDate), new Date(endDate)) : false

  const isSameMonths = startDate && endDate ? isSameMonth(new Date(startDate), new Date(endDate)) : false

  const standardLabel = `${moment(startDate)} - ${moment(endDate)}`

  const getShortLabel = () => {
    if (isCurrentYear) {
      if (isSameMonths) {
        if (isSameDays) {
          return `${moment(endDate, 'dd MMM yy')}`
        }

        return `${moment(startDate, 'dd')} - ${moment(endDate, 'dd MMM yy')}`
      }

      return `${moment(startDate, 'dd MMM')} - ${moment(endDate, 'dd MMM yy')}`
    }

    return `${moment(startDate, 'dd MMM yy')} - ${moment(endDate, 'dd MMM yy')}`
  }

  const onChangeStartDate = (newValue: Date | null) => {
    setStartDate(newValue)
  }

  const onChangeEndDate = (newValue: Date | null) => {
    if (isError) {
      setEndDate(null)
    }
    setEndDate(newValue)
  }

  const onInit = () => {
    setStartDate(new Date())
    setEndDate(new Date())
  }

  const onReset = () => {
    setStartDate(null)
    setEndDate(null)
  }

  const onOpen = () => {
    onInit()
    setOpen(true)
  }

  return {
    startDate,
    endDate,
    onChangeStartDate,
    onChangeEndDate,
    //
    open,
    onOpen,
    onClose: () => setOpen(false),
    onReset,
    onInit,
    //
    isSelected: !!startDate && !!endDate,
    isError,
    //
    label: standardLabel || '',
    shortLabel: getShortLabel() || '',
    //
    setStartDate,
    setEndDate
  }
}
