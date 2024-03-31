import { Ref, ref, UnwrapRef, watch } from 'vue'
type CallBack<T> = (newVal: UnwrapRef<T>, oldVal: UnwrapRef<T> | undefined) => void

type Result<T> = [
  /**创建值 */
  Ref<T | UnwrapRef<T>>,
  /**设置值 */
  (val: UnwrapRef<T>) => void,
  /**监听值的依赖 */
  (callback: CallBack<T>) => () => boolean
]
/**
 *
 * @param defaultVal 默认参数
 * @returns [值，修改值，监听值]
 */
export function useRefState<T>(defaultVal: T, deep = false, immediate = false): Result<T> {
  const value = ref<T>(defaultVal)
  function setValue(val: UnwrapRef<T>) {
    value.value = val
  }
  const effectSet = new Set<CallBack<T>>()
  const signEffect = (callback: CallBack<T>) => {
    effectSet.add(callback)
    return () => effectSet.delete(callback)
  }

  watch(
    () => value.value,
    (newVal, oldVal) => {
      effectSet.forEach(fn => fn(newVal, oldVal))
    },
    {
      deep,
      immediate
    }
  )

  return [value, setValue, signEffect]
}
