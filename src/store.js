import Vue from 'vue'
import Vuex from 'vuex'
import ActivityFeedService from '@/services/ActivityFeedService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activityFeed: null
  },
  mutations: {
    setActivityFeed (state, activityFeed) {
      state.activityFeed = activityFeed
    }
  },
  actions: {
    getActivityFeed ({ commit }) {
      return ActivityFeedService.get()
        .then(res => {
          const activityFeed = res.data
          commit('setActivityFeed', activityFeed)
        })
    }
  },
  getters: {}
})
