import { DEFAULT_SETTINGS } from '../constants/calendarSettings';
import DATE_FORMAT from '../constants/date';

import { getParamFromQueryString } from './toQueryString';
import moment from 'moment';

const getInitialSettings = () => {
  const viewType = getParamFromQueryString('viewType');
  const dateStr = getParamFromQueryString('currentDate');
  const { timeZone } = DEFAULT_SETTINGS;
  const momentedDate = moment(dateStr, DATE_FORMAT, true).tz(timeZone);

  return {
    ...DEFAULT_SETTINGS,
    ...(!!viewType && { viewType }),
    date: momentedDate.isValid() ? momentedDate.tz(timeZone) : moment().tz(timeZone)
  }
}

export default getInitialSettings