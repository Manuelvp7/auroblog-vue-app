<template>
  <div>
    <base-dialog :show="!!error" title="An error ocurred" @close="handleError" >
      <p>{{ error }} </p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spiner></base-spiner>
    </base-dialog>
      <base-card v-if="!hasToken">
          <form @submit.prevent="submitForm">
              <div class="form-control">
                  <label for="email">E-Mail</label>
                  <input type="email" id="email" v-model="email"/>
              </div>
              <div class="form-control">
                  <label for="passsword">Password</label>
                  <input type="password" id="password" v-model="password"/>
              </div>
              <p v-if="!formIsValid"> Please enter a valid email and password (must be at least 6 characters long). </p>
              <base-button>Login</base-button>
          </form>
    </base-card>
  </div>
</template>

<script>
export default {
    data() {
        return {
          email:'',
          password:'',
          formIsValid: true,
          isLoading: false,
          error: null
        }
    },
    methods: {
        async submitForm(){
            this.formIsValid = true;
            if (this.email === '' || !this.email.includes('@') || this.password.length < 6) {
                this.formIsValid = false;
                return;
            }

            this.isLoading = true;

            try {
              await this.$store.dispatch('login',{
                email: this.email,
                password: this.password,
              });
              this.$router.replace('/posts');
            } catch (error) {
              this.error = error.message || 'Failed to authenticate, try later.';
            }

            this.isLoading = false;

        },
        handleError(){
          this.error = null;
        }

    },
    computed:{
        hasToken(){
            return ! this.$store.getters['auth/token'] == null;
        }
    }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>