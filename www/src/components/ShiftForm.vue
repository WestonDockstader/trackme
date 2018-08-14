<template>
  <div class="modal fade" id="createShiftModal" tabindex="-1" role="dialog" aria-labelledby="createShiftModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="createShiftModalCenterTitle">Create Shift</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form v-on:submit.prevent="createShift">
            <div class="form-group">
              <input type="date" name="shiftDate" v-model="newShift.date" class="form-control" id="shiftDate" placeholder="Shift Date"
                required>
            </div>
            <div class="form-group">
              <input type="number" name="shiftStartTime" v-model="newShift.start" aria-describedby="TimeHelp" class="form-control" id="shiftStartTime"
                placeholder="Start Time">
              <small id="TimeHelp" class="form-text text-muted">Please enter military time ex. 1300</small>
            </div>
            <div class="form-group">
              <input type="number" name="shiftEndTime" v-model="newShift.start" class="form-control" id="shiftEndTime" placeholder="Password">
              <small id="TimeHelp" class="form-text text-muted">Please enter military time ex. 1300</small>
            </div>
          </form>
        </div>
        <div class="modal-footer d-flex">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-success" @click="createShift" data-dismiss="modal">Create</button>
        </div>
      </div>
    </div>
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
      createShift() {
        console.log(this.newShift)
      }
    }
  }
</script>

<style scoped>
</style>