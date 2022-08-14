<template>
    <div class="window-height window-width row justify-center items-center">
        <q-card-section class="col-7 ">
            <q-input v-model="nameText" label="Name" />
            <q-input v-model="emailText" type="email" label="Email" />
            <q-input v-model="passText" type="password" label="Password" />
            <q-input v-model="conPassText" type="password" label="Confirm Password" />
            <br />
            <q-btn>Register</q-btn>
            <q-btn :to="'/'">Cancel</q-btn>
        </q-card-section>
    </div>
</template>
