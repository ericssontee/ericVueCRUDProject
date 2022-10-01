<template>

  <div class="q-pa-md">
    <q-table title="Inventory" :rows="rows" :columns="columns" row-key="id">
      <template v-slot:top-right>
          <q-btn color="secondary">Add Item</q-btn>
      </template>
    </q-table>
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
      id: obj.id,
      item: obj.item,
      brand: obj.brand,
      qty: obj.qty,
      price: obj.price
    }
  })

  items.value = [...item] // Update items array
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
  {
    name: 'brand',
    align: 'left',
    label: 'Brand',
    field: row => row.brand,
    sortable: true
  },
  {
    name: 'qty',
    align: 'left',
    label: 'QTY',
    field: row => row.qty,
    sortable: true
  },
  {
    name: 'price',
    align: 'left',
    label: 'Price',
    field: row => row.price,
    format: val => `${String.fromCharCode(8369) + parseFloat(val).toFixed(2)}`, // 8369 is the ASCII code for Philippine Peso. Function parseFloat will convert string into Float data
    sortable: true
  }
]

const rows = items

</script>
