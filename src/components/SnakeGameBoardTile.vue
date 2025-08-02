<script setup lang="ts">
import type { BoardBlock } from '@/types/boardBlock';
import { computed } from 'vue';

const props = defineProps<{
    tile: BoardBlock
}>()

const tileClasses = computed(() => ({
    'bg-[#16a34a]': props.tile.status === 'active',
    'bg-[#dc2626]': props.tile.status === 'apple',
    'bg-[#f4f4f4]': props.tile.status ==='inactive'

}))

</script>
<template>

    <div class="pt-[100%] " :class="tileClasses">
    </div>
</template>
<style></style>
