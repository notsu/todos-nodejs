import moment from 'moment-timezone'

moment.locale('th')

/**
 * Set moment to use Asia/Bangkok timezone.
 * @param  {[type]} format [description]
 * @return {[type]}        [description]
 */
const momentTH = format => moment(format).tz('Asia/Bangkok')

export default momentTH
