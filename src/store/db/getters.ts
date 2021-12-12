import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { DBInterface } from './state'

const getters: GetterTree<DBInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
}

export default getters
