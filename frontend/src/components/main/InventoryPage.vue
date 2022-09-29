<template>
  <div class="column items-end">
    <q-btn color="secondary" >Add Item</q-btn>
  </div>
  <div>
    <div class="q-pa-md">
    <q-table
      title="Inventory"
      :rows="rows"
      :columns="columns"
      row-key="id"
    />
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { api } from 'src/boot/axios'

const fetchItems = ref([])
const items = ref([])

const getItems = async () => {
  // axios api get Users
  const dataAsync = async () => {
    await api.get('inventory-crudsql')
      .then(response => {
        fetchItems.value = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }

  await dataAsync() // Call dataAsync Function

  const item = fetchItems.value.data.map(obj => {
    return {
      id: obj._id,
      item: obj.item,
      brand: obj.brand,
      qty: obj.qty
    }
  })

  items.value = [...item] // Update users array
}

getItems()

const columns = [
  {
    name: 'item',
    required: true,
    label: 'Item',
    align: 'left',
    field: row => row.item,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'brand', align: 'left', label: 'Brand', field: row => row.brand, sortable: true },
  { name: 'qty', align: 'left', label: 'QTY', field: row => row.qty, sortable: true }
]

const rows = items

</script>
