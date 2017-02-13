/**
 * Created by Duncan on 8/21/2016.
 */
import Auth0Lock from 'auth0-lock'
import { EventEmitter } from 'events'

export default class AuthService {
  constructor (clientId, domain) {
    this.lock = new Auth0Lock(clientId, domain, {})
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    this.login = this.login.bind(this)
  }

  _doAuthentication (authResult) {
    this.setToken(authResult.idToken)
    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error)
      } else {
        this.setProfile(profile)
      }
    })
  }

  updateProfile() {
    this.lock.getProfile(this.getToken(), (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error)
      } else {
        this.setProfile(profile)
      }
    })
  }
  
  setProfile(profile){
    localStorage.setItem('profile', JSON.stringify(profile))
  }

  getProfile(){
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  login() {
    this.lock.show()
  }

  loggedIn() {
    return !!this.getToken()
  }

  setToken(idToken) {
    localStorage.setItem('id_token', idToken)
  }

  getToken() {
    return localStorage.getItem('id_token')
  }

  logout () {
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
  }
}
