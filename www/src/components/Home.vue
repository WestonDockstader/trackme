<template>
  <div class="home">
    <div class="row">
      <div class="col">
        <h1>TrackMe</h1>
        <button class="btn btn-outline-success" data-toggle="modal" data-target="#loginModal">Login</button>
        <button class="btn btn-outline-success" data-toggle="modal" data-target="#registerModal">Register</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <form>
          <h2>Add Shift Form</h2>
          <div class="form-group">
            <label for="date">Shift Date</label>
            <input type="date" class="form-control" id="shiteDate" aria-describedby="dateHelp" placeholder="Enter Shift Date">
            <small id="shiftHelp" class="form-text text-muted">Please enter date in the format 2018-08-06</small>
          </div>
          <div class="form-group">
            <label for="start">Start Time</label>
            <input type="number" class="form-control" id="shiftStartTime" aria-describedby="TimeHelp" placeholder="Start Time">
            <small id="TimeHelp" class="form-text text-muted">Please enter military time ex. 1300</small>
          </div>
          <div class="form-group">
            <label for="end">End Time</label>
            <input type="number" class="form-control" id="shiftEndTime" placeholder="End Time">
            <small id="TimeHelp" class="form-text text-muted">Please enter military time ex. 1300</small>
          </div>
          <button type="submit" class="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
    <login></login>
    <register></register>
  </div>
</template>

<script>
  import login from './Login'
  import register from './register'
  export default {
    name: 'Home',
    components: {
      login,
      register
    },
    data() {
      return {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  form {
    background-color: darkslategray;
    margin: 1rem;
    padding: 1rem;
  }
</style>