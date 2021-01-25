<template>
    <div>
        <base-dialog :show="!!error" title="No Post Found" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <base-card v-if="isLoggedIn">
            <post-form  :mainId="idPost" :mainTitle="title" :mainContent="content" :mainEditing="true" @update-data="updateData"></post-form>
        </base-card>
        <div v-else>
            <section>
                <base-card>
                <base-badge :title="postCreationDate">  </base-badge>
                    <h2> {{ title.val }} </h2>
                </base-card>
            </section>

            <section>
                <base-card>
                    <p>{{ content.val }} </p>
                </base-card>
            </section>

        </div>

    </div>
</template>

<script>
import PostForm from './../../components/posts/PostForm.vue'
import moment from 'moment'
export default {
    components:{
        PostForm
    },
    props: ['id'],
    data(){
        return {
            selectedPost: null,
            error: null
        };
    },
    computed: {
        isLoggedIn(){
            return this.$store.getters.isAuthenticated;
        },

        postCreationDate(){
            if (typeof this.selectedPost !== 'undefined') {
                return moment(this.selectedPost.created_at).format('LL');
            }
            return '';

        },
        idPost(){
            if (typeof this.selectedPost !== 'undefined') {
                return this.selectedPost.id;
            }
            return '';


        },

        title(){
            if (typeof this.selectedPost !== 'undefined') {
                return {val: this.selectedPost.title, isValid: true };
            }
            return '';


        },
        content(){
            if (typeof this.selectedPost !== 'undefined') {
                return {val: this.selectedPost.content, isValid: true };
                // return this.selectedPost.content;
            }
            return '';


        }


    },
    methods: {
        handleError(){
            this.error = null;
            this.$router.push('/posts');
        },
        updateData(data){

            this.$store.dispatch('posts/updatePost', data);
            this.$router.push('/posts');
        }

    },
    created() {

        this.selectedPost = this.$store.getters['posts/posts'].find(
            (post) => post.id == this.id
        );

        if (typeof this.selectedPost === 'undefined') {
            this.error =  'No post related to '+this.id;
        }
    },
};
</script>