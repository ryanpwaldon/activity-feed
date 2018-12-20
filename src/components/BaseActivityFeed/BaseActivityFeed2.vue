<template>
  <div class="base-activity-feed">
    <transition name="fade" mode="out-in">
      <BaseLoader v-if="!activities.length" key="loader"/>
      <div class="activities-container" v-else>
        <div class="activity-container" v-for="(activity, index) in activities" :key="index">
          <div class="activity-item" v-html="activity"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import BaseLoader from '@/components/BaseLoader/BaseLoader'
import { mapState } from 'vuex'
export default {
  name: 'BaseActivityFeed',
  data () {
    return {
      activities: []
    }
  },
  components: {
    BaseLoader
  },
  mounted () {
    this.getActivityFeed()
  },
  computed: mapState([
    'activityFeed'
  ]),
  methods: {
    getActivityFeed () {
      this.$store.dispatch('getActivityFeed').then(this.processActivityFeed)
    },
    processActivityFeed () {
      const activities = []
      for (const activityFeedItem of this.activityFeed.activity_feed) {
        const task = activityFeedItem.task_id && this.getTaskDetails(activityFeedItem.task_id)
        const profiles = new Map()
        for (const profileId of activityFeedItem.profile_ids) {
          profiles[profileId] = this.getProfileDetails(profileId)
        }
        const compiledTemplate = activityFeedItem.template.replace(/\{(.+?)\}/g, match => {
          const [type, id] = [...match.replace(/[{}\s]+?/g, '').split(':')]
          switch (type) {
            case 'task': return `<a class="link-item" href="/tasks/${task.slug}">${task.name}</a>`
            case 'profiles': return `<a class="link-item" href="/users/${profiles[id].slug}">${profiles[id].name}</a>`
            default: throw new Error('Unrecognised expression type.')
          }
        })
        activities.push(compiledTemplate)
      }
      this.activities = activities
    },
    getProfileDetails (profileId) {
      const profile = this.activityFeed.profiles.find(profile => profile.id === profileId)
      return {
        name: profile.abbreviated_name,
        slug: profile.slug
      }
    },
    getTaskDetails (taskId) {
      const task = this.activityFeed.tasks.find(task => task.id === taskId)
      return {
        name: task.name,
        slug: task.slug
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-activity-feed {
  width: 100%;
  height: 100%;
  box-shadow: var(--default-box-shadow);
  position: relative;
}
.base-loader {
  position: absolute;
  top: 0;
  left: 0;
}
.activities-container {
  display: flex;
  flex-direction: column;
  padding: 0 10px;
}
.activity-container {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: solid 1px var(--color-light-gray);
  color: var(--color-gray);
  text-transform: uppercase;
}
/deep/ {
  .link-item {
    color: var(--color-blue);
    transition: var(--default-transition);
    border-bottom: solid 1px var(--color-transparent);
    text-transform: initial;
    &:hover {
      border-bottom: solid 1px var(--color-blue);
    }
  }
}
</style>
