<template>
  <v-app>
    <!-- install app if android-->
    <div v-if="$device.isAndroid">
      <v-dialog v-model="androidDialog" width="500">
        <v-card>
          <v-card-title class="headline">Download app</v-card-title>
          <v-card-text>get the app now on google play.</v-card-text>
          <v-card-actions style="height:52px !important">
            <v-spacer></v-spacer>
            <a
              href="https://play.google.com/store/apps/details?id=com.yalladealz.userapp"
              target="_blank"
              style="text-decoration:none"
              @click="androidDialog = false"
            >
              <v-btn color="red darken-1" text>Download the app</v-btn>
            </a>
            <v-btn color="red darken-1" text @click="androidDialog = false"
              >close</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!-- install app if ios-->
    <div v-if="$device.isIos">
      <v-dialog v-model="iosDialog" width="500">
        <v-card>
          <v-card-title class="headline">Download app</v-card-title>
          <v-card-text>get the app now on app store.</v-card-text>
          <v-card-actions style="height:52px !important">
            <v-spacer></v-spacer>
            <a
              href="https://play.google.com/store/apps/details?id=com.yalladealz.userapp"
              target="_blank"
              style="text-decoration:none"
              @click="iosDialog = false"
            >
              <v-btn color="red darken-1" text>Download the app</v-btn>
            </a>
            <v-btn color="red darken-1" text @click="iosDialog = false"
              >close</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!-- navigation drawer -->
    <v-navigation-drawer v-model="nav" absolute>
      <v-list dense nav>
        <nuxt-link to="/profile/1" style="text-decoration:none">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon color="red">mdi-cart</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>My Cart</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </nuxt-link>
        <nuxt-link to="/profile/2" style="text-decoration:none">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon color="red">mdi-heart</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>My Wish List</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </nuxt-link>
        <v-divider></v-divider>
        <nuxt-link to="/login" style="text-decoration:none" v-if="!getUser">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon color="red">mdi-login-variant</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Log in</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </nuxt-link>
        <nuxt-link to="/signup" style="text-decoration:none" v-if="!getUser">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon color="red">mdi-account-multiple-plus</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Sign up</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </nuxt-link>
        <nuxt-link to="/profile/0" style="text-decoration:none" v-if="getUser">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon color="red">mdi-account</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>My Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </nuxt-link>

        <v-list-item @click="logout" link v-if="getUser">
          <v-list-item-icon>
            <v-icon color="red">mdi-logout-variant</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Log out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-btn icon href="https://www.facebook.com/YallaDealzEgypt/"
          ><v-icon color="#3b5999">mdi-facebook</v-icon></v-btn
        >
        <v-btn icon href="https://mobile.twitter.com/yalladealzegypt"
          ><v-icon color="#55acee">mdi-twitter</v-icon></v-btn
        >
        <v-btn icon href="https://www.instagram.com/yalladealzegypt/">
          <v-icon color="#e4405f">mdi-instagram</v-icon>
        </v-btn>
        <v-btn
          icon
          href="https://www.youtube.com/channel/UCuACWTu_kBmDuNuoCsVikjQ"
        >
          <v-icon color="#cd201f">mdi-youtube</v-icon>
        </v-btn>
        <v-divider></v-divider>
        <v-switch
          class="mt-3 mr-3  "
          color="red"
          v-model="switch1"
          :label="`Arabic`"
          v-if="getLocale == 'en'"
          @change="setLocale('ar')"
        ></v-switch>
        <v-switch
          class="mt-3 mr-3"
          color="red"
          v-model="switch2"
          :label="`Arabic`"
          v-if="getLocale == 'ar'"
          @change="setLocale('en')"
        ></v-switch>
      </v-list>
    </v-navigation-drawer>
    <!-- toolbar -->
    <v-card flat height="136px" tile>
      <v-toolbar
        extended
        v-resize="onResize"
        :extension-height="windowSize <= 960 ? 60 : 20"
      >
        <v-icon
          size="30"
          class="pr-3 d-md-none"
          style="cursor:pointer"
          @click="nav = true"
          >mdi-menu</v-icon
        >
        <nuxt-link to="/" class="d-md-none">
          <img src="~/assets/images/logo.png" class="logo"
        /></nuxt-link>

        <template slot="extension">
          <v-text-field
            rounded
            class="ml-12 firstSearch d-md-none"
            hide-details
            prepend-inner-icon="mdi-search-web"
            color="red"
            label="search"
            solo
          ></v-text-field>
          <v-text-field
            rounded
            class="ml-3 secondSearch d-md-none"
            hide-details
            label="location"
            prepend-inner-icon="mdi-map-marker"
            color="red"
            solo
          ></v-text-field>

          <nuxt-link to="/" class="d-md-block d-none">
            <img src="~/assets/images/logo.png" class="logo"
          /></nuxt-link>
          <v-text-field
            rounded
            class="ml-12 firstSearch d-md-block d-none"
            hide-details
            prepend-inner-icon="mdi-search-web"
            color="red"
            label="search"
            solo
          ></v-text-field>
          <v-text-field
            rounded
            class="ml-3 secondSearch d-md-block d-none"
            hide-details
            label="location"
            prepend-inner-icon="mdi-map-marker"
            color="red"
            solo
          ></v-text-field>
          <v-spacer></v-spacer>
          <nuxt-link
            to="/profile/1"
            style="text-decoration:none"
            class="d-md-block d-none"
          >
            <v-btn text color="red" icon class="ml-3"
              ><v-icon size="30">mdi-cart</v-icon>
            </v-btn></nuxt-link
          >
          <nuxt-link
            to="/profile/2"
            style="text-decoration:none"
            class="d-md-block d-none"
          >
            <v-btn text color="red" icon
              ><v-icon size="30">mdi-heart</v-icon></v-btn
            >
          </nuxt-link>
          <v-menu offset-y class="d-md-block d-none">
            <template v-slot:activator="{ on }">
              <v-btn
                color="red"
                icon
                text
                dark
                v-on="on"
                class="d-md-block d-none"
              >
                <v-icon>mdi-bell-ring</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in items" :key="index">
                <nuxt-link :to="item.link" style="text-decoration:none">
                  <v-list-item-title class="pa-2 black--text ringHover">{{
                    item.text
                  }}</v-list-item-title>
                  <v-divider light></v-divider>
                </nuxt-link>
              </v-list-item>
            </v-list>
          </v-menu>
          <nuxt-link
            class="mt-3 d-md-block d-none"
            to="/signup"
            style="text-decoration:none"
            v-if="!getUser"
          >
            <v-btn color="red" dark class="mx-3">Sign up</v-btn>
          </nuxt-link>
          <nuxt-link
            class="mt-3 d-md-block d-none"
            to="/login"
            style="text-decoration:none"
            v-if="!getUser"
          >
            <v-btn color="red" dark class="mx-3">Sign in</v-btn>
          </nuxt-link>
          <nuxt-link
            class="d-md-block d-none"
            to="/profile/0"
            style="text-decoration:none"
            v-if="getUser"
          >
            <v-btn color="red" dark class="mx-3">Profile</v-btn>
          </nuxt-link>

          <v-btn
            color="red"
            dark
            class="mx-3 d-md-block d-none"
            @click="logout"
            v-if="getUser"
            >Log out</v-btn
          >
        </template>
        <v-spacer></v-spacer>

        <v-switch
          class="mt-3 mr-3 d-md-flex d-none "
          color="red"
          v-model="switch1"
          :label="`Arabic`"
          v-if="getLocale == 'en'"
          @change="setLocale('ar')"
        ></v-switch>
        <v-switch
          class="mt-3 mr-3 d-md-flex d-none"
          color="red"
          v-model="switch2"
          :label="`Arabic`"
          v-if="getLocale == 'ar'"
          @change="setLocale('en')"
        ></v-switch>
        <v-btn
          icon
          href="https://www.facebook.com/YallaDealzEgypt/"
          class="d-md-flex d-none"
          ><v-icon color="#3b5999">mdi-facebook</v-icon></v-btn
        >
        <v-btn
          icon
          href="https://mobile.twitter.com/yalladealzegypt"
          class="d-md-flex d-none"
          ><v-icon color="#55acee">mdi-twitter</v-icon></v-btn
        >
        <v-btn
          icon
          href="https://www.instagram.com/yalladealzegypt/"
          class="d-md-flex d-none"
        >
          <v-icon color="#e4405f">mdi-instagram</v-icon>
        </v-btn>
        <v-btn
          icon
          href="https://www.youtube.com/channel/UCuACWTu_kBmDuNuoCsVikjQ"
          class="d-md-flex d-none"
        >
          <v-icon color="#cd201f">mdi-youtube</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
    <v-content>
      <nuxt />
    </v-content>
    <!-- footer -->
    <v-footer dark padless class="mt-10">
      <v-container>
        <v-row>
          <v-col cols="6" class="mar" >
            <p class="display-1 font-weight-light">We accept :</p>
            <v-row >
              <v-col
                :cols="item.method == 'Aman' ? 2 : 3"
                v-for="(item, i) in paymentList"
                :key="i"
              >
                <v-img :src="item.img"></v-img>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="2">
            <v-img
              class="mb-3"
              :src="require('../assets/images/unnamed.png')"
            ></v-img>
            <v-img :src="require('../assets/images/apple.png')"></v-img>
          </v-col>
        </v-row>
        <v-row>
          &copy; 2020 Yalla Dealz, Inc.All Right Reserved .Terms of Use Privacy
          Statement
        </v-row>
      </v-container>
    </v-footer>
    <!-- notifiaction -->
    <v-snackbar v-model="cart" top :timeout="6000">
      {{ cartNotifiaction }}
      <v-btn color="pink" text @click="cart = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-snackbar v-model="wish" top :timeout="cart ? 8000 : 6000">
      {{ wishNotifiaction }}
      <v-btn color="pink" text @click="wish = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      switch1: false,
      switch2: true,
      nav: false,
      windowSize: 0,
      cart: false,
      wish: false,
      cartNotifiaction: '',
      wishNotifiaction: '',
      androidDialog: false,
      iosDialog: false,
      items: [],
      paymentList: [
        { method: 'Visa', img: require('../assets/images/visa.png') },
        { method: 'Fawry', img: require('../assets/images/fawry.png') },
        {
          method: 'Aman',
          img: require('../assets/images/aman.png')
        },
        { method: 'Masary', img: require('../assets/images/masary.png') }
      ]
    }
  },

  async created() {
    this.$getLocation().then(coordinates => {
      console.log(coordinates)
    })
    //google page speed
    axios
      .get(
        'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://yalladealz.com/&key=AIzaSyBBb0pba3vw7x1JXTM_umY012djw0mMpSM'
      )
      .then(res => {})
    // check if Android
    if (this.$device.isAndroid) {
      this.androidDialog = true
    }
    // check if Ios
    if (this.$device.isIos) {
      this.iosDialog = true
    }
    //once created check the locale
    if (localStorage.getItem('locale')) {
      this.$store.commit('SET_LANG', localStorage.getItem('locale'))
      this.$i18n.locale = this.$store.state.locale
    }
    if (!localStorage.getItem('locale')) {
      localStorage.setItem('locale', 'en')
    }

    const session = JSON.parse(localStorage.getItem('session'))
    //once created check token
    //decrypt function
    const crypt = {
      secret: 'CIPHERKEY',

      decrypt: function(cipher) {
        // decrypt() : decrypt the given cipher text

        var decipher = CryptoJS.AES.decrypt(cipher, crypt.secret)
        decipher = decipher.toString(CryptoJS.enc.Utf8)
        return decipher
      }
    }
    if (session) {
      if (session.token) {
        if (session.expiresIn > new Date().getTime()) {
          const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          }
          await axios
            .post(
              process.env.baseUrl + '/api/user/login',
              {
                loginField: crypt.decrypt(session.email),
                password: crypt.decrypt(session.password)
              },
              config
            )
            .then(res => {
              this.$store.dispatch('setUser')
            })
        } else {
          localStorage.setItem('session', JSON.stringify({}))
        }
      }
    }
    //once created check cart and wish list items

    if (this.getUser) {
      await this.$store.dispatch('getWishList')
      await this.$store.dispatch('getCart')

      if ([this.getCart][0].length > 0) {
        this.cart = true
        this.cartNotifiaction = `There is ${
          [this.getCart][0].length
        } deals in cart check it.`
        this.items.push({
          text: `There is ${[this.getCart][0].length} deals in cart check it.`,
          link: '/profile/1'
        })
      }
      if ([this.getWishList][0].length > 0) {
        this.wish = true
        this.wishNotifiaction = `There is ${
          [this.getWishList][0].length
        } deals in wish list check it.`
        this.items.push({
          text: `There is ${
            [this.getWishList][0].length
          } deals in wish list check it.`,
          link: '/profile/2'
        })
      }
    }
  },

  computed: {
    getUser() {
      return this.$store.getters.getUser
    },
    getLocale() {
      return this.$store.getters.getLocale
    },
    getWishList() {
      return this.$store.getters.getWishList
    },
    getCart() {
      return this.$store.getters.getCart
    }
  },
  methods: {
    setLocale(locale) {
      this.$store.commit('SET_LANG', locale)
      localStorage.setItem('locale', locale)
      location.reload()
    },
    logout() {
      this.$store.commit('logout')
      this.$router.push('/login')
    },
    onResize() {
      this.windowSize = window.innerWidth
    }
  },
  mounted() {
    this.onResize()
  }
}
</script>

<style scoped>
.v-card > *:last-child:not(.v-btn):not(.v-chip) {
  height: 125px !important;
}
.ringHover {
  transition: all 0.3s;
}
.ringHover:hover {
  background-color: rgb(232, 232, 232);
}
.mar  {
margin-right:50px ;
}

</style>
