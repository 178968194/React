import Immutable, { List } from 'immutable'
import _find from 'lodash/collection/find'
import _findIndex from 'lodash/array/findIndex'

export function _findIndexI(array, filter) {
  if (!isImmutable(array)) return _findIndex(array, filter)
  let size = listSize(array)
  for (let i = 0; i < size; i++) {
    if (filter(array.get(i), i)) {
      return i
    }
  }
  return -1
}

export function _findI(array, filter) {
  if (!isImmutable(array)) return _find(array, filter)
  return array.get(_findIndexI(array, filter))
}

export function get(data, key) {
  return !data ? data : (data.get ? data.get(key) : data[key])
}

export function listSize(list) {
  if (!list) return 0
  return Immutable.List.isList(list) ? list.size : (Array.isArray(list) ? list.length : 0)
}

export function keys(obj) {
  if (!obj) return []
  if (obj.keys) {
    let result = []
    for (let key of obj.keys()) {
      result.push(key)
    }
    return result
  } else {
    return Object.keys(obj)
  }
}

export function isImmutable(obj) {
  if (!obj) return false
  return typeof obj.toJS === 'function'
}

/**
 * 根据keyPath更新state值
 * state = {
 *  level1: {
 *    level2: 'level2'
 *  }
 * }
 * 直接更新节点值
 * updateKeyPathData(state, 'level1.level2', 'new_value_level2')
 * 若state不包含keyPath,则创建中间路径
 * updateKeyPathData(state, 'level1.level2.level3.level4', 'value_level4')
 *
 * @param state
 * @param keyPath
 * @param data
 * @returns {*}
 */
export function updateKeyPathData(state, keyPath, data, merge = false, deepMerge = true) {
  let _state = state
  let newState = state
  let keys = keyPath.replace(/@/g, '').split('.').filter((str) => str !== '')
  let _keys = keyPath.split('.').filter((str) => str !== '')

  _keys.forEach((key, index) => {
    if (key.startsWith('@')) {
      let _key = key.substring(1)
      if (_isInteger(_key)) {
        let kp = keys.slice(0, index)
        if (!_state.getIn(kp)) {
          // console.log('create path', kp)
          _state = _state.setIn(kp, Immutable.fromJS([]))
        }
      } else {
        console.log('key中不能包含@')
      }
    }
  })
  try {
    newState = updateData(_state, data, _keys, keys, merge, deepMerge)
  } catch (e) {
    if (e.message === 'invalid keyPath') {
      newState = handleCatch(_state, _keys, keys, data, merge, deepMerge)
    } else {
      console.log('updateKeyPathData fail', e)
    }
    // console.log('updateKeyPathData fail',e)
  }
  return newState
  // console.log('newState:', JSON.stringify((newState)))
}

/**
 * 更新数据
 * @param state
 * @param data
 * @param keys
 * @param merge
 * @param deepMerge
 * @returns {*}
 */
function updateData(state, data, _keys, keys, merge, deepMerge) {
  let newState
  try {
    if (data === null || data === undefined) {
      newState = state.deleteIn(keys)
    } else {
      if (merge) {
        newState = state.updateIn(keys, (value) => {
          // console.log('value:',JSON.stringify(value))
          // value若存在,则merge,否则直接设值
          if (value && value.mergeDeep) {
            return deepMerge ? value.mergeDeep(data) : value.merge(data)
          }
          return Immutable.fromJS(data)
        })
      } else {
        // 直接设值
        newState = state.setIn(keys, Immutable.fromJS(data))
      }
    }
  } catch (e) {
    if (e.message === 'invalid keyPath') {
      newState = handleCatch(state, _keys, keys, data, merge, deepMerge)
    } else {
      console.log('updateKeyPathData fail', e)
    }
  }

  return newState
}

function createData(_state, existPath, isArray) {
  return _state.setIn(existPath, Immutable.fromJS(isArray ? [] : {}))
}

/**
 * 处理invalid keypath
 * @param _state
 * @param _keys
 * @param keys
 * @param data
 * @param merge
 * @param deepMerge
 * @returns {*}
 */
function handleCatch(_state, _keys, keys, data, merge, deepMerge) {
  let newState
  let existPath = []
  for (let i = 0; i < _keys.length; i++) {
    let isArray = _keys[i].startsWith('@')
    // 如果data是个数组，而最后一个路径生成的是对象，merge的时候会有问题，所以要检查data的类型
    if (i === _keys.length - 1) {
      existPath.push(_keys[i])
      if (!_state.getIn(existPath)) {
        _state = createData(_state, existPath, List.isList(data) || Array.isArray(data))
      }
    } else {
      if (isArray && existPath.length > 0) {
        if (!_state.getIn(existPath)) {
          _state = createData(_state, existPath, true)
        }
        existPath.push(_keys[i].replace(/@/g, ''))
        if (!_state.getIn(existPath)) {
          _state = createData(_state, existPath, false)
        }
      } else {
        existPath.push(_keys[i])
        if (!_state.getIn(existPath)) {
          _state = createData(_state, existPath, false)
        }
      }
    }
  }
  newState = updateData(_state, data, _keys, keys, merge, deepMerge)
  return newState
}

/**
 * 从obj中获取keyPath的值
 * 兼容immutable对象与普通对象
 * @param obj
 * @param keyPath ['a','b','c']||'a.b.c'
 * @returns {*}
 */
export function getIn(obj, keyPath) {
  if (!obj) return obj
  let keys
  if (Array.isArray(keyPath)) {
    keys = keyPath
  } else {
    keys = keyPath.split('.').filter((str) => str !== '')
  }
  if (obj.getIn) {
    return obj.getIn(keys)
  } else {
    let finalObj = obj
    for (let k of keys) {
      finalObj = finalObj ? finalObj[k] : undefined
      if (finalObj === undefined) return undefined
    }
    return finalObj
  }
}

export function transform(object) {
  if (!object) return object
  if (object.toJS) {
    return object.toJS()
  }
  return object
}

function _isInteger(str) {
  if (/^\d+$/.test(str)) {
    return true
  } else {
    return false
  }
}

export function getValue(obj, key) {
  return key.split('.').filter(el => {
    return el !== ''
  }).reduce((prev, next) => {
    return prev && prev.get ? prev.get(next) : prev && prev[next] ? prev[next] : undefined
  }, obj)
}

export function fromJS(obj) {
  if (!obj) return obj
  return obj.toJS ? obj : Immutable.fromJS(obj)
}
