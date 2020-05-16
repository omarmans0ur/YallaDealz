<template>
  <div>
    <v-hover>
      <v-card
        max-width="400"
        @click="goTo(id)"
        slot-scope="{ hover }"
        :class="`elevation-${hover ? 12 : 2}`"
      >
        <v-img
          class="white--text align-end"
          height="200px"
          :src="imgLink"
          :aspect-ratio="16 / 9"
        >
        </v-img>

        <v-card-subtitle
          :class="`pb-0 ${color}--text text--darken-2 subtitle-2`"
          >{{ kind }}</v-card-subtitle
        >
        <v-card-subtitle class="pb-0 pt-0">ABCmouse.com</v-card-subtitle>

        <v-card-text class="text--primary">
          <span class="hide title">{{ price[0].originalPrice }}$</span>
          <span class="headline"> {{ price[0].finalPrice }}$ </span>
          <div class="headline green--text">
            save
            {{ 100 - (price[0].finalPrice / price[0].originalPrice) * 100 }}%
          </div>

          <div>Fawzi's international Company</div>
        </v-card-text>

        <v-card-actions class="text-right">
          <nuxt-link
            :to="'/deal/' + id"
            style="text-decoration:none"
            v-if="getLocale == 'en'"
          >
            <v-btn color="red" text>
              {{ $t('card.btn') }}
            </v-btn>
          </nuxt-link>
          <v-divider dark v-if="getLocale == 'en'"></v-divider>
          <nuxt-link to="/profile/1" style="text-decoration:none">
            <v-btn text color="red" icon class="ml-3"
              ><v-icon size="20">mdi-cart</v-icon>
            </v-btn></nuxt-link
          >

          <v-btn text color="red" icon @click="addToWish(id)"
            ><v-icon size="20">mdi-heart</v-icon></v-btn
          >
          <v-divider dark v-if="getLocale == 'ar'"></v-divider>
          <nuxt-link
            :to="'/deal/' + id"
            style="text-decoration:none"
            v-if="getLocale == 'ar'"
          >
            <v-btn color="red" text>
              {{ $t('card.btn') }}
            </v-btn>
          </nuxt-link>
        </v-card-actions>
      </v-card>
    </v-hover>
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
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      dialog: false,
      addToWishMsg: ''
    }
  },
  props: {
    imgLink: String,
    discount: String,
    price: Array,
    rate: Number,
    id: String,
    kind: String,
    color: String
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
    },
    addToCart(id) {
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
    },
    goTo(id) {
      this.$router.push('/deal/' + id)
    }
  }
}
</script>
