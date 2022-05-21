<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred."
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <base-card>
      <section>
        <h2>Register as a coach now!</h2>
        <coach-form @save-data="saveData"></coach-form>
      </section>
    </base-card>
  </div>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm,
  },
  data() {
    return {
      error: null,
    };
  },
  methods: {
    async saveData(formData) {
      try {
        await this.$store.dispatch('coaches/registerCoach', formData);
        this.$router.replace('/coaches');
      } catch (error) {
        this.error = error.message || 'Something went wrong';
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>
