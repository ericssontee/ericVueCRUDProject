<template>
  <div class="q-pa-md">
    <q-table
      title="Users"
      :rows="rows"
      :columns="columns"
      row-key="name"
    />
    <div v-for="name in fetchUsers.data" :key="name.name">
    {{name.email}}
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { api } from 'src/boot/axios'
// const { $api } = getCurrentInstance().appContext.config.globalProperties // axios api

const fetchUsers = ref([]) // fetch data from axios api call
const userNames = ref([]) // fetch name data outside onMounted hook

// axios api call
const dataAsync = async () => {
  await api.get('users')
    .then(response => {
      fetchUsers.value = response.data
    })
    .catch(error => {
      console.log(error)
    })
}

onMounted(async () => {
  await dataAsync()
  console.log('users value after axios call', fetchUsers.value.data)
  const user = fetchUsers.value.data.map(obj => {
    return {
      name: obj.name
    }
  })
  userNames.value = [...user]
})

const rows = userNames

// Returns an empty array

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  }
]

</script>
