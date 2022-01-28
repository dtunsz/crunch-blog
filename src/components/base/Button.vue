<template>
    <button
        v-bind="$attrs"
        v-on="$listeners"
    >
        <i v-if="icon" :class="'icon mdi mdi-' + icon"></i>
        <slot />
        <i v-if="iconRight" :class="'icon right mdi mdi-' + iconRight"></i>
    </button>
</template>

<script>
export default {
    name: "Button",
    props: {
        icon: {
            type: String,
            required: false
        },

        iconRight: {
            type: String,
            required: false
        }
    }

}
</script>

<style lang="scss" scoped>
    button {
        display: inline-flex;
        align-items: center;
        height: 40px;
        padding: 0 $sp-20;
        border: 1px solid $quaternary;
        background: black;
        outline: none;
        transition-duration: .2s;
        border-radius: $corner-radius;
        color: white;
        cursor: pointer;
        user-select: none;
        text-transform: capitalize;
    }
</style>