import {compose} from 'redux'
import {workTimeFormat, timeConstants} from '../constants/constants'

const toDateTime = millisecs => {
  let date = new Date(1970, 0, 1)

  date.setMilliseconds(millisecs)

  return date
}

const correctingTimeLook = unitTime => {
  return String(unitTime).length === 2 ? unitTime : '0' + unitTime
}

const getTimerHours = timeSinceStart => workTimeFormat => {
  return workTimeFormat.replace('hh', correctingTimeLook(timeSinceStart.getHours()))
}

const getTimerMinutes = timeSinceStart => workTimeFormat => {
  return workTimeFormat.replace('mm', correctingTimeLook(timeSinceStart.getMinutes()))
}

const getTimerSeconds = timeSinceStart => workTimeFormat => {
  return workTimeFormat.replace('ss', correctingTimeLook(timeSinceStart.getSeconds()))
}

const getTimeSinceStart = timeSinceStart => {
  return compose(
    getTimerHours(timeSinceStart),
    getTimerMinutes(timeSinceStart),
    getTimerSeconds(timeSinceStart)
  )(workTimeFormat)
}

const getSecondsFromTime = time => {
  const timeArray = time.split(':').map(num => +num)
  const hours = 0
  const minutes = 1
  const seconds = 2

  return (
    timeArray[hours] * timeConstants.secInHour +
    timeArray[minutes] * timeConstants.secInMin +
    timeArray[seconds]
  )
}
const sortListByFinishDate = (list, isByAsc = true) => {
  return isByAsc
    ? list.sort((a, b) => new Date(a.finishOrderDate) - new Date(b.finishOrderDate))
    : list.sort((a, b) => new Date(b.finishOrderDate) - new Date(a.finishOrderDate))
}

const sortListByCreationDate = (list, isByAsc = true) => {
  return isByAsc
    ? list.sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate))
    : list.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))
}

export {
  toDateTime,
  getTimeSinceStart,
  getSecondsFromTime,
  sortListByFinishDate,
  sortListByCreationDate
}
