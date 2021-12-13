<template>
  <q-page>
    <div class="scrollcontainer">
      <div class="options">
          <div class="options__btn" @click="onFreeze">
            <img src="../assets/images/freeze.svg"/>
            <div v-if="isFreeze">Freeze<br>Card</div>
            <div v-else>Unfreeze<br>Card</div>
          </div>
          <div class="options__btn">
            <img  src="../assets/images/spend.svg"/>
            <div>Set Spend<br>Limit</div>
          </div>
          <div class="options__btn">
            <img src="../assets/images/gpay.svg"/>
            <div>Add to<br>Gpay</div>
          </div>
          <div class="options__btn">
            <img  src="../assets/images/replace.svg"/>
            <div>Replace<br>Card</div>
          </div>
          <div class="options__btn" @click="onRemove">
            <img  src="../assets/images/deactivate.svg"/>
            <div>Cancel<br>Card</div>
          </div>
      </div>
      <div class="bottomcontainer">
        <ExpansionItem title="Card Details" :disabled="!boolcheck">
        <img src="../assets/images/carddetail.svg">
        </ExpansionItem>

        <ExpansionItem  title="Recent transactions" :disabled="boolcheck">
          <img src="../assets/images/transactions.svg">
        </ExpansionItem>
      </div>
    </div>
     <div class="header">
      <div class="header__topbar">
        <div class="left-col">
          <div class="left-col__heading">
            Account Balance
          </div>
          <div class="left-col__content">
            <div class="greenbadge"> S$ </div>
            <div class="left-col__value"></div>
            {{accbal}}
          </div>
        </div>

        <div class="right-col">
          <div class="right-col__logo">
            <img src="../assets/images/Logo.svg"/>
          </div>
          <div class="right-col__button">
            <img src="../assets/images/box.svg"/>
            <div class="buttontext" @click="add = true" >New Card</div>
            <q-dialog v-model="add" persistent>
              <q-card style="min-width: 350px">
                <div class="popupform">
                  <q-form
                    @reset="onReset"
                    @submit="onSubmit"
                    class="q-gutter-md"
                  >
                    <q-input
                      filled autofocus
                      v-model="newcardname"
                      label="Card name *"
                      hint="Type First Name and Last Name"
                      type="text"
                      error-message="Please type valid name"
                      :error="!isValid"
                      :rules="[ val => val && val.length > 0 || 'Please type name for your card ']"
                    />
                    <div>
                      <q-btn v-if="isValid && newcardname" type="submit" label="Save Card" color="primary" v-close-popup/>
                      <q-btn label="Cancel"  type="reset" v-close-popup color="primary" flat class="q-ml-sm" />
                    </div>
                  </q-form>
                </div>
              </q-card>
            </q-dialog>
          </div>
        </div>
      </div>
      <div class="cards">
        <div class="cards__tab">
            <q-tabs v-model="tab"
            no-caps narrow-indicator
            indicator-color="primary"
            class="text-white"
          >
            <q-tab name="debit" label="My debit cards" />
            <q-tab name="company" label="All company cards" disable />

      </q-tabs>
        </div>

          <q-carousel
              v-model="slide"
              transition-prev="slide-right"
              transition-next="slide-left"
              swipeable animated
              control-color="primary"
              navigation ref="carouselref"
            >
            <q-carousel-slide  v-for="(card, i) in cards" :key="card.id" :name="i+1"  class="column no-wrap">
                <Card :name="card.name" :no="card.no" :cvv="card.cvv" :expiry="card.expiry" :status="card.status" />
            </q-carousel-slide>
    </q-carousel>

      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import ExpansionItem from 'src/components/ExpansionItem.vue'
import Card from 'src/components/Card.vue'
import { useStore } from 'src/store'
import { QCarousel } from 'quasar'
import { JSON_API } from 'src/data/apilink'

export default defineComponent({
  name: 'CardsPage',
  components: {
    Card,
    ExpansionItem
  },

  setup () {
    const store = useStore()
    const newcardname = ref()
    const carouselref = ref<QCarousel>()
    const slide = ref(1)
    const accbal = computed(() => store.state.db.User.balance)
    const cards = computed(() => store.state.db.Cards)
    const isFreeze = computed(() => {
      if (store.state.db.Cards[+slide.value - 1].status) {
        return store.state.db.Cards[+slide.value - 1].status
      } else {
        return false
      }
    })
    return {
      isValid: computed(() => !/[^a-zA-Z ]/.test(newcardname.value)),
      accbal,
      cards,
      isFreeze,
      newcardname,
      carouselref,
      slide,
      tab: ref('debit'),
      add: ref(false),
      boolcheck: ref(false),
      onRemove () {
        const arr = store.state.db.Cards
        void fetch(`${JSON_API}/cards/${arr[+slide.value - 1].id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        carouselref.value?.previous()
        void store.dispatch('db/fetchCards')
      },
      onFreeze () {
        const arr = store.state.db.Cards
        void fetch(`${JSON_API}/cards/${arr[+slide.value - 1].id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            status: !arr[+slide.value - 1].status
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        void store.dispatch('db/fetchCards')
      },
      async onSubmit () {
        const newno = (Math.random() + 1).toString().substring(2, 20)
        const newcvv = (Math.random() + 1).toString().substring(2, 5)
        const expmonth = (Math.floor(Math.random() * (9 - 0)) + 0).toString()
        await fetch(`${JSON_API}/cards`, {
          method: 'POST',
          body: JSON.stringify({

            id: newno,
            name: newcardname.value as string,
            no: newno,
            cvv: newcvv,
            expiry: `0${expmonth}2${expmonth}`,
            status: true

          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        await store.dispatch('db/fetchCards')
        setTimeout(() => {
          carouselref.value?.goTo(store.state.db.Cards.length)
          newcardname.value = ''
        }, 500)
      },
      onReset () {
        newcardname.value = ''
      }
    }
  }
})

</script>
<style lang="scss" scoped>

.header{
  padding: 24px;
  color:#fff;
  height:437px;
  width:100%;
  position: fixed;
  z-index:9;
  top:0;
  background-color: #0C365A;
  & &__topbar{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

}
.scrollcontainer{
  position: relative;
  height:fit-content;
  overflow-y: scroll;
  margin-top:410px;
  z-index: 99;
}
.left-col{
  text-align: left;
  &__heading{
    font-size: 14px;
    font-family: 'opensans-sb';
  }
  &__content{
    font-size: 24px;
    font-family: 'opensans-b';
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &__content .greenbadge{
    font-size: 12px;
    font-family: 'opensans-b';
    padding: 2px 14px;
    background-color: #01D167;
    border-radius: 4px;
    margin-right: 10px;
  }
}
.right-col{
  text-align: right;
  color:#23CEFD;
  font-family: 'opensans-b';
  & &__button{
    display: flex;
    flex-direction: row;
    padding:4px 0;
    cursor: pointer;
    & .buttontext{
      padding-left:4px;
    }
  }
}

// Tabs
 .cards__tab{
   width: 70vw;
 }
  .cards__tab .q-tabs__content{
    flex: 0 0 auto !important;
  }
 .cards__tab .q-tab{

    color:#ffffff80;
    font-size: 9pt;
  }
  .q-tab__indicator{
      background: white;
  }

  .cards__tab .q-tab--active .q-tab__indicator{
      background: #23CEFD !important;
  }
  .cards__tab .q-tab--active{
    font-family: 'opensans-b';
    color: #fff;
    font-size: 9pt;
  }

  .options{
    background-color:#EDF3FF;
    display: flex;
    color:#0C365A;
    line-height: 1.2;
    font-size: 12px;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 20px;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    &__btn{
      display: flex;
      flex-direction: column;
      justify-items: center;
      text-align: center;
      min-width: 60px;
    }
    &__btn img{
      height: 32px;
      margin-bottom: 5px;
    }
  }
  .bottomcontainer{
    padding: 24px;
    min-height:437px;
    background: white;
  }
  .popupform{
    padding: 10px;
  }
</style>
