<template>
  <q-layout>

    <q-drawer
    :show-if-above="true"
    v-model="leftDrawerOpen"
    side="left"
    elevated
    class="column justify-center colorDrawer"
    behavior="desktop"
    bordered
    >
      <div class="column">
        <q-btn :to="{ path: '/inventory' }">Inventory</q-btn>
        <q-btn :to="{ path: '/users' }">Users</q-btn>
        <q-btn :to="{ path: '/settings' }">Settings</q-btn>
      </div>
    </q-drawer>

    <q-page-container>
      <q-page style="padding-top: 1px">
        <router-view />
      </q-page>
    </q-page-container>

  </q-layout>

</template>

<style>
.colorDrawer {
  background-color: cornflowerblue;
}
</style>

<script setup>
import { ref } from 'vue'

const leftDrawerOpen = ref(false)

</script>
