import { MutationTree } from 'vuex'
import { DBInterface } from './state'
import User from 'src/types/user'

const mutation: MutationTree<DBInterface> = {
  updateUser (state : DBInterface, payload: User) {
    // your code
    state.User = payload
  },
  updateCards (state : DBInterface, payload : DBInterface['Cards']) {
    // your code
    state.Cards = payload
  },
  updateTransactions (state : DBInterface, payload : DBInterface['Transactions']) {
    // your code
    state.Transactions = payload
  }
}

export default mutation
