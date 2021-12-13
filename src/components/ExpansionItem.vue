<template>
      <div class="accordion">
          <q-expansion-item>
        <template v-slot:header>
          <q-item-section avatar>
            <slot></slot>
          </q-item-section>

          <q-item-section>
            {{ title }}
          </q-item-section>
        </template>

        <q-card>
          <q-card-section v-if="!disabled">
            <div v-for="transaction in transactions" :key="transaction.id">
              <TransactionDetail :merchant="transaction.merchant" :net="transaction.net"
            :time="transaction.time" :amount="transaction.amount">
              <img :src="transaction.img"/>
            </TransactionDetail>
            </div>
          </q-card-section>
          <div class="viewall--btn" v-if="!disabled">
              View all card transactions
          </div>
        </q-card>
      </q-expansion-item>

      </div>

</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import TransactionDetail from 'src/components/TransactionDetail.vue'
import { useStore } from 'src/store'

export default defineComponent({
  components: {
    TransactionDetail
  },
  props: {
    title: {
      required: true,
      type: String
    },
    disabled: {
      required: true,
      type: Boolean
    }
  },
  setup () {
    const store = useStore()
    const transactions = computed(() => store.state.db.Transactions)
    return {
      transactions
    }
  }
})
</script>
<style lang="scss" scoped>

.accordion{
    border:1px solid #F5F5F5;
    background: #FAFCFF;
    border-radius: 8px;
    box-shadow: 0px 0 6px 8px #0000000A;
  -webkit-box-shadow: 0px 0 8px 0px #0000000A;
  -moz-box-shadow: 0px 0 6px 8px #0000000A;
  margin-bottom: 10px;
}
.q-item{
    padding: 16px;
}
.viewall--btn{
  display: grid;
  place-items: center;
  color:#01D167;
  background: #EDFFF5;
  padding: 16px;
  font-family: 'opensans-sb';
}
</style>
