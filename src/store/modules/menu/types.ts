import { SystemList } from '#/interface'

export interface MenuState {
  currentSystemKey: SystemList['key'],
  currentSystem:SystemList | null
}
