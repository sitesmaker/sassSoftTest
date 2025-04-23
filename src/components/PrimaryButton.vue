<template>
    <button :type="btnType" class="btn" :class="customClass">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
defineProps({
    btnType: {
        type: String as () => "submit" | "button" | "reset",
        default: 'submit'
    },
    customClass: {
        type: String,
        default: '',
    }
})
</script>

<style lang="scss" scoped>
.btn {
    padding: 16px 20px;
    cursor: pointer;
    background: transparent;
    border-radius: 12px;
    border: 2px solid #403d39;
    transition: all ease-in-out .2s;

    &:hover {
        color: #fffcf2;
        background: #403d39;
        transition: all ease-in-out .4s;
    }

    &_delete {
        border: none;
        
        &:hover {
            background: transparent;
            color: #d62828;
        }
    }
}
</style>