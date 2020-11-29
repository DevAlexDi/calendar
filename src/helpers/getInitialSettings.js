import { DEFAULT_SETTINGS } from '../constants/calendarSettings';
import DATE_FORMAT from '../constants/date';
import { getParamFromQueryString } from './toQueryString';
import moment from 'moment';

const getInitialSettings = () => {
  const viewType = getParamFromQueryString('viewType');
  const dateStr = getParamFromQueryString('currentDate');
  const momentedDate = moment(dateStr, DATE_FORMAT, true);

  return {
    ...DEFAULT_SETTINGS,
    ...(!!viewType && { viewType }),
    date: momentedDate.isValid() ? momentedDate : moment().tz(DEFAULT_SETTINGS.timeZone)
  }
}

export default getInitialSettings