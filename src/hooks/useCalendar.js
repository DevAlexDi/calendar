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

  const currentDateMoment = useMemo(
    () => moment(currentDate).tz(timeZone),
    [currentDate, timeZone]
  );

  const currentDays = useMemo(() => {
    return getCurrentDays(currentDate, viewType.daysCount, viewType.name);
  }, [currentDate, viewType]);

  const setPrevDate = () => setCurrentDate(currentDateMoment.subtract(1, viewType.name));

  const setNextDate = () => setCurrentDate(currentDateMoment.add(1, viewType.name));

  const updateCalendar = () => {
    const currentDate = currentDateMoment;

    setCurrentDate(currentDate);
  }

  useEffect(() => {
    const queryParamsString = toQueryString({
      viewType: viewType.name,
      currentDate: moment(currentDate.format()).format(DATE_FORMAT)
    });
    window.history.replaceState(null, null, `?${queryParamsString}`);
  }, [currentDate, viewType.name]);



  useEffect(() => {
    setCurrentDate(moment().tz(timeZone));
  }, [viewType]);

  useEffect(function () {
    updateCalendar()
  }, [timeZone]);

  return { currentDate, currentDays, setPrevDate, setNextDate, updateCalendar }
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
