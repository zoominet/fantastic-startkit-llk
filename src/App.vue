<script setup>
const isRouterAlive = ref(true)

import useSettingsStore from '@/store/modules/settings'
const settingsStore = useSettingsStore()

provide('reload', reload)
function reload() {
    isRouterAlive.value = false
    nextTick(() => (isRouterAlive.value = true))
}

watch(() => settingsStore.title, () => {
    let title = settingsStore.title
    document.title = title ? `${title} - ${import.meta.env.VITE_APP_TITLE}` : import.meta.env.VITE_APP_TITLE
}, {
    immediate: true
})

watch(() => settingsStore.mode, () => {
    // if (settingsStore.mode === 'pc') {
    //     settingsStore.$patch(state => {
    //         state.menu.subMenuCollapse = settingsStore.subMenuCollapseLastStatus
    //     })
    // } else if (settingsStore.mode === 'mobile') {
    //     settingsStore.$patch(state => {
    //         state.menu.subMenuCollapse = true
    //     })
    // }
    document.body.setAttribute('data-mode', settingsStore.mode)
}, {
    immediate: true
})

onMounted(() => {
    window.onresize = () => {
        settingsStore.setMode(document.documentElement.clientWidth)
    }
    window.onresize()
})

</script>

<template>
    <RouterView v-if="isRouterAlive" />
</template>
