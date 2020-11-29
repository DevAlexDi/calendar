import moment from 'moment';

export const getCurrentDays = (currentDate, daysCount, viewTypeName, timeZone) => {
  const firstDateOfMonth = moment(currentDate).tz(timeZone).startOf(viewTypeName)
  const firstDayOfGrid = firstDateOfMonth.subtract(firstDateOfMonth.day(), 'days');

  return Array.from(Array(daysCount)).map((_, i) => {
    const date = moment(firstDayOfGrid).tz(timeZone).add(i, 'days');

    return {
      momentDate: date,
      isVisible: date.isSame(currentDate, viewTypeName),
      isToday: isToday(date, timeZone),
    }
  });
}

export const isToday = (date, timeZone) => {
  return moment(date).tz(timeZone).isSame(moment().tz(timeZone), 'day')
};