<template>
    <div v-if="maxPages > 1" class="pagination">
        <Button
            :disabled="isFirstPage"
            icon="chevron-left"
            class="iconic nav"
            @click="changePage(currentPage-1)"
        />

        <Button
            v-if="showLeftEllipsis"
            class="bold"
            @click="changePage(1)"
        >
            1
        </Button>

        <Button
            v-if="showLeftEllipsis"
            class="ellipsis bold"
            disabled
        >
            <i class="mdi mdi-dots-horizontal"></i>
        </Button>

        <Button
            v-for="page in pages"
            :key="page"
            :class="[getPageClass(page)]"
            class="bold"
            @click="changePage(page)"
        >
            {{ page }}
        </Button>

        <Button
            v-if="showRightEllipsis"
            class="ellipsis"
            disabled
        >
            <i class="mdi mdi-dots-horizontal"></i>
        </Button>

        <Button
            v-if="showRightEllipsis"
            class="bold"
            @click="changePage(maxPages)"
        >
            {{ maxPages }}
        </Button>

        <Button
            :disabled="isLastPage"
            class="iconic nav"
            icon="chevron-right"
            @click="changePage(currentPage+1)"
        />
    </div>
</template>

<script>
    import Button from '@/components/base/Button.vue';

    export default {
        name: 'Pagination',

        components: {
            Button
        },

        model: {
            prop: 'page',
            event: 'change'
        },

        props: {
            page: {
                type: Number,
                default: 1,
            },

            maxPages: {
                type: Number,
                default: 1
            },

            edgePages: {
                type: Boolean,
                default: false
            },

            makeCrawlable: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                currentPage: this.page
            };
        },

        computed: {
            range() {
                let range = 5;
                if (this.edgePages && this.maxPages > range) {
                    if (this.currentPage > 3) {
                        range--;
                    }
                    if (this.currentPage < this.maxPages - 2) {
                        range--;
                    }
                }
                return range;
            },

            isFirstPage() {
                return (this.currentPage-1) <= 0;
            },

            isLastPage() {
                return (this.currentPage+1) > this.maxPages;
            },

            pages() {
                let pages = Array.from(new Array(this.pageStartEnd.arraySize),
                                       (x,i) => i + this.pageStartEnd.offset);
                return pages;
            },

            pageStartEnd() {
                var buffer = Math.floor(this.range / 2);
                var start = this.currentPage - buffer;
                var end = this.currentPage + buffer;
                if(start < 1) {
                    start = 1;
                    end = this.range;
                }
                if(end > this.maxPages) {
                    start = Math.max(this.maxPages - this.range + 1, 1);
                    end = this.maxPages;
                }
                return {offset: start, arraySize: (end-start+1)};
            },

            showLeftEllipsis() {
                return this.edgePages && this.showMinPage && this.pages.length > 1;
            },

            showRightEllipsis() {
                return this.edgePages && this.showMaxPage && this.pages.length > 1;
            },

            showMinPage() {
                return !this.pages.includes(2);
            },

            showMaxPage() {
                return !this.pages.includes(this.maxPages - 1);
            }
        },

        watch: {
            page(newPage) {
                this.currentPage = newPage;
            },

            currentPage() {
                this.$emit('change', this.currentPage);
            }
        },

        methods: {
            changePage(page) {
                page = page > this.maxPages ? this.maxPages : page;
                page = page < 1 ? 1 : page;
                this.currentPage = page;
            },

            getPageClass(page) {
                return this.currentPage == page ? 'active' : '';
            }
        },
    };
</script>

<style lang="scss" scoped>

    .hideElement {
        visibility: hidden;
    }

    .pagination {
        display: inline-flex;
        align-items: center;
    }

    button {
        border: 1px solid $light-gray;
        height: 36px;
        min-width: 36px;
        padding: 0 8px;
        border: 0;
        border-radius: 32px;
        margin: 0 4px;
        color: $accent;
        background: none;
        justify-content: center;

        &.iconic {
            padding: 0;
            width: 36px;
        }

        @media #{$mobile} {
            margin: 0 2px;
        }

        &:first-child {
            margin-left: 0;
            margin-right: 8px;
        }

        &:last-child {
            margin-left: 8px;
            margin-right: 0;
        }

        &:disabled {
            color: $gray;
            color: #777;
            cursor: initial;
            background: none;
        }
    }

    button.ellipsis {
        color: $gray;
        color: #777;
        padding: 0;
        min-width: auto;
        padding: 0 8px;

        &:disabled {
            cursor: initial;
        }

        &:hover {
            background: initial;
        }
    }

    button.nav {
        border-radius: 32px;
    }

    button.active {
        background: $accent;
        color: $white;
        border-color: $accent;

        &:hover {
            background: $accent;
        }
    }
</style>

