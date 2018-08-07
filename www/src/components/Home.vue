<template>
  <div class="home">
    <div class="row">
      <div class="col d-flex">
        <h1 class="mr-auto">Track
          <strong>
            <em>Me</em>
          </strong>
        </h1>
        <div v-if="user.username">
          <h3>Hello, {{user.username}}</h3>
          <button class="btn btn-outline-success" @click="logout">Logout</button>
        </div>
        <div v-if="!user.username">
          <button class="btn btn-outline-success" data-toggle="modal" data-target="#loginModal">Login</button>
          <button class="btn btn-outline-success" data-toggle="modal" data-target="#registerModal">Register</button>
        </div>
      </div>
    </div>
    <div class="row">
      <shiftForm></shiftForm>
    </div>
    <login></login>
    <register></register>
  </div>
</template>

<script>
  import login from './Login'
  import register from './Register'
  import shiftForm from './ShiftForm'
  export default {
    name: 'Home',
    components: {
      login,
      register,
      shiftForm
    },
    data() {
      return {

      }
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('userLogout')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>