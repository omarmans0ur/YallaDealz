<template>
  <v-app>
    <v-container v-for="(item, i) in deal" :key="i">
      <div style="margin-left:18%" v-if="getLocale == 'en'">
        <p class="display-2 font-weight-light ma-0">{{ name }}</p>
        <p class="body-1 ma-0">Deal Type : {{ item.dealType }}</p>
        <span>{{ totalRates }} Reviews </span>
      </div>
      <div class="text-right" style="margin-right:35%" v-if="getLocale == 'ar'">
        <p class="display-2 font-weight-light ma-0">{{ name }}</p>
        <p class="body-1 ma-0">
          {{ $t('deal.dealType', { msg: item.dealType }) }}
        </p>
        <span>{{ item.totalRates }} Reviews </span>
      </div>
      <v-row>
        <v-col cols="2">
          <v-icon
            size="50"
            color="red"
            @click="playVideo"
            class="d-block mx-auto youtubeBtn"
          >
            mdi-play-circle
          </v-icon>
          <v-img
            height="100"
            width="150"
            v-for="(n, i) in item.images"
            :key="i"
            :src="n"
            class="my-3 mx-auto"
            @click="setImage(n)"
          >
          </v-img>
        </v-col>

        <v-col cols="10" md="6">
          <v-img :src="image" v-if="!video"> </v-img>
          <youtube
            v-if="video"
            :video-id="item.video"
            player-width="650"
            player-height="450"
          ></youtube>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="mx-auto pa-3" outlined elevation="5">
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1 text-center">{{
                  $t('deal.prices')
                }}</v-list-item-title>
                <v-row>
                  <v-col cols="4" class="text-center">
                    <div class="text-center">
                      <v-icon class="myIcon">mdi-clock-outline</v-icon>
                      <p class="text-center body-1 font-weight-thin">
                        {{ $t('deal.endsIn', { msg: expireDay }) }}
                      </p>
                    </div>
                  </v-col>
                  <v-col cols="4" class="text-center">
                    <div class="text-center">
                      <v-icon class="myIcon">{{
                        hotFast[Math.round(Math.random())].icon
                      }}</v-icon>
                      <p class="text-center body-1 font-weight-thin">
                        {{ hotFast[Math.round(Math.random())].text }}
                      </p>
                    </div>
                  </v-col>
                  <v-col cols="4" class="text-center">
                    <v-rating
                      dense
                      half-increments
                      half-icon
                      x-small
                      color="red"
                      readonly
                      background-color="red"
                      :value="rating"
                    >
                    </v-rating>
                    <p class="body-1 font-weight-thin mt-5">
                      {{ item.rate }}
                    </p>
                  </v-col>
                </v-row>

                <v-radio-group v-model="price" mandatory>
                  <div v-for="(n, i) in item.prices" :key="i">
                    <v-radio
                      color="red"
                      :label="n.description"
                      :value="n.finalPrice"
                    >
                    </v-radio>
                    <p>
                      <span class="hide subtitle-2">
                        {{ n.originalPrice }}$</span
                      >
                      {{ n.finalPrice }}$
                      <span class="green--text font-weight-bold">
                        save {{ 100 - (n.finalPrice / n.originalPrice) * 100 }}%
                      </span>
                    </p>
                  </div>
                </v-radio-group>
              </v-list-item-content>
            </v-list-item>

            <nuxt-link to="/checkout" style="text-decoration:none">
              <v-btn color="red" nuxt dark block elevation="1">{{
                $t('deal.buy')
              }}</v-btn>
            </nuxt-link>
            <v-btn
              light
              outlined
              color="red"
              nuxt
              block
              elevation="1"
              class="mt-2"
              ><v-icon size="20" class="mr-2">mdi-gift-outline </v-icon> Give as
              a gift</v-btn
            >

            <v-btn
              light
              outlined
              color="red"
              nuxt
              block
              elevation="1"
              class="mt-2"
              @click="addToWish($route.params.id)"
              ><v-icon size="20" class="mr-2">mdi-heart-outline </v-icon> Add to
              wish cart</v-btn
            >
            <div class="mt-2 text-center">
              <social-sharing :url="url" inline-template>
                <div>
                  <v-btn icon>
                    <network network="facebook">
                      <i
                        class="mdi mdi-facebook mx-3"
                        style="color:#3b5999;font-size:24px;cursor:pointer"
                      ></i>
                    </network>
                  </v-btn>
                  <v-btn icon>
                    <network network="twitter">
                      <i
                        class="mdi mdi-twitter mx-3"
                        style="color:#55acee;font-size:24px;cursor:pointer"
                      ></i>
                    </network>
                  </v-btn>
                </div>
              </social-sharing>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-divider light class="mt-5 mb-3"></v-divider>
      <v-row>
        <v-col md="6" v-if="getLocale == 'en'">
          <p class="display-1">Highlight</p>
          <p>{{ highlight }}</p>
          <p class="display-1">Description</p>
          <p class="body-1 ml-5">{{ description }}</p>
        </v-col>
        <v-col class="text-right" offset="6" md="6" v-if="getLocale == 'ar'">
          <p class="display-1">العناوين الرئيسية</p>
          <p>{{ highlight }}</p>
          <p class="display-1">الوصف</p>
          <p class="body-1 ml-5">{{ description }}</p>
        </v-col>
      </v-row>
      <v-divider light class="mt-5 mb-3"></v-divider>
      <v-row v-if="canReview">
        <v-col md="6">
          <p class="display-1">Reviews</p>
          <p class="body-1 ml-5">{{ item.userReview.comment }}</p>
        </v-col>
      </v-row>
    </v-container>
    <!-- dialog appear if add to wish clicked -->
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-text class="pa-5"> {{ addToWishMsg }} </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog = false" block>
            close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      url: '',
      dialog: false,
      addToWishMsg: '',
      name: '',
      highlight: '',
      description: '',
      deal: [],
      rating: '',
      totalRates: '',
      price: '',
      canReview: '',
      image: '',
      video: false,
      expireDay: '',
      hotFast: [
        {
          text: 'Hot Deal',
          icon: 'mdi-fire'
        },
        {
          text: 'Selling Fast',
          icon: ' mdi-clock-fast '
        }
      ]
    }
  },
  head() {
    return {
      meta: [
        // Twitter Card
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: this.name },
        { name: 'twitter:description', content: this.description },
        // image must be an absolute path
        {
          name: 'twitter:image',
          content: this.url + '/assets/images/logo.png'
        },
        // Facebook OpenGraph
        { property: 'og:title', content: this.name },
        { property: 'og:site_name', content: 'Yalla dealz' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: this.url + '/assets/images/logo.png' },
        { property: 'og:description', content: this.description }
      ]
    }
  },
  jsonld() {
    return {
      '@context': 'http://schema.org',
      '@type': 'Product',
      body: {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: this.rating,
          reviewCount: this.totalRates
        }
      }
    }
  },

  //once created fetch deal data
  async created() {
    this.url = window.location.href

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    //get deal data by the id
    await axios
      .get(`${process.env.baseUrl}/api/deals/${this.$route.params.id}`)
      .then(res => {
        this.deal = [res.data.deal]
        this.totalRates = res.data.deal.totalRates
        this.rating = res.data.deal.rate
        this.canReview = res.data.deal.canReview
        this.image = res.data.deal.images[0]
        if (this.$i18n.locale == 'en') {
          this.name = res.data.deal.name
          this.description = res.data.deal.description
          this.highlight = res.data.deal.highlight
        } else if (this.$i18n.locale == 'ar') {
          this.name = res.data.deal.arName
          this.description = res.data.deal.arDescription
          this.highlight = res.data.deal.arHighlightes
        }
      })
  },
  mounted() {
    if (JSON.parse(localStorage.getItem('ttl'))) {
      if (
        JSON.parse(localStorage.getItem('ttl')).endsIn >
        JSON.parse(localStorage.getItem('ttl')).start
      ) {
        this.endsIn()
        return
      } else {
        const now = new Date()
        localStorage.setItem(
          'ttl',
          JSON.stringify({
            start: now.getTime(),
            endsIn: now.setDate(now.getDate() + 5)
          })
        )
      }
    } else {
      const now = new Date()
      localStorage.setItem(
        'ttl',
        JSON.stringify({
          start: now.getTime(),
          endsIn: now.setDate(now.getDate() + 5)
        })
      )
    }
    this.endsIn()
  },
  computed: {
    getLocale() {
      return this.$store.getters.getLocale
    },
    getUser() {
      return this.$store.getters.getUser
    }
  },
  methods: {
    endsIn() {
      const expire =
        JSON.parse(localStorage.getItem('ttl')).endsIn - new Date().getTime()
      this.expireDay = new Date(expire).getDate()
    },
    setImage(path) {
      this.image = path
      this.video = false
    },
    playVideo() {
      this.video = true
    },
    addToWish(id) {
      const config = {
        headers: {
          authorization: JSON.parse(localStorage.getItem('session')).token
        }
      }
      if (this.getUser) {
        axios
          .post(
            process.env.baseUrl + '/api/user/wishList',
            {
              dealId: id
            },
            config
          )
          .then(res => {
            this.addToWishMsg = res.data.message
            this.dialog = true
          })
          .catch(err => {
            this.addToWishMsg = 'There is error occured'
            this.dialog = true
          })
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>
<style scoped>
.myIcon:hover {
  animation: move 1.5s linear infinite;
}
.myIcon {
  position: relative;
}
@keyframes move {
  0% {
    left: 5px;
  }
  25% {
    left: 0;
  }
  50% {
    left: -5px;
  }
  75% {
    left: 0px;
  }
  100% {
    left: 5px;
  }
}
.youtubeBtn.v-icon.v-icon::after {
  background: none;
}
</style>
