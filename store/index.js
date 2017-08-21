import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Polyfill for window.fetch()
require('whatwg-fetch')

const store = () => new Vuex.Store({

  state: {
    authUser: null
  },

  mutations: {
    SET_USER: function (state, user) {
      state.authUser = user
    }
  },

  actions: {
    nuxtServerInit ({ commit }, { req }) {
      if (req.session && req.session.authUser) {
        commit('SET_USER', req.session.authUser)
      }
    },

    login ({ commit }, user) {
      return fetch('/api/login', {
        // Send the client cookies to the server
        credentials: 'same-origin',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      }).then((res) => {
        return res.json().then(data => ({
          data: data,
          status: res.status
        }))
      }).then((res) => {
        if (res.status === 401) {
          throw new Error(res.data.message)
        }
        commit('SET_USER', res.data)
      })
    },

    logout ({ commit }) {
      return fetch('/api/logout', {
        // Send the client cookies to the server
        credentials: 'same-origin',
        method: 'POST'
      }).then(() => {
        commit('SET_USER', null)
      })
    }
  }
})

export default store
