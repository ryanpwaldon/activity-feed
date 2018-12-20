<template>
  <div class="base-activity-feed">
    <div class="activity-feed-container">
      <transition name="fade" mode="out-in">
        <BaseError v-if="error" :error="error" key="error"/>
        <transition name="fade" mode="out-in" v-else>
          <BaseLoader v-if="!activities.length" key="loader"/>
          <div class="activities-container" v-else>
            <div class="activity-container" v-for="(activity, index) in activities" :key="index">
              <div class="activity-item">
                <template v-for="(segment, index) in activity">
                  <router-link
                    class="link-item"
                    v-if="segment.template"
                    :to="segment.path"
                    @mouseenter.native="hoveredPath = segment.path"
                    @mouseleave.native="hoveredPath = null"
                    :key="index">
                    {{ segment.content }}
                  </router-link>
                  <span class="text-item" v-else :key="index">{{ segment.content }}</span>
                </template>
              </div>
            </div>
          </div>
        </transition>
      </transition>
    </div>
    <transition name="fade">
      <div v-if="hoveredPath" class="hovered-path-item">{{ hoveredPath }}</div>
    </transition>
  </div>
</template>

<script>
import BaseLoader from '@/components/BaseLoader/BaseLoader'
import BaseError from '@/components/BaseError/BaseError'
import { mapState } from 'vuex'
export default {
  name: 'BaseActivityFeed',
  data () {
    return {
      activities: [],
      hoveredPath: null,
      error: null
    }
  },
  components: {
    BaseLoader,
    BaseError
  },
  mounted () {
    this.getActivityFeed()
  },
  computed: mapState([
    'activityFeed'
  ]),
  methods: {
    getActivityFeed () {
      this.$store.dispatch('getActivityFeed')
        .then(this.extractActivities)
        .catch(error => (this.error = error))
    },
    extractActivities () {
      try {
        const activities = []
        for (const activityFeedItem of this.activityFeed.activity_feed) {
          const task = activityFeedItem.task_id && this.getTaskDetails(activityFeedItem.task_id)
          const profiles = new Map()
          for (const id of activityFeedItem.profile_ids) {
            profiles[id] = this.getProfileDetails(id)
          }
          // separate template into array of expressions and strings -
          // i.e. "{ profiles:2663 } posted a task { task:6470 }" => ["{ profiles:2663 }", " posted a task ", "{ task:6470 }"]
          // we assume that expressions have a consistent format - i.e. { type:id }
          const parsedTemplate = activityFeedItem.template.match(/\{.+?\}|[\S\s]+?(?=\{.+?\})|[\S\s]+/g).map(segment => {
            if (/\{.+?\}/g.test(segment)) { // segment is an expression
              const [type, id] = [...segment.replace(/[{}\s]+?/g, '').split(':')] // extract type, and id from expression
              switch (type) {
                case 'task':
                  return {
                    template: true,
                    content: task.name,
                    path: `/tasks/${task.slug}`
                  }
                case 'profiles':
                  return {
                    template: true,
                    content: profiles[id].name,
                    path: `/users/${profiles[id].slug}`
                  }
                default:
                  throw new Error(`Unrecognised expression type "${type}"`)
              }
            } else { // segment is a string
              return {
                template: false,
                content: segment
              }
            }
          })
          activities.push(parsedTemplate)
        }
        this.activities = activities
      } catch (error) {
        this.error = error
      }
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
  position: relative;
  padding: 70px 0;
}
.activity-feed-container {
  width: 100%;
  height: 100%;
  box-shadow: var(--default-box-shadow);
  position: relative;
  overflow: auto;
}
.base-loader {
  position: absolute;
  top: 0;
  left: 0;
}
.activities-container {
  display: flex;
  flex-direction: column;
}
.activity-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: solid 1px var(--color-light-gray);
  margin: 0 10px;
  padding: 10px 0;
}
.activity-item {
  line-height: 1.5em;
}
.link-item {
  color: var(--color-blue);
  transition: var(--default-transition);
  border-bottom: solid 1px var(--color-transparent);
  text-transform: initial;
  &:hover {
    border-bottom: solid 1px var(--color-blue);
  }
}
.text-item {
  color: var(--color-gray);
  text-transform: uppercase;
  font-size: 0.8em;
  font-weight: bolder;
}
.hovered-path-item {
  padding: 10px;
}
</style>
