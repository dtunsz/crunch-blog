<template>
  <BaseCard>
    <img class="image" :src="blogPostImageUrl" />
    <div class="content">
        <div class="body">
            <p v-if="authorName">
                {{authorName}} <span>. {{timePosted}} ago</span>
            </p>
            <h1  v-html="blogPost.title.rendered" class="title">
            </h1>
            <p class="text">
                {{ firstParagragh }}
            </p>
        </div>

        <div class="footer">
            <span>{{ readTime }} read</span>
            <router-link
                :to="{ name: 'BlogPostDetailPage', params: { id: blogPost.id}}"
            >
                Read Full <i class="mdi mdi-arrow-right"></i>
            </router-link>
        </div>
    </div>
  </BaseCard>
</template>

<script>
import BaseCard from "@/components/base/BaseCard.vue"
import TimeMixin from "@/mixins/TimeMixin.js";

export default {
    name: "BlogPostCard",

    components: {
        BaseCard,
    },

    mixins: [
        TimeMixin
    ],

    props: {
        blogPost: {
            type: Object,
            required: true
        }
    },

    computed: {
        blogPostImageUrl() {
            return this.blogPost.jetpack_featured_media_url + '?h=300'
        },

        firstParagragh() {
            let doc = new DOMParser().parseFromString(this.blogPost.content.rendered, 'text/html')
            let text = doc.querySelector('p').textContent
            if (!text) {
                text = doc.querySelector('div').textContent
            }
            return text
        },

        timePosted() {
            return this.timeFrom(this.blogPost.date_gmt)
        },

        readTime() {
            if (this.blogPost && this.blogPost.content) {
                let str = this.blogPost.content.rendered;
                str = str.toString()
                str = str.replace( /(<([^>]+)>)/ig, '');
                str = str.split(' ').length;
                let time = Math.floor(str/200);
                return time > 1 ? time + ' Mins' : time + ' Min';
            }
            return 0
        },

        authorName() {
            return this.blogPost.author_data.name
        }
    }
}
</script>

<style lang="scss" scoped>
    .image {
        max-width: 100%;
        height: 220px;
    }
    a{
        color: $link;
    }
    .content {
        display: flex;
        flex-direction: column;
        flex: 1;

        .body {
            .title {
                font-size: 1.1rem;
            }
        }
        .footer {
            display: flex;
            flex-direction: row;
            flex: 1;
            justify-content: space-between;
            align-items: flex-end;
        }
    }
</style>