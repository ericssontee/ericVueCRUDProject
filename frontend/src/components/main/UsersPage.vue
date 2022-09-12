<template>
  <div class="q-pa-md">
    <q-table title="Users" :rows="rows" :columns="columns" row-key="id">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn dense round flat color="grey" icon="edit" @click="openEditUserCard(props.row, 'id')"></q-btn>
          <q-btn dense round flat color="grey" icon="delete" @click="deleteUser(props.row, 'id')"></q-btn>
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="isEditCardOpen" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Edit User</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div>Email:</div>
          <q-input outlined v-model="editEmailTextBox" autofocus @keyup.enter="prompt = false" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div>Name:</div>
          <q-input outlined v-model="editNameTextBox" autofocus @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat @click="saveEditUserCard(tempEditId, editEmailTextBox, editNameTextBox)" label="Save" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { api } from 'src/boot/axios'
// const { $api } = getCurrentInstance().appContext.config.globalProperties // axios api ===> getCurrentInstance() is not recommended to be use for external functions as it is only for internal vue functions

const fetchUsers = ref([]) // fetch data from axios api call
const users = ref([]) // fetch name data outside onMounted hook

const isEditCardOpen = ref(false)
const editEmailTextBox = ref('')
const editNameTextBox = ref('')
const tempEditId = ref('')
const tempEditEmail = ref('')
const tempEditName = ref('')

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

const openEditUserCard = (props) => {
  console.log(`Edit ID: ${props.id}`)
  isEditCardOpen.value = true
  tempEditId.value = props.id
  tempEditEmail.value = props.email
  tempEditName.value = props.name
  editEmailTextBox.value = props.email
  editNameTextBox.value = props.name
}

const saveEditUserCard = (id, email, name) => {
  const emailToBeSave = email
  const nameToBeSave = name

  console.log(`${emailToBeSave} and ${tempEditEmail.value}`)
  console.log(`${nameToBeSave} and ${tempEditName.value}`)

  if (emailToBeSave === tempEditEmail.value && nameToBeSave === tempEditName.value) {
    alert('No Changes Made.')
    isEditCardOpen.value = true
  } else if (emailToBeSave !== tempEditEmail.value) {
    api.put(`users/${id}`, {
      email: emailToBeSave,
      name: tempEditName.value
    }).then(() => {
      alert('User is successfully updated.')
      getUsers()
      isEditCardOpen.value = false
    }).catch(error => {
      console.log(error)
    })
  } else if (nameToBeSave !== tempEditName.value) {
    api.put(`users/${id}`, {
      email: tempEditEmail.value,
      name: nameToBeSave
    }).then(() => {
      alert('User is successfully updated.')
      getUsers()
      isEditCardOpen.value = false
    }).catch(error => {
      console.log(error)
    })
  } else {
    api.put(`users/${id}`, {
      email: emailToBeSave,
      name: nameToBeSave
    }).then(() => {
      alert('User is successfully updated.')
      getUsers()
      isEditCardOpen.value = false
    }).catch(error => {
      console.log(error)
    })
  }
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

const rows = users

</script>
