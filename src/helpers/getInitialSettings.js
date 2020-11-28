import { DEFAULT_SETTINGS } from '../constants/calendarSettings';
import { getParamFromQueryString } from './toQueryString';

const getInitialSettings = () => {
  const viewType = getParamFromQueryString('viewType');
  const date = getParamFromQueryString('currentDate')

  return {
    ...DEFAULT_SETTINGS,
    ...(!!viewType && { viewType }),
    ...(!!date && { date })
  }
}

export default getInitialSettings