<template>
          <div class="card__carousel">
          <span class="card__badge">
               <img src="../assets/images/eye.svg"/>
                Show card number
               </span>
            <div class="card" v-bind:class="[status ? 'card--green' : 'card--dim']">

                <div class="card__logo">
                  <img src="../assets/images/cardlogo.svg"/>
                </div>
                <div class="card__name">{{name}}</div>
                <div class="card__no">
                  <span>
                    <q-icon name="circle"></q-icon>
                     <q-icon name="circle"></q-icon>
                     <q-icon name="circle"></q-icon>
                     <q-icon name="circle"></q-icon>&nbsp;
                     <q-icon name="circle"></q-icon>
                     <q-icon name="circle"></q-icon>
                     <q-icon name="circle"></q-icon>
                     <q-icon name="circle"></q-icon>&nbsp;
                     <q-icon name="circle"></q-icon>
                     <q-icon name="circle"></q-icon>
                     <q-icon name="circle"></q-icon>
                     <q-icon name="circle"></q-icon>&nbsp;
                    </span>
                   <span>{{lastfour}} </span>
                </div>
                <div class="card__exp">
                   Thru: {{expiry}} &nbsp;&nbsp;&nbsp;&nbsp;  CVV <span>***</span>
                </div>
                <div class="card__vlogo">
                  <img src="../assets/images/visalogo.svg"/>
                </div>
            </div>

        </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({

  props: ['id', 'name', 'no', 'cvv', 'expiry', 'status'],
  setup (props) {
    const lastfour = computed(() => {
      const str = props.no as string
      return str.slice(12)
    })
    return {
      lastfour
    }
  }
})
</script>
<style lang="scss" scoped>
// cards carousel
  .card__carousel{
    padding-bottom: 20px;
    text-align: end;
  }
  .card__badge{
    z-index: 1;
    background-color: #fff;
    padding: 5px 20px 20px 20px;
    color:#01D167;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    font-size: 12px;
    font-family: 'opensans-sb';
  }
  .card__badge img{
    padding-right:4px;
    vertical-align:text-top;
  }
  .card--green{
          background-color: #01D167;
  }
  .card--dim{
          background-color: #508b6d;
  }
  .card{
      width: 100%;
      border-radius: 12px;
      padding: 20px;
      margin-top: 4px;
      position: relative;
      text-align: left;
      z-index: 2;

      &__logo,&__vlogo{
            display:flex;
            flex-direction: row-reverse;
      }
      &__name{
           font-size: 22px;
           font-family: 'opensans-b';
      }
      &__no{
           font-size: 20px;
           font-family: 'opensans-b';
      }
      &__exp{
           font-size: 14px;
           padding:4px 0;
           font-family: 'opensans-b';
      }
      &__exp span{
           font-size: 22px;
           padding-left: 5px;
           vertical-align: middle;
      }
  }
  .q-icon{
    font-size:10px;
    vertical-align: middle;
  }
</style>
