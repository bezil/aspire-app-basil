<template>
    <div class="transaction">
        <div class="transaction__icon">
            <slot/>
        </div>
        <div class="transaction__textbox">
            <div class="text1">{{merchant}}</div>
            <div class="text2">{{time}}</div>
            <div class="status">
                <img src="../assets/images/business-and-finance.svg"/>
                <div v-if="(net === 'refund')" class="status__text">Refund on debit card</div>
                <div v-else class="status__text">Charged to debit card</div>
            </div>
        </div>
        <div class="transaction__amt transaction__type">
            <span class="amtvalue" :class="(net === 'refund')? 'amt--green' : 'amt--black'">
                <span v-if="(net === 'refund')">+</span><span v-else>-</span> S$ 150</span>
            <img src="../assets/images/next.svg"/>
        </div>
    </div>

</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['merchant', 'net', 'time', 'amount', 'img']

})
</script>

<style lang="scss" scoped>
.transaction{
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 10px 0;
    border-bottom: 1px solid #F5F5F5;
    &__icon{
        background: #009DFF1A;
        border-radius: 50%;
        width:40px;
        height:40px;
        display: grid;
        place-items: center;
    }
    & .status{
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-top: 6px;
        img{
            background: #325BAF;
            border-radius: 6px;
            padding: 4px 6px;
        }
        .status__text{
            font-family: 'opensans-sb';
            font-size: 12px;
            color: #325BAF;
            padding: 0 5px;

        }
    }
    &__textbox{
        padding: 0 10px;
        .text1{
            color:#222222;
            font-family: 'opensans-sb';
        }
        .text2{
            color:#AAAAAA;
            font-family: 'opensans-r';
        }
    }
    &__amt{
        text-align: right;
        font-family: 'opensans-b';
        font-size: 14px;
        flex-grow: 1;
        .amtvalue{
            padding: 0 5px;
        }
    }
}
.amt--green{
    color:#01D167;
}
.amt--black{
    color:#222222;
}
</style>
