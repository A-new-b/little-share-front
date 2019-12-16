<template>
  <v-app id="keep">
    <v-app-bar
      app
      color="blue darken-3"
      dark
    >
      <span class="title ml-3 mr-5">
        文件共享平台
      </span>
      <!--
      <v-text-field
        solo-inverted
        flat
        hide-details
        label="Search"
        prepend-inner-icon="search"
      />
      -->
    </v-app-bar>
    <v-content>
      <Table>
      </Table>
    </v-content>


  </v-app>
</template>

<script>
import Table from '../components/table';

export default {
  props: {
    source: String,
  },
  components: {
    Table,
  },
  data: () => ({}),

};
</script>

<style>
  #keep .v-navigation-drawer__border {
    display: none
  }
</style>
