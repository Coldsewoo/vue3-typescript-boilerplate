import { defineModule } from 'direct-vuex'
import { moduleActionContext, moduleGetterContext } from '/Store/index'
import { state, UserMutationTypes, UserActionTypes } from './userTypes'
import type { userState, Getters, User, ProjectListType } from './userTypes'
import ApiService from '/Services/api'

import { parseProjectList } from '/Utils/DataParser'

const userStore = defineModule({
  namespaced: true,
  state: (): userState => {
    return state
  },
  getters: {
    isLoggedIn(...args): boolean {
      const { state } = userGetterContext(args)
      return !!state.user
    },
  },
  mutations: {
    [UserMutationTypes.LOGIN](
      state: userState,
      payload: User & { accessToken: string }
    ) {
      state.user = payload
    },
  },
  actions: {
    async [UserActionTypes.LOGIN](context, payload) {
      const { commit } = userActionContext(context)
      try {
        const userLoginRes = await ApiService.LOGIN(payload)
        const userLoginData = userLoginRes.data
        if (userLoginData.success) {
          commit.SET_USER(userLoginData.body.data)
        } else {
          // TODO: SET ERROR (Auth failed)
        }
      } catch (err) {
        // TODO: SET ERROR (Internal)
      }
    },
  },
})

export default userStore
const userGetterContext = (args: [any, any, any, any]) =>
  moduleGetterContext(args, userStore)
const userActionContext = (context: any) =>
  moduleActionContext(context, userStore)
