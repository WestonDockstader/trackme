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
    <div class="row text-center mt-5">
      <div v-if="!user.username" class="col-8 offset-2">
        <h3>Welcome to TrackMe</h3>
        <p>Track your time buy creating a pay period and adding shifts to them on the days you work.</p>
        <p>With TrackMe you set the dates for your payperiod so it can be used specific to your needs.</p>
        <p>After you add shifts to your pay period you can add notes so you can easily track your progress or daily notes on
          the work you performed.</p>
      </div>
    </div>
    <login></login>
    <register></register>
    <shiftForm></shiftForm>
    <period></period>
    <!-- Payperiod table -->
    <div v-if="user.username" class="row">
      <div class="col-8 offset-2 d-flex justify-content-center mt-5">
        <h3>Pay Periods</h3>
      </div>
      <div class="col-8 offset-2 paytable">
        <div v-if="user.username" v-for="payperiod in payPeriods" class="row payperiod p-0">
          <div class="col-12 collapsible d-flex justify-content-between p-2" @click="openShifts">
            <h4>{{payperiod.startDate}}</h4>
            <h4>{{payperiod.endDate}}</h4>
          </div>
          <div class="col-12 content">
            <h1>show me</h1>
          </div>
          <div class="col-12 d-flex justify-content-between align-self-center">
            <p @click="openShifts" style="cursor:default;">'Click' to expand</p>
            <button class="btn btn-outline-success custombtn" data-toggle="modal" data-target="#createShiftModal">Add Shift</button>
          </div>
        </div>
      </div>
      <div class="col-8 offset-2 d-flex flex-row-reverse mt-2 ">
        <button class="btn btn-outline-success custombtn" data-toggle="modal" data-target="#createPayPeriodModal">Add Pay Period</button>
      </div>
    </div>
    <div id="houses"></div>
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
    watch: {
      user: {
        handler(user) {
          if (user.username) {
            this.$store.dispatch('getPayPeriods')
          }
        }
      },
      deep: true
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
      },
      shiftList() {
        console.log('this is next')
      },
      openShifts() {
        let elements = document.getElementsByClassName('content')

        for (let i = 0; i < elements.length; i++) {
          let elem = elements[i]
          if (elem.style.display == "block") {
            elem.style.display = "none"
          }
          else {
            elem.style.display = "block"
          }
        }
      }
    }
  }
</script>

<!-- Add "scoped " attribute to limit CSS to this component only -->
<style scoped>
  .title-col {
    background-color: rgb(59, 88, 182);
    color: white;
    max-height: 4rem;
  }

  .payperiod {
    color: rgb(50, 202, 50);
    background-color: slategray;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border-color: lightgreen;
    border-width: 1px;
    border-style: solid;
  }

  .custombtn {
    font-size: 12px;
  }

  .collapsible {
    cursor: default;
  }

  .active,
  .collapsible:hover {
    background-color: rgb(117, 105, 105);
  }

  .content {
    padding: 0 18px;
    display: none;
    overflow: hidden;
    min-height: 20px;
    background-color: lightgray;
    color: darkorange;
  }
</style>