<template>
    <li>

        <h3> {{ title }} </h3>
        <h4> {{ content.substring(0,300) + '...' }}</h4>

        <div>
            <base-badge :title="postCreationDate">  </base-badge>
        </div>
        <div class="actions">
            <base-button mode="outline" link :to="postDetail"> View Post </base-button>
        </div>
    </li>
</template>

<script>
import moment from 'moment'
import BaseBadge from '../ui/BaseBadge.vue'
export default{
  components: { BaseBadge },
    props:['id','title', 'content', 'created_at' ],
    computed: {
        postDetail(){
            return this.$route.path + '/' + this.id;
        },
        postCreationDate(){
          return moment(this.created_at).format('LL');
        }
    }
}
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>