<template>
  <div>
    <div v-if="blogPosts.length">
      <BlogPostMainCard :blog-post="firstBlogPost" />
      <div class="blogpost-wrapper">
        <BlogPostCard
          v-for="blogPost in otherBlogPosts"
          :key="blogPost.id"
          :blog-post="blogPost"
        />
      </div>
      <div class="pagination">
        <Pagination
          :page="page"
          :max-pages="200"
          @change="changePage($event)"
        />
      </div>
      <JoinUs />
    </div>
    <div v-else>loading</div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import BlogPostCard from "@/components/BlogPostCard.vue";
import BlogPostMainCard from "@/components/BlogPostMainCard.vue";
import JoinUs from "@/components/JoinUs.vue";
import Pagination from "@/components/base/Pagination.vue";

export default {
  name: "About",

  components: {
    BlogPostCard,
    BlogPostMainCard,
    JoinUs,
    Pagination,
  },

  data() {
    return {
      isFetching: false,
    };
  },

  computed: {
    ...mapGetters({ blogPosts: "currentPageData" }),
    ...mapGetters({ page: "currentPage" }),
    ...mapGetters({ previousPage: "previousPage" }),

    firstBlogPost() {
      if (this.blogPosts.length) {
        return this.blogPosts[0];
      }
      return {};
    },

    otherBlogPosts() {
      return this.blogPosts.slice(1);
    },
  },

  watch: {},

  async created() {
    await this.fetchBlogPosts();
  },

  methods: {
    ...mapActions({ fetchBlogPosts: "fetchCurrentPageData" }),
    ...mapActions({ fetchPreviousBlogPosts: "loadPreviousPageData" }),
    ...mapMutations(["setCurrentPage", "setPreviousPage"]),

    changePage(page) {
      if (page == this.previousPage) {
        this.fetchPreviousBlogPosts();
      } else {
        this.setPreviousPage(this.page);
        this.setCurrentPage(page);
        this.fetchBlogPosts();
      }
      this.scrollToTop();
    },

    scrollToTop() {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }, 800);
    },
  },
};
</script>

<style lang="scss" scoped>
.blogpost-wrapper {
  padding: 24px 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 16px;
  overflow-x: auto;
  margin-top: 10px;
  margin-bottom: 10px;
}

.pagination {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
