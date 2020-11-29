import { useState, useEffect, useMemo } from "react";
import moment from 'moment';
import { getCurrentDays } from '../helpers/calendar';
import { VIEW_TYPES } from '../constants/calendarSettings';
import DATE_FORMAT from '../constants/date';
import { toQueryString } from '../helpers/toQueryString';

const useCalendarSettings = (settings) => {
  const [timeZone, changeTimeZone] = useState(settings.timeZone)
  const [viewType, changeViewType] = useState(settings.viewType)

  return { timeZone, changeTimeZone, viewType, changeViewType }
}

const useCalendarLogic = (viewType, timeZone, initialDate) => {
  const [currentDate, setCurrentDate] = useState(initialDate);

  const currentDays = useMemo(() => {
    return getCurrentDays(currentDate, viewType.daysCount, viewType.name, timeZone);
  }, [currentDate, viewType, timeZone]);

  const setPrevDate = () => setCurrentDate(moment(currentDate).subtract(1, viewType.name));

  const setNextDate = () => setCurrentDate(moment(currentDate).add(1, viewType.name));

  useEffect(() => {
    const queryParamsString = toQueryString({
      viewType: viewType.name,
      currentDate: moment(currentDate.format()).format(DATE_FORMAT)
    });
    window.history.replaceState(null, null, `?${queryParamsString}`);
  }, [currentDate, viewType.name]);

  useEffect(() => {
    setCurrentDate(moment());
  }, [viewType]);

  useEffect(function () {
    setCurrentDate(moment(currentDate));
  }, [timeZone]);

  return { currentDate, currentDays, setPrevDate, setNextDate, setCurrentDate }
}


export const UseCalendar = (settings) => {
  const {
    timeZone, changeTimeZone, viewType, changeViewType
  } = useCalendarSettings(settings);

  const currentViewType = useMemo(() => VIEW_TYPES.find((item) => {
    return item.name === viewType;
  }), [viewType]);

  const {
    setDefault,
    updateCalendar,
    ...calendarData
  } = useCalendarLogic(currentViewType, timeZone, settings.date);

  return {
    viewType, timeZone, changeTimeZone, changeViewType, ...calendarData,
  }
}
