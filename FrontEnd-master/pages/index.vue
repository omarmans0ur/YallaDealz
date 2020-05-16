<template>
  <v-app>
  <div class="text-right mx-3" v-if="getLocale == 'ar'">



      <div class="en-mainPage-content">
        <v-row>
          <v-col cols="6">
            <v-img
              class=""
              :src="pannerImg"
              aspect-ratio="9"

            ></v-img>
          </v-col>
        </v-row>
        <premium />

        <v-row>
          <v-col

            cols="2"
            v-for="(item, i) in categories"
            :key="i"
          >
            <nuxt-link :to="'/category/' + item._id">
              <v-btn text color="red" link>
                <v-img width="20" :src="item.icon"></v-img> </v-btn
            ></nuxt-link>
          </v-col>
        </v-row>
        <trending />
        <topSelling />
        <bestReviews />
        <total />
      </div>
    </div>
    <div class="mx-3" v-if="getLocale == 'en'">
      <div class="en-mainPage-content">
        <v-row>
          <v-col cols="10">
            <v-img :src="pannerImg" aspect-ratio="9"></v-img>
          </v-col>
        </v-row>
        <premium />
        <v-row>
          <v-col

            cols="2"
            v-for="(item, i) in categories"
            :key="i"
          >
            <v-btn text color="red">
              <v-img width="20" :src="item.icon"></v-img>
            </v-btn>
          </v-col>
        </v-row>
        <trending />
        <topSelling />
        <bestReviews />
        <total />
      </div>
      </div>

  </v-app>
</template>

<script>
import total from '~/components/index/total'
import premium from '~/components/index/premium'
import topSelling from '~/components/index/topSelling'
import bestReviews from '~/components/index/bestReviews'
import trending from '~/components/index/trending'
import axios from 'axios'
export default {
  data() {
    return {
      pagesRequired: 10,
      categories: [],
      pannerImg: require('../assets/images/daniel-leone-v7daTKlZzaw-unsplash.jpg')
    }
  },
  components: {
    total,
    premium,
    topSelling,
    trending,
    bestReviews
  },
  async created() {
    await this.$store.dispatch('getAllKindsData')
    await this.$store.dispatch('getAllData')
    await axios.get(process.env.baseUrl + '/api/categories').then(res => {
      this.categories = res.data.data
    })
  },
  computed: {
    getLocale() {
      return this.$store.getters.getLocale
    }
  }
}
</script>
<style >
.right-form {
  margin-left: 100px;
}
</style>
