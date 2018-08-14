<template>
  <div class="modal fade" id="createPayPeriodModal" tabindex="-1" role="dialog" aria-labelledby="createPayPeriodModalCenterTitle"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="createPayPeriodModalCenterTitle">Create Shift</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form v-on:submit.prevent="createPayPeriod">
            <div class="form-group">
              <input type="date" name="startDate" v-model="newPayPeriod.startDate" class="form-control" id="payPeriodStartDate" placeholder="Pay Period Start"
                required>
            </div>
            <div class="form-group">
              <input type="date" name="endDate" v-model="newPayPeriod.endDate" class="form-control" id="payPeriodEndDate" placeholder="Pay Period End"
                required>
            </div>
          </form>
        </div>
        <div class="modal-footer d-flex">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-success" @click="createPayPeriod" data-dismiss="modal">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Period',
    data() {
      return {
        newPayPeriod: {
          startDate: '',
          endDate: ''
        }
      }
    },
    methods: {
      createPayPeriod() {
        console.log(this.newPayPeriod)
        this.$store.dispatch('createPayPeriod', this.newPayPeriod)
      }
    }
  }
</script>

<style>
</style>