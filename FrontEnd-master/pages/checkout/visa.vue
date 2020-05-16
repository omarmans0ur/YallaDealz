<template>
  <v-app>
    <paymentMethodComponent
      :dealId="$route.query.dealId"
      :priceId="$route.query.priceId"
      :url="`${process.env.baseUrl}/api/weaccept/payment/credit/checkout`"
      @passData="$event => this.setData($event)"
    />
    <iframe
      name="iframe1"
      :src="this.data.url"
      frameborder="1"
      height="500"
      target="iframe1"
    ></iframe>

    <!-- card appear after submit to show the result -->
    <!-- <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-text>
          form for add data
          <a :href="this.data.url" target="_blank">{{ this.data.url }}</a>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog = false">
            close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </v-app>
</template>
<script>
import paymentMethodComponent from '~/components/checkout/paymentMethod'
export default {
  components: { paymentMethodComponent },
  data() {
    return {
      dialog: false,
      data: {}
    }
  },
  methods: {
    //to set data that come from component
    setData(data) {
      this.$vuetify.goTo(1000)
      this.dialog = data.dialog
      this.data = data.data
    }
  }
}
</script>
