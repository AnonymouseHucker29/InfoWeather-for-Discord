const moment = require('moment-timezone');

function timezoneHelper(offsetMinutes) {
    const timezones = moment.tz.names();
    return timezones.filter((zoneName) => moment.tz(zoneName).utcOffset() === offsetMinutes);
}

module.exports = {
    timezoneHelper
}