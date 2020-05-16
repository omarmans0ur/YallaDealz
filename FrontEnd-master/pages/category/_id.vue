<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="4" class="text-center">
          <v-btn text color="red" link>
            <v-img
              width="20"
              :src="
                require('../../assets/images/daniel-leone-v7daTKlZzaw-unsplash.jpg')
              "
            ></v-img>
          </v-btn>
        </v-col>
        <v-col cols="4" class="text-center">
          <v-btn text color="red" link>
            <v-img
              width="20"
              :src="
                require('../../assets/images/daniel-leone-v7daTKlZzaw-unsplash.jpg')
              "
            ></v-img>
          </v-btn>
        </v-col>
        <v-col cols="4" class="text-center">
          <v-btn text color="red" link>
            <v-img
              width="20"
              :src="
                require('../../assets/images/daniel-leone-v7daTKlZzaw-unsplash.jpg')
              "
            ></v-img>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <h1 class="display-1 text-center mt-5">category name</h1>

    <v-container>
      <v-row>
        <v-col cols="4"
          ><v-select
            v-model="color"
            :items="colors"
            label="Sort by"
            color="red"
          ></v-select
        ></v-col> </v-row
    ></v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      color: 'low to high',
      colors: ['low to high', 'high to low']
    }
  }
}
</script>

<style></style>
