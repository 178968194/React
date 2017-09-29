
export default {

  sqlStr() {
    let str = 'and,delete,or,exec,insert,select,union,update,count,*,join,>,<'
    return str
  },

  filterSqlStr(value) {
    let sqlStr = this.sqlStr().split(',')
    for (let i = 0; i < sqlStr.length; i++) {
      if (value.toLowerCase().indexOf(sqlStr[i]) !== -1) {
        break
      } else {
        value = value.replace(sqlStr[i], '')
      }
    }
    return value
  },

  specialStr() {
    let str = '.,/,;,[,],*,(,),>,<,(,),&,^,%,$,#,@,!,~,`/,?'
    return str
  },

  filterSpecial(str) {
    // eslint-disable-next-line quotes
    let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）—|{}【】‘；：”“'。，、？]")
    let rs = ''
    for (let i = 0; i < str.length; i++) {
      rs = rs + str.substr(i, 1).replace(pattern, '')
    }
    return rs
  }

}
