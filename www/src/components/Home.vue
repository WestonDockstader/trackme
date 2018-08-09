<template>
  <div class="home">
    <div class="row">
      <div class="col title-col d-flex">
        <h1 class="mr-auto ml-3">Track
          <strong>
            <em>Me</em>
          </strong>
        </h1>
        <div v-if="user.username" class="d-flex flex-wrap align-self-center mr-3">
          <h3 class="mr-3">Hello, {{user.username}}</h3>
          <button class="btn btn-outline-success" @click="logout">Logout</button>
        </div>
        <div v-if="!user.username" class="align-self-center mr-3">
          <button class="btn btn-outline-success" data-toggle="modal" data-target="#loginModal">Login</button>
          <button class="btn btn-outline-success" data-toggle="modal" data-target="#registerModal">Register</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button v-if="user.username" @click="toggle">Add Shift</button>
        <shiftForm v-if="show"></shiftForm>
      </div>
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
        show: false
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
      },
      toggle() {
        this.show = this.show ? false : true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title-col {
    background-color: rgb(59, 88, 182);
    color: white;
    max-height: 4rem;
  }
</style>