import {
  moduleActionContext,
  rootActionContext,
  moduleGetterContext,
  rootGetterContext,
} from '/Store/index'

/*------------ STATE -------------*/

export type User = {
  id: number
  username: string
  nickname: string
  created?: Date
  privilege: number
  is_active: boolean
  data?: Record<string, unknown>
}


export type userState = {
  user: User
}

export const state: userState = {
  user: null,
}

/*------------ GETTERS -------------*/

export type Getters = {
  isLoggedIn(state: userState): boolean
}

/*------------ MUTATIONS -------------*/

export enum UserMutationTypes {
  LOGIN = 'LOGIN',

}

/* ----------- ACTIONS ---------------*/

export enum UserActionTypes {
  LOGIN = 'LOGIN',
}
