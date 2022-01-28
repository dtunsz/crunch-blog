import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    baseApi: `https://techcrunch.com/wp-json/wp/v2/posts/`,
    currentPage: 1,
    currentPageData: [],
    previousPage: 0,
    previousPageData: [],
    isLoading: false,
    errorMessage: "",
    currentPostAuthor: {},
  },

  getters: {
    isLoading: (state) => state.isLoading,
    currentPage: (state) => state.currentPage,
    currentPageData: (state) => state.currentPageData,
    previousPage: (state) => state.previousPage,
    previousPageData: (state) => state.previousPageData,
    errorMessage: (state) => state.errorMessage,
    currentPostAuthor: (state) => state.currentPostAuthor,
  },

  mutations: {
    setCurrentPage(state, page) {
      state.currentPage = page;
    },

    setPreviousPage(state, page) {
      state.previousPage = page;
    },

    setCurrentPageData(state, data) {
      state.currentPageData = [...data];
    },

    setPreviousPageData(state, data) {
      state.previousPageData = [...data];
    },

    setErrorMessage(state, msg) {
      state.errorMessage = msg;
    },

    setCurrentPostAuthor(state, data) {
      state.currentPostAuthor = { ...data };
    },
  },
  actions: {
    async fetchCurrentPageData({ commit }) {
      commit("setErrorMessage", "");
      let link = this.state.baseApi + "?page=" + this.state.currentPage;
        let dataFetched;
      await axios
        .get(link)
        .then((res) => {
        //   commit("setPreviousPageData", this.state.currentPageData);
        //   commit("setCurrentPageData", res.data);
            dataFetched = res.data
        })
        .catch((err) => {
          console.error(err);
          commit("setErrorMessage", err);
        });
    //   let allPostsWithAuthor = this.getters.currentPageData.map((post) => {
      let allPostsWithAuthor = await Promise.all(
          dataFetched.map(async (post) => {
            await axios.get(post._links.authors[0].href)
            .then((res) => (post.author_data = res.data))
            .catch((err) => console.error(err));
        return post;
      })
      );
      if (allPostsWithAuthor) {
          commit("setPreviousPageData", this.state.currentPageData);
            //   commit("setCurrentPageData", res.data);
          commit("setCurrentPageData", allPostsWithAuthor);
          console.log('a;; of us',allPostsWithAuthor)
      }
    },

    loadPreviousPageData({ commit }) {
      commit("setErrorMessage", "");
      commit("setCurrentPageData", this.state.previousPageData);
      commit("setCurrentPage", this.state.previousPage);
      commit("setPreviousPageData", []);
      commit("setPreviousPage", 0);
    },
  },
  modules: {},
});

export default store;
