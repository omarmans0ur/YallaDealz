<template>
  <v-app class="mt-10">
    <div class="display-1 ma-5">
      <v-icon size="40" color="yellow darken-2" v-if="getLocale == 'en'"
        >mdi-crown</v-icon
      >
      {{ $t('home.premium') }}
      <v-icon size="40" color="yellow darken-2" v-if="getLocale == 'ar'"
        >mdi-crown</v-icon
      >
    </div>
    <v-alert outlined color="yellow darken-2" elevation="5">
      <v-container>
        <v-row no-gutters>
          <v-col
            class="px-1 pb-2"
            md="3"
            sm="12"
            v-for="(item, i) in getPremiumData"
            :key="i"
          >
            <card
              color="yellow"
              kind="Premium"
              :price="item.prices"
              :rate="item.rate"
              discount="discount-green"
              :imgLink="item.images[0]"
              :id="item._id"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-alert>
  </v-app>
</template>

<script>
import card from '~/components/index/card'
export default {
  components: {
    card
  },
  //get premium data from vuex store
  computed: {
    getPremiumData() {
      return this.$store.getters.getPremiumData
    },
    getLocale() {
      return this.$store.getters.getLocale
    }
  }
}
</script>
<style scoped></style>
