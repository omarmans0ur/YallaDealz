<template>
  <div>
    <v-container>
      <v-row>
        <v-col md="3" cols="12">
          <v-card tile>
            <v-list flat>
              <v-list-item-group v-model="item">
                <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  color="red"
                  link
                  selectable
                  :to="'/profile/' + item.id"
                >
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
        <v-col md="9" cols="12" v-if="$route.params.id == 0">
          <p class="display-1 text-capitalize ml-5">account details</p>

          <v-card outlined elevation="5">
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1"
                  >First Name :
                  <span class="subtitle-1">{{
                    userData.firstName
                  }}</span></v-list-item-title
                >
                <v-list-item-title class="headline mb-1"
                  >Last Name :
                  <span class="subtitle-1">{{
                    userData.lastName
                  }}</span></v-list-item-title
                >
                <v-list-item-title class="headline mb-1"
                  >Phone Number :
                  <span class="subtitle-1">{{
                    userData.phone
                  }}</span></v-list-item-title
                >
                <v-list-item-title class="headline mb-1"
                  >Email :
                  <span class="subtitle-1">{{
                    userData.email
                  }}</span></v-list-item-title
                >

                <nuxt-link to="/" style="text-decoration:none" class="d-inline">
                  <v-list-item-subtitle class="red--text ml-3 d-inline"
                    ><v-icon size="20" color="red">mdi-fountain-pen-tip</v-icon
                    >edit</v-list-item-subtitle
                  >
                </nuxt-link>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col md="9" cols="12" v-if="$route.params.id == 1">
          <p class="display-1 text-capitalize ml-5">my cart list</p>
          <v-card
            class="my-5"
            elevation="5"
            outlined
            v-for="(item, i) in getCart"
            :key="i"
          >
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">{{
                  item.deal.name
                }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  item.deal.description
                }}</v-list-item-subtitle>
                <v-list-item-subtitle
                  >Quantity : {{ item.quantity }}</v-list-item-subtitle
                >
                <v-list-item-subtitle>
                  <span class="hide"
                    >{{ item.deal.prices[0].originalPrice }}$</span
                  >
                  <span class="subtitle-1"
                    >{{ item.deal.prices[0].finalPrice }}$</span
                  >
                  <span class="title green--text"
                    >save
                    {{
                      100 -
                        (item.deal.prices[0].finalPrice /
                          item.deal.prices[0].originalPrice) *
                          100
                    }}%</span
                  >
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-img
                height="150"
                width="100"
                :src="item.deal.images[0]"
              ></v-img>
            </v-list-item>

            <v-card-actions>
              <v-btn text color="red">Remove</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col md="9" cols="12" v-if="$route.params.id == 2">
          <p class="display-1 text-capitalize ml-5">my Wish list</p>
          <v-card
            elevation="5"
            class="my-5"
            outlined
            v-for="(item, i) in getWishList"
            :key="i"
          >
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">{{
                  item.dealId.name
                }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  item.dealId.description
                }}</v-list-item-subtitle>

                <v-list-item-subtitle>
                  <span class="hide"
                    >{{ item.dealId.prices[0].originalPrice }}$</span
                  >
                  <span class="subtitle-1"
                    >{{ item.dealId.prices[0].finalPrice }}$</span
                  >
                  <span class="title green--text"
                    >save
                    {{
                      100 -
                        (item.dealId.prices[0].finalPrice /
                          item.dealId.prices[0].originalPrice) *
                          100
                    }}%</span
                  >
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-img
                height="150"
                width="100"
                :src="item.dealId.images[0]"
              ></v-img>
            </v-list-item>

            <v-card-actions>
              <v-btn text color="red">Add to cart</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col md="9" cols="12" v-if="$route.params.id == 3">
          <p class="display-1 text-capitalize ml-5">my Cuopons list</p>
          <div v-for="(item, i) in getCuopons" :key="i">
            <v-card elevation="5" class="my-5" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">{{
                    item.name
                  }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    item.description
                  }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-img height="150" width="100" :src="item.images[0]"></v-img>
              </v-list-item>

              <v-card-actions>
                <v-btn text color="red" @click="showCoupons"
                  >Show coupons</v-btn
                >
              </v-card-actions>
            </v-card>
            <v-dialog v-model="dialog">
              <v-card>
                <v-card-title class="headline">Coupons</v-card-title>
                <v-container>
                  <v-row>
                    <v-col cols="6">
                      <p class="title">Active</p>
                      <div v-for="(coupon, index) in item.coupons" :key="index">
                        <div
                          v-if="coupon.status == 'active'"
                          class="subtitle-1"
                        >
                          <div>Security code : {{ coupon.securityCode }}</div>

                          <qrcode
                            ref="coupon"
                            :value="coupon.code"
                            :options="{ width: 200 }"
                          ></qrcode>
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="6"
                      ><p class="title">Redeem</p>
                      <div v-for="(coupon, index) in item.coupons" :key="index">
                        <div
                          v-if="coupon.status == 'redeem'"
                          class="subtitle-1"
                        >
                          <div>Security code : {{ coupon.securityCode }}</div>

                          <qrcode
                            ref="coupon"
                            :value="coupon.code"
                            :options="{ width: 200 }"
                          ></qrcode>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-dialog>
          </div>
        </v-col>
        <v-col md="9" cols="12" v-if="$route.params.id == 4">
          <p class="display-1 text-capitalize ml-5">My points</p>
          <v-card class="pa-5">
            <p class="title font-weight-light">
              you have : <span class="green--text">{{ userData.points }}</span>
            </p>
          </v-card>
        </v-col>
        <v-col md="9" cols="12" v-if="$route.params.id == 5">
          <p class="display-1 text-capitalize ml-5">My wallet</p>
          <v-card class="pa-5">
            <p class="title font-weight-light">
              you have : <span class="green--text">{{ userData.wallet }}</span>
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      dialog: false,
      userData: {},
      item: '',
      items: [
        { text: 'Account', icon: 'mdi-account', id: 0 },
        { text: 'Cart', icon: 'mdi-cart', id: 1 },
        { text: 'Wish list', icon: ' mdi-heart-outline', id: 2 },
        { text: 'Coupons', icon: ' mdi-ticket-account ', id: 3 },
        { text: 'My Wallet', icon: '  mdi-wallet ', id: 4 },
        { text: 'My Points', icon: '  mdi-currency-usd', id: 5 }
      ]
    }
  },
  mounted() {
    this.item = this.$route.params.id
    if (
      this.$route.params.id == 0 ||
      this.$route.params.id == 4 ||
      this.$route.params.id == 5
    ) {
      const config = {
        headers: {
          authorization: JSON.parse(localStorage.getItem('session')).token
        }
      }
      axios.get(process.env.baseUrl + '/api/user/profile', config).then(res => {
        this.userData = res.data.data
      })
    }
    if (this.$route.params.id == 1) {
      this.$store.dispatch('getCart')
    }
    if (this.$route.params.id == 2) {
      this.$store.dispatch('getWishList')
    }
    if (this.$route.params.id == 2) {
      this.$store.dispatch('getCuopons')
    }
  },
  methods: {
    showCoupons() {
      this.dialog = true
    }
  },

  computed: {
    getCart() {
      return this.$store.getters.getCart
    },
    getWishList() {
      return this.$store.getters.getWishList
    },
    getCuopons() {
      return this.$store.getters.getCuopons
    },
    getUser() {
      return this.$store.getters.getUser
    }
  },
  beforeRouteEnter(to, from, next) {
    if ($nuxt.$store.getters.getUser) {
      next()
    } else {
      $nuxt.$router.push('/login')
    }
  }
}
</script>
