<template>
    <div>
        <div class="detail">
            <p>By {{ blogPostDetail.author_data.name }} {{timePosted}} ago</p>
            <h1  v-html="blogPostDetail.title.rendered"></h1>
            <div v-html="blogPostDetail.content.rendered">
            </div>
        </div>
        <br>
        <div>
            <h1>
                More Articles
            </h1>
            <div class="posts">
                <BlogPostCard
                    v-for="post in morePosts"
                    :key="post.id"
                    :blogPost="post"
                />
            </div>
        </div>

    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BlogPostCard from "@/components/BlogPostCard.vue";
import TimeMixin from "@/mixins/TimeMixin.js";

export default {
    name: "BlogPostDetail",
    components: {
        BlogPostCard
    },

    mixins: [
        TimeMixin
    ],

    props: {
        blogPostId: {
            type: [Number, String],
            required: true
        },

    },

    data() {
        return {
            authorLink: '',
            blogPostDetail: {}
        }
    },

    computed: {
        ...mapGetters({allBlogPosts: 'currentPageData'}),
        ...mapGetters({author: 'currentPostAuthor'}),

        morePosts() {
            let posts = this.allBlogPosts.filter(post => post.id != this.blogPostId)
            posts =  posts.slice(0,3)
            return posts
        },

        links() {
            return this.blogPostDetail._links
        },

        timePosted() {
            return this.timeFrom(this.blogPostDetail.date_gmt)
        }
    },
    async created() {
        if (!this.allBlogPosts.length) {
            await this.fetchBlogPosts()
        }
        this.blogPostDetail = this.allBlogPosts.find(post => post.id == this.blogPostId)
    },

    methods: {
        ...mapActions({fetchBlogPosts: 'fetchCurrentPageData'}),
    }
}
</script>

<style lang="scss" scoped>
    .detail{
        padding: 10%;

        @media #{$mobile} {
            padding: 5%;
        }
    }
    .posts {
        padding: 24px 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 16px;
        overflow-x: auto;
    }
</style>