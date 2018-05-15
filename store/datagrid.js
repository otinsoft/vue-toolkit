import axios from 'axios'

// state
export const state = () => ({

})

// getters
export const getters = {

}

// mutations
export const mutations = {
  FETCH_SUCCESS (state, data) {

  }
}

// actions
export const actions = {
  async fetch ({ commit, state }, { resource }) {
    commit('LOADING', { resource, loading: true })

    await axios.get()

    commit('FETCH_SUCCESS')
  }
}

// const resourceState = () => ({
//   data: [],
//   pagination: null,
//   search: null,
//   order: { column: null, direction: null },
//   filters: { },
//   loading: false,
//   initialized: false
// })

// const initialState = () => {
//   const state = {}

//   Object.keys(endpoints).forEach(resource => {
//     state[resource] = resourceState()
//   })

//   return state
// }

// /**
//  * Initialize store state and getters.
//  */
// function initializeStore () {
//   Object.keys(endpoints).forEach(resource => {
//     const state = resourceState()

//     Object.keys(state).forEach(prop => {
//       getters[`${resource}.${prop}`] = state => state[resource][prop]
//     })

//     getters[`${resource}.page`] = state => {
//       return state[resource].pagination ? state[resource].pagination.current_page : 1
//     }
//   })
// }

// initializeStore()
