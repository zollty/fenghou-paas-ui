import { IinitParams } from "./config"

export interface IParamMapProps {
  loadConfig?: IinitParams
  initBefore?: () => any
  initAfter?: (map: any, AMap: any) => any
  loadAfter?: (map: any, AMap: any) => any
  errorAfter?: (err:any) => any
}
