<template>
  <div class="en-checkoutPage">
    <div class="en-checkoutPage-content">
      <div class="en-checkoutPage-content-title">
        CHECKOUT WIZARD
      </div>
      <div class="en-checkoutPage-content-main">
        <div class="en-checkoutPage-content-main-left">
          <mainForms />
        </div>
        <div class="en-checkoutPage-content-main-right">
          <checkoutItems />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mainForms from '~/components/checkout/mainForms.vue'
import checkoutItems from '~/components/checkout/checkoutItems.vue'
export default {
  components: {
    mainForms,
    checkoutItems
  }
}
</script>
<style lang="scss" scoped>
.en-checkoutPage {
  display: flex;
  flex-flow: row;
  justify-content: center;
  &-content {
    width: 75%;
    display: flex;
    flex-flow: column;
    &-title {
      margin-top: 100px;
      font-size: 30px;
      text-align: center;
    }
    &-main {
      margin-top: 50px;
      display: flex;
      flex-flow: row;
      justify-content: space-around;
      &-left {
        width: 50%;
      }
      &-right {
        width: 40%;
        margin-top: 80px;
        padding-left: 40px;
        // background-color: blue;
      }
    }
  }
}
</style>
