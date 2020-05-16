<template>
  <div class="d-flex align-center justify-center">
    <div>
      <v-card class="pa-5" width="500" elevation="5">
        <v-form ref="form" v-model="valid">
          <v-text-field
            prepend-icon="mdi-mail"
            color="red"
            v-model="email"
            :rules="emailRules"
            label="E-mail / Phone number"
            required
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-key"
            color="red"
            v-model="password"
            :rules="passwordRules"
            label="password"
            type="password"
            required
          ></v-text-field>
          <p
            class="blue--text caption"
            style="cursor:pointer"
            @click="forgetPassword"
          >
            Forget password
          </p>
          <v-dialog v-model="dialog" max-width="290">
            <v-card>
              <v-card-text class="pa-10" v-if="!message">
                Enter your phone number
              </v-card-text>
              <v-form
                ref="formTwo"
                class="pa-12"
                v-model="vaildTwo"
                v-if="!message"
              >
                <v-text-field
                  color="red"
                  v-model="phone"
                  :rules="phoneRules"
                  label="Phone"
                  required
                ></v-text-field>
                <v-btn
                  :disabled="!vaildTwo"
                  color="red darken-4"
                  class="mr-4 white--text"
                  @click="validateTwo"
                >
                  continue
                </v-btn>
              </v-form>
              <v-card-text class="pa-10" v-if="message">
                {{ message }}
              </v-card-text>
              <v-btn
                v-if="message"
                color="red darken-4"
                class="mr-4 white--text"
                block
                tile
                @click="dialog = false"
              >
                close
              </v-btn>
            </v-card>
          </v-dialog>

          <v-btn
            :disabled="!valid"
            color="red darken-4"
            class="mr-4 white--text"
            @click="validate"
          >
            Log in
          </v-btn>

          <v-btn
            color="yellow darken-2"
            class="mr-4 white--text"
            @click="reset"
          >
            Reset Form
          </v-btn>
        </v-form>
        <v-dialog v-model="errDialog" max-width="290">
          <v-card>
            <v-card-text class="pa-10">
              {{ errMessage }}
            </v-card-text>
            <v-btn
              color="red darken-4"
              class="mr-4 white--text"
              block
              tile
              @click="errDialog = false"
            >
              close
            </v-btn>
          </v-card>
        </v-dialog>
      </v-card>
      <div class="mt-10 text-center">
        <v-btn
          color="red darken-4"
          class="mr-4 white--text"
          @click="loginGoogle"
        >
          <v-icon class="mr-3">mdi-google</v-icon> Google
        </v-btn>
        <v-btn
          color="blue darken-2"
          class="mr-4 white--text"
          @click="loginFacebook"
        >
          <v-icon class="mr-3">mdi-facebook</v-icon> Facebook
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    dialog: false,
    valid: true,
    vaildTwo: true,
    message: '',
    phone: '',
    password: '',
    email: '',
    errMessage: '',
    errDialog: false,
    windowSize: 0,
    //validate form
    passwordRules: [v => !!v || 'Password is required'],
    phoneRules: [v => !!v || 'Phone number is required'],
    emailRules: [v => !!v || 'E-mail or phone number is required']
  }),

  methods: {
    loginGoogle() {
      this.$auth.loginWith('google')
    },
    loginFacebook() {
      this.$auth.loginWith('facebook')
    },
    validate() {
      if (this.$refs.form.validate()) {
        // encrypt function
        const crypt = {
          secret: 'CIPHERKEY',
          encrypt: function(clear) {
            // encrypt() : encrypt the given clear text

            var cipher = CryptoJS.AES.encrypt(clear, crypt.secret)
            cipher = cipher.toString()
            return cipher
          }
        }

        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        axios
          .post(
            process.env.baseUrl + '/api/user/login',
            {
              loginField: this.email,
              password: this.password
            },
            config
          )
          .then(res => {
            let date = new Date().getTime()
            localStorage.setItem(
              'session',
              JSON.stringify({
                token: res.data.token,
                expiresIn: date + 60 * 60 * 60 * 60,
                email: crypt.encrypt(this.email),
                password: crypt.encrypt(this.password)
              })
            )
            this.$store.dispatch('setUser')
            this.$router.push('/')
          })
          .catch(() => {
            this.errMessage = 'Email or password is incorrect.'
            this.errDialog = true
          })
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    forgetPassword() {
      this.dialog = true
    },
    //validate dialog form
    validateTwo() {
      if (this.$refs.formTwo.validate()) {
        axios
          .post(process.env.baseUrl + '/api/user/forgotPassword', {
            phone: this.phone
          })
          .then(res => {
            this.message = res.data.message
          })
      }
    }
  }
}
</script>
