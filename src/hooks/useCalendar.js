import { useState, useEffect, useMemo } from "react";
import moment from 'moment';
import { getCurrentDays } from '../helpers/calendar';
import { VIEW_TYPES } from '../constants/calendarSettings';
import DATE_FORMAT from '../constants/date';
import { toQueryString } from '../helpers/toQueryString';

export const UseCalendar = (settings) => {
  const [state, setState] = useState({
    currentDate: settings.date,
    viewType: settings.viewType,
    timeZone: settings.timeZone,
  });

  const changeTimeZone = (timeZone) => setState({
    ...state,
    timeZone
  });

  const changeViewType = (viewType) => setState({
    ...state,
    currentDate: moment(),
    viewType
  });

  const currentViewType = useMemo(() => VIEW_TYPES.find((item) => {
    return item.name === state.viewType;
  }), [state.viewType]);

  const currentDays = useMemo(() => {
    return getCurrentDays(state.currentDate, currentViewType.daysCount, currentViewType.name, state.timeZone);
  }, [state, currentViewType]);

  const setPrevDate = () => setState({
    ...state,
    currentDate: moment(state.currentDate).subtract(1, currentViewType.name)
  });

  const setNextDate = () => setState({
    ...state,
    currentDate: moment(state.currentDate).add(1, currentViewType.name)
  });

  useEffect(() => {
    const queryParamsString = toQueryString({
      viewType: state.viewType,
      currentDate: moment(state.currentDate).format(DATE_FORMAT)
    });
    window.history.replaceState(null, null, `?${queryParamsString}`);
  }, [state.currentDate, state.viewType]);

  return { ...state, currentDays, setPrevDate, setNextDate, changeViewType, changeTimeZone }
}
