<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
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
import { getCurrentInstance, ref } from 'vue'
const { $api } = getCurrentInstance().appContext.config.globalProperties

const users = () => {
  const usersB = ref([])
  $api.get('users')
    .then(response => {
      console.log(response.data)
      fetchUsers.value = response.data
      console.log(fetchUsers.value)
      const usersA = fetchUsers.value.data.map(obj => {
        return {
          name: obj.name,
          email: obj.email
        }
      })
      usersB.value = usersA
      return usersB.value
    })
    .catch(error => {
      console.log(error)
    })
  return usersB.value
}

const fetchUsers = ref([])

console.log(users())

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  }
]

const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  }
]

</script>
