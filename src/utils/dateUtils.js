export default {
  returnTimeString(dateString) {
    if (dateString.length < 19) {
      return ''
    }

    let s = dateString.substring(0, 19).replace('T', ' ').split(' ')
    let s1 = s[0].split('-')
    let s2 = s[1].split(':')
    if (s2.length === 2) {
      s2.push('00')
    }

    let localDate = new Date(s1[0], s1[1] - 1, s1[2], s2[0], s2[1], s2[2])
    let localTime = localDate.getTime()
    let localOffset = 28800000 // 一个时区 8小时的毫秒数
    let utc = localTime + localOffset
    let date = new Date(utc)

    let year = `${date.getFullYear()}`
    let month = `${date.getMonth() + 1}`
    let day = `${date.getDate()}`
    let hour = `${date.getHours()}`
    let minute = `${date.getMinutes()}`
    let seconds = `${date.getSeconds()}`

    month = month.length < 2 ? `0${month}` : month
    day = day.length < 2 ? `0${day}` : day
    hour = hour.length < 2 ? `0${hour}` : hour
    minute = minute.length < 2 ? `0${minute}` : minute
    seconds = seconds.length < 2 ? `0${seconds}` : seconds

    return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`
  },

  returnNoYearString(dateString) { // '01/16 10:00' long => string
    if (dateString === '') {
      return ''
    }
    let date = new Date(dateString)

    let month = `${date.getMonth() + 1}`
    let day = `${date.getDate()}`
    let hour = `${date.getHours()}`
    let minute = `${date.getMinutes()}`

    month = month.length < 2 ? `0${month}` : month
    day = day.length < 2 ? `0${day}` : day
    hour = hour.length < 2 ? `0${hour}` : hour
    minute = minute.length < 2 ? `0${minute}` : minute

    return `${month}/${day} ${hour}:${minute}`
  },

  returnYMDHMS(dateString) { // '01/16 10:00' long => string
    if (dateString === '') {
      return ''
    }
    let date = new Date(dateString)

    let year = `${date.getFullYear()}`
    let month = `${date.getMonth() + 1}`
    let day = `${date.getDate()}`
    let hour = `${date.getHours()}`
    let minute = `${date.getMinutes()}`

    month = month.length < 2 ? `0${month}` : month
    day = day.length < 2 ? `0${day}` : day
    hour = hour.length < 2 ? `0${hour}` : hour
    minute = minute.length < 2 ? `0${minute}` : minute

    return `${year}/${month}/${day} ${hour}:${minute}`
  },

  getTodayZeroTime() {
    let date = new Date()
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    return date.getTime()
  },

  getDateStr(timestamp, type) {
    if (timestamp === null || timestamp === '') {
      return ''
    }
    let date = new Date()
    if (timestamp.length === 10) {
      date.setTime(timestamp * 1000)
    } else {
      date.setTime(timestamp)
    }

    let year = `${date.getFullYear()}`
    let month = `${date.getMonth() + 1}`
    let day = `${date.getDate()}`
    let hour = `${date.getHours()}`
    let minute = `${date.getMinutes()}`
    let seconds = `${date.getSeconds()}`

    month = month.length < 2 ? `0${month}` : month
    day = day.length < 2 ? `0${day}` : day
    hour = hour.length < 2 ? `0${hour}` : hour
    minute = minute.length < 2 ? `0${minute}` : minute
    seconds = seconds.length < 2 ? `0${seconds}` : seconds
    if (type === 'ymd') {
      return `${year}-${month}-${day}`
    } else {
      return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`
    }
  },

  getTimeStamp() {
    let timestamp = Date.parse(new Date())
    timestamp = timestamp / 1000
    return timestamp
  },

  formatTime(second) {
    if (second === null || second === '' || second === 0) {
      return 0
    }
    return [parseInt(second / 60 / 60), parseInt(second / 60) % 60, second % 60].join(':').replace(/\b(\d)\b/g, '0$1')
  },

  returnDifferenceState(dateString) {
    if (typeof dateString !== 'string') return false

    if (dateString.length < 19) return false

    let date = this.returnUTCDate(dateString)

    let utc = date.getTime()
    let currentTime = new Date().getTime()
    let timeDifference = utc - currentTime
    if (timeDifference < 0) {
      return false
    }
    return true
  }
}
