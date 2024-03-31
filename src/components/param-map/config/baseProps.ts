import { IParamMapProps } from "../type/props"

export const baseProps = {
  /**注册时的参数 */
  loadConfig: {
    type: Object as PropType<IParamMapProps["loadConfig"]>,
    default: () => ({})
  },
  /**注册前调用的函数 */
  initBefore: {
    type: Function as PropType<IParamMapProps["initBefore"]>
  },
  /**注册后调用的函数 */
  initAfter: {
    type: Function as PropType<IParamMapProps["initAfter"]>
  },
  /**地图加载完成后调用的函数 */
  loadAfter: {
    type: Function as PropType<IParamMapProps["loadAfter"]>
  },
  /**初始化出错后的回调 */
  errorAfter: {
    type: Function as PropType<IParamMapProps["errorAfter"]>
  }
}
