<template>
  <div class="col">
    <form v:on-sumbit.prevent="CreateShift">
      <h2>Add Shift Form</h2>
      <div class="form-group">
        <label for="date">Shift Date</label>
        <input type="date" class="form-control" id="shiteDate" aria-describedby="dateHelp" v-model="newShift.date" placeholder="Enter Shift Date">
      </div>
      <div class="form-group">
        <label for="start">Start Time</label>
        <input type="number" class="form-control" id="shiftStartTime" aria-describedby="TimeHelp" v-model="newShift.start" placeholder="Start Time">
        <small id="TimeHelp" class="form-text text-muted">Please enter military time ex. 1300</small>
      </div>
      <div class="form-group">
        <label for="end">End Time</label>
        <input type="number" class="form-control" id="shiftEndTime" v-model="newShift.end" placeholder="End Time">
        <small id="TimeHelp" class="form-text text-muted">Please enter military time ex. 1300</small>
      </div>
      <button @click="CreateShift" class="btn btn-success">Submit</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'ShiftForm',
    data() {
      return {
        newShift: {
          date: '',
          start: 0,
          end: 0
        }
      }
    },
    methods: {
      CreateShift() {
        console.log(this.newShift)
      }
    }
  }
</script>

<style scoped>
  form {
    background-color: darkslategray;
    margin: 1rem;
    padding: 2rem;
    max-width: 400px;
    border-radius: 5px;
  }
</style>