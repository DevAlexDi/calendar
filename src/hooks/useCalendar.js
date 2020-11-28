import { useState, useEffect, useMemo } from "react";
import moment from 'moment';
import { currentDays } from '../helpers/calendar';
import { VIEW_TYPES } from '../constants/calendarSettings';
import DATE_FORMAT from '../constants/date';
import { toQueryString } from '../helpers/toQueryString';

const useCalendarSettings = (settings) => {
  const [timeZone, changeTimeZone] = useState(settings.timeZone)
  const [viewType, changeViewType] = useState(settings.viewType)

  return { timeZone, changeTimeZone, viewType, changeViewType }
}

const useCalendarLogic = (viewType, timeZone, initialDate) => {
  const { daysCount, name } = viewType;

  const [state, setState] = useState({
    currentDate: initialDate,
    currentDays: currentDays(moment().tz(timeZone), daysCount, name),
  });


  const setDefault = (daysCount) => {
    const currentDate = moment().tz(timeZone)

    setQueryParams(currentDate, name)
    setState({
      currentDate,
      currentDays: currentDays(currentDate, daysCount, name),
    })
  }

  const setPrevDate = () => {
    const currentDate = moment(state.currentDate).tz(timeZone).subtract(1, name);

    setQueryParams(currentDate, name)
    setCalendarState(currentDate)
  }

  const setNextDate = () => {
    const currentDate = moment(state.currentDate).tz(timeZone).add(1, name);

    setQueryParams(currentDate, name)
    setCalendarState(currentDate)
  }

  const setQueryParams = (date, viewType) => {
    const queryParamsString = toQueryString({
      viewType,
      currentDate: date.format(DATE_FORMAT)
    })

    window.history.replaceState(null, null, `?${queryParamsString}`)
  }

  const updateCalendar = () => {
    const currentDate = moment(state.currentDate).tz(timeZone);

    setCalendarState(currentDate)
  }

  useEffect(() => {
    setDefault(viewType.daysCount);
  }, [viewType])

  useEffect(function () {
    updateCalendar()
  }, [timeZone])

  const setCalendarState = (currentDate) => {
    setState({
      currentDate,
      currentDays: currentDays(currentDate, daysCount, name)
    })
  }

  return { ...state, setPrevDate, setNextDate, setDefault, updateCalendar }
}


export const UseCalendar = (settings) => {
  const {
    timeZone, changeTimeZone, viewType, changeViewType
  } = useCalendarSettings(settings);

  const currentViewType = useMemo(() => VIEW_TYPES.find((item) => {
    return item.name === viewType;
  }), [viewType]);

  const initialDate = useMemo(() => {
    const isValidDate = moment(settings.date, DATE_FORMAT, true).isValid();

    return isValidDate ? moment(settings.date).tz(timeZone) : moment().tz(timeZone)
  }, [settings.date]);

  const {
    setDefault,
    updateCalendar,
    ...calendarData
  } = useCalendarLogic(currentViewType, timeZone, initialDate);

  return {
    viewType, timeZone, changeTimeZone, changeViewType, ...calendarData,
  }
}