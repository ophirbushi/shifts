import { StateService } from './shared/state.service'

export const appInit = (state: StateService) => {
    return () => state.init()
}
