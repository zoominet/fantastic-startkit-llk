<route>
{
    meta: {
        layout: false
    }
}
</route>

<script setup>
const router = useRouter()
const route = useRoute()

import useTokenStore from '@/store/modules/token'
import { ElMessage } from 'element-plus'

const tokenStore = useTokenStore()

const onLogout = () => {

    tokenStore.logout().then(() => {
        router.push({ path: '/' })
    })

}

</script>

<template>
    <div>
        欢迎使用 Fantastic-startkit ，点击进入<RouterLink to="/example/svgicon">演示Demo</RouterLink>
        点击进入<RouterLink to="/home/dashboard">dashboard</RouterLink>

        <el-link @click="onLogout">注销</el-link>
    </div>
</template>
