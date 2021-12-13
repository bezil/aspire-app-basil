<template>
  <q-layout view="lHh Lpr lFf">
    <q-tabs
        v-model="tab"
        dense no-caps narrow-indicator
        align="justify"
        indicator-color="white"
        class="text-primary bottom-nav"
      >

        <q-tab name="home" disable label="Home">
          <img src="../assets/images/icons/Logo.svg"/>
        </q-tab>
         <q-tab name="card" label="Cards">
          <img src="../assets/images/icons/pay.svg"/>
        </q-tab>
        <q-tab name="payment" disable label="Payments">
          <img src="../assets/images/icons/Payments.svg"/>
        </q-tab>
         <q-tab name="credit" disable label="Credit">
          <img src="../assets/images/icons/Credit.svg"/>
        </q-tab>
         <q-tab name="profile" disable label="Profile">
          <img src="../assets/images/icons/Account.svg"/>
        </q-tab>

      </q-tabs>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang='ts'>
import { ref } from 'vue'
import { useStore } from 'src/store'

export default {
  name: 'MainLayout',

  setup () {
    return {
      tab: ref('card')
    }
  },

  mounted () {
    const store = useStore()
    void store.dispatch('db/fetchUser')
    void store.dispatch('db/fetchCards')
    void store.dispatch('db/fetchTransactions')
  }

}
</script>

<style lang="scss">
  .bottom-nav{
    position: fixed;
    z-index: 999;
    bottom:0;
    width:100%;
    background: #fff;
    box-shadow: 0px -3px 6px 0px rgba(0,0,0,0.08);
  -webkit-box-shadow: 0px -3px 6px 0px rgba(0,0,0,0.08);
  -moz-box-shadow: 0px -3px 6px 0px rgba(0,0,0,0.08);
  }
   // Tabs
 .q-tab{
    padding:6px;
    color:#DDDDDD;
    font-size: 9pt;
  }
  .q-tabs__content{
    justify-content: flex-start;
  }

  .q-tab--active{
    font-family: 'opensans-b';
    color: #01D167;
    font-size: 9pt;
  }
  .column{
      flex-direction: column-reverse !important;
  }

</style>
