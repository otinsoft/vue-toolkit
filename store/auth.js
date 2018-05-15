import axios from 'axios'
import Cookies from 'js-cookie'

// state
export const state = () => ({
  user: null,
  token: null
})

// getters
export const getters = {
  user: state => state.user,
  token: state => state.token,
  check: state => state.user !== null
}

// mutations
export const mutations = {
  SAVE_TOKEN (state, token) {
    state.token = token
  },

  FETCH_USER_SUCCESS (state, user) {
    state.user = user
  },

  FETCH_USER_FAILURE (state) {
    state.token = null
  },

  LOGOUT (state) {
    state.user = null
    state.token = null
  },

  UPDATE_USER (state, { user }) {
    state.user = user
  }
}

// actions
export const actions = {
  async login ({ commit, dispatch }, form) {
    const { data } = await form.post('/login')

    commit('SAVE_TOKEN', data.token)

    await dispatch('fetchUser')

    rememberToken(data.token, form.remember ? data.expires_in : null)
  },

  async fetchUser ({ commit }) {
    try {
      const { data } = await axios.get('/users/current')

      commit('FETCH_USER_SUCCESS', data)
    } catch (e) {
      commit('FETCH_USER_FAILURE')
      forgetToken()
    }
  },

  async logout ({ commit }, invalidateToken = false) {
    if (invalidateToken) {
      try {
        await axios.post('/logout')
      } catch (e) { }
    }

    commit('LOGOUT')
    forgetToken()
  }
}

export function rememberToken (token, expires = null) {
  Cookies.set('access_token', token, {
    expires: expires ? new Date(Date.now() + expires * 1000) : null
  })
}

export function forgetToken () {
  Cookies.remove('access_token')
}
