<template>
  <div class="details-page">
    <BlogPostDetail :key="id" :blog-post-id="id" />
  </div>
</template>

<script>
import BlogPostDetail from "@/components/BlogPostDetail.vue";

export default {
  name: "BlogPostDetailPage",
  components: {
    BlogPostDetail,
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
};
</script>

<style lang="scss" scoped></style>
