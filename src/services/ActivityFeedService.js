import Api from '@/services/Api'

export default {
  get () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Api().get('activityFeedMockData.json')
          .then(resolve)
          .catch(reject)
      }, 1000)
    })
  }
}
