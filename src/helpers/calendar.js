import moment from 'moment';

export const currentDays = (currentDate, daysCount, viewTypeName) => {
  const firstDateOfMonth = moment(currentDate).startOf(viewTypeName)
  const firstDayOfGrid = firstDateOfMonth.subtract(firstDateOfMonth.day(), 'days');

  return Array.from(Array(daysCount)).map((_, i) => {
    const date = moment(firstDayOfGrid).add(i, 'days');

    return {
      momentDate: date,
      isVisible: date.isSame(currentDate, viewTypeName),
      isToday: isToday(date),
    }
  });
}

export const isToday = (date) => moment().isSame(moment(date), 'day');