<template>
  <div class="q-pa-md">
    <q-table title="Users" :rows="rows" :columns="columns" row-key="id">
      <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn dense round flat color="grey" icon="edit" @click="editUser(props.row, 'id')"></q-btn>
              <q-btn dense round flat color="grey" icon="delete" @click="deleteUser(props.row, 'id')"></q-btn>
            </q-td>
          </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { api } from 'src/boot/axios'
// const { $api } = getCurrentInstance().appContext.config.globalProperties // axios api ===> getCurrentInstance() is not recommended to be use for external functions as it is only for internal vue functions

const fetchUsers = ref([]) // fetch data from axios api call
const users = ref([]) // fetch name data outside onMounted hook

const getUsers = async () => {
  // axios api get Users
  const dataAsync = async () => {
    await api.get('users')
      .then(response => {
        fetchUsers.value = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }

  await dataAsync() // Call dataAsync Function

  const user = fetchUsers.value.data.map(obj => {
    return {
      id: obj._id,
      name: obj.name,
      email: obj.email
    }
  })

  users.value = [...user] // Update users array
}

getUsers()

const rows = users

const editUser = (props) => {
  console.log(`Edit ID: ${props.id}`)
}

const deleteUser = (props) => {
  if (confirm(`Do you want to remove the profile of ${props.id}?`)) {
    console.log(`Delete ID: ${props.id}`)
    api.delete(`users/${props.id}`)
      .then(reponse => {
        console.log('User has been deleted.')
        getUsers() // Update users table
      }).catch(error => {
        console.log(error)
      })
  }
}

const columns = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: row => row.id,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'email',
    required: true,
    label: 'Email',
    align: 'left',
    field: row => row.email,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'actions',
    label: 'Action'
  }
]

</script>
