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
      <div v-if="user.username" class="col">
        <button class="btn btn-outline-success" data-toggle="modal" data-target="#createShiftModal">Add Shift</button>
        <button class="btn btn-outline-success" data-toggle="modal" data-target="#createPayPeriodModal">Create Pay Period</button>
      </div>
    </div>
    <login></login>
    <register></register>
    <shiftForm></shiftForm>
    <period></period>
    <!-- Payperiod table -->
    <div class="row">
      <div class="col paytable">
        <div v-if="user.username" v-for="payperiod in payPeriods" class="payperiod">
          <p>{{payperiod.startDate}}</p>
          <p>{{payperiod.endDate}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '../router'
  import login from './Login'
  import register from './Register'
  import shiftForm from './ShiftForm'
  import period from './Period'
  export default {
    name: 'Home',
    components: {
      login,
      register,
      shiftForm,
      period
    },
    data() {
      return {
        show: false
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      payPeriods() {
        return this.$store.state.payPeriods
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
  .title-col {
    background-color: rgb(59, 88, 182);
    color: white;
    max-height: 4rem;
  }
</style>