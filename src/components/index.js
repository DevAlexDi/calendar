import { UseCalendar } from '../hooks';
import './index.scss';
import moment from 'moment';
import classnames from 'classnames';
import { VIEW_TYPES, TIME_ZONES } from '../constants/calendarSettings';
import getInitialSettings from '../helpers/getInitialSettings';

function Calendar() {
  const {
    changeTimeZone,
    changeViewType,
    currentDate,
    currentDays,
    setNextDate,
    setPrevDate,
    timeZone,
    viewType,
  } = UseCalendar(getInitialSettings())

  const handleChangeTimeZone = ({ target }) => changeTimeZone(target.value);
  const handleChangeViewType = ({ target }) => changeViewType(target.value);

  return (
    <div className="calendar-wrapper">
      <h1 className="calendar-wrapper__title">Calendar</h1>
      <div className="calendar-actions calendar-wrapper__options">
        <select value={timeZone} onChange={handleChangeTimeZone} className="calendar-actions__item">
          {TIME_ZONES.map((timeZone) => (
            <option key={timeZone.name} value={timeZone.name}>
              {timeZone.name.replace('_', ' ')}
            </option>
          ))}
        </select>
        <select value={viewType} onChange={handleChangeViewType} className="calendar-actions__item">
          {VIEW_TYPES.map((type) => (
            <option key={type.daysCount} value={type.name} >
              {type.name}
            </option>
          ))}
        </select>
      </div>
      <div className="calendar">
        <div className="calendar-controls calendar__controls">
          <button className="calendar-controls__btn" onClick={setPrevDate}>Prev</button>
          {currentDate.format('MMMM YYYY')}
          <button className="calendar-controls__btn" onClick={setNextDate}>Next</button>
        </div>
        <div className="calendar-header calendar__weekdays">
          {moment.weekdaysMin().map((weekday, index) => (
            <div key={index} className="calendar-header__weekday">
              <strong>{weekday}</strong>
            </div>
          ))}
        </div>
        <div className="calendar-body">
          {currentDays.map((date, index) => (
            <div key={index} className="calendar-body__day-wrapper">
              <div className={classnames('calendar-body__day', {
                'calendar-body__day--today': date.isToday,
                'calendar-body__day--visible': date.isVisible,
              })}>
                {date.momentDate.format('DD')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
