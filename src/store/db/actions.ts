import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { DBInterface } from './state'
import User from 'src/types/user'
import Card from 'src/types/card'
import Transaction from 'src/types/transaction'
import { JSON_API } from 'src/data/apilink'

const actions: ActionTree<DBInterface, StateInterface> = {
  fetchUser (/* context */{ commit }) {
    // your code
    void fetch(`${JSON_API}/userdetail`)
      .then(res => res.json())
      .then(data => {
        const d = data as User
        commit('updateUser', d)
      })
  },
  fetchCards (/* context */{ commit }) {
    // your code
    void fetch(`${JSON_API}/cards`)
      .then(res => res.json())
      .then(data => {
        const d = data as Card[]
        commit('updateCards', d)
      })
  },
  fetchTransactions (/* context */{ commit }) {
    // your code
    void fetch(`${JSON_API}/transactions`)
      .then(res => res.json())
      .then(data => {
        const d = data as Transaction[]
        commit('updateTransactions', d)
      })
  }
}

export default actions
