<template>
    <form @submit.prevent="submitForm">

        <div class="form-control" :class="{invalid: !title.isValid}">
            <label for="title">Title</label>
            <input type="text" id="title" v-model.trim="title.val" @blur="clearValidity('title')"/>
            <p v-if="!title.isValid"> Title must not be empty and must be greater than 3 chars </p>
        </div>
        <div class="form-control" :class="{invalid: !content.isValid}">
            <label for="content">Content</label>
            <textarea id="content" rows="20" v-model.trim="content.val" @blur="clearValidity('content')"></textarea>
            <p v-if="!content.isValid"> Content must not be empty.</p>
        </div>
        <p v-if="!formIsValid"> Please fix the above errors and submit again.</p>
        <base-button v-if="editing"> Update </base-button>
        <base-button v-else> Post </base-button>
    </form>
</template>

<script>
export default {
    props:{
      mainId: Number,
      mainEditing: Boolean,
      mainTitle: Object,
      mainContent: Object
    },
    emits:['save-data','update-data'],
    created() {
        this.title = this.mainTitle;
        this.content = this.mainContent;
        this.id = this.mainId;
        this.editing = this.mainEditing;
    },

    data(){
        return {
            id: '',
            editing: false,
            title: {
              val:'',
              isValid: true
            },
            content: {
              val:'',
              isValid: true
            },
            formIsValid: true
        };
    },
    computed:{
        isLoggedIn(){
            return this.$store.getters.isAuthenticated;
        },
    },
    methods: {
        clearValidity(input){
          this[input].isValid = true;
        },
        validateForm(){
          this.formIsValid = true;
          if(this.title.val == '' || this.title.val.length < 3){
            this.title.isValid = false;
            this.formIsValid = false;
          }

          if(this.content.val == ''|| this.content.val.length < 3 ){
            this.content.isValid = false;
            this.formIsValid = false;
          }
        },
        submitForm(){
          this.validateForm();

          if(!this.formIsValid){
            return;
          }

          const formData = {
              title:this.title.val,
              content: this.content.val
          };

          if (this.editing) {
            formData.id = this.id;
            this.$emit('update-data', formData);
          }else{
            this.$emit('save-data', formData);
          }

        },

    },
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