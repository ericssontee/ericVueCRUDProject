import { getCurrentInstance } from 'vue'

export default {
  setup () {
    const { $feathers } = getCurrentInstance().appContext.config.globalProperties

    if (localStorage.getItem('feathers-jwt') === '' || localStorage.getItem('feathers-jwt') === null) {
      return false
    } else {
      $feathers.authenticate({
        strategy: 'jwt',
        accessToken: localStorage.getItem('feathers-jwt')
      }).then(() => {
        return true
      }).catch(e => {
        console.error('Authentication error', e)
        alert('Credentials has already been expired. Please login again.')
        return false
      })
    }
  }
}
