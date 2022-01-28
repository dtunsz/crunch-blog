<template>
    <div
        :class="[
            (shadow ? 'shadowed' : ''),
            (elevation ? 'elevation-'+elevation : ''),
            (hover ? 'hoverable' : ''),
            (padding ? 'padding-'+padding : ''),
            display
        ]"
        class="card"
        @click="$emit('click')"
    >
        <slot />
    </div>
</template>

<script>
    export default {
        name: 'BaseCard',

        props: {
            elevation: {
                type: String,
                required: false
            },

            hover: {
                type: Boolean,
                required: false
            },

            shadow: {
                type: Boolean,
                required: false
            },

            padding: {
                type: String,
                required: false
            },

            display: {
                type: String,
                required: false
            }
        },

        data() {
            return {

            };
        },
    };
</script>

<style scoped lang="scss">

    .card {
        background: $white;
        border: 1px solid #eeeeee;
        display: flex;
        flex-direction: column;
        border-radius: 4px;
        overflow: hidden;
        transition-duration: 0.2s;
        padding: 10px;

        img,
        a {
            text-decoration: none;
        }
    }
</style>
