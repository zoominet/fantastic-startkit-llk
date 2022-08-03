<script setup name="HomeNewcard">
// const { proxy } = getCurrentInstance()

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
import { ref } from 'vue'

const tabPosition = ref('left')
</script>

<template>
    <el-row>
        <el-col :span="8" :offset="8">
            <el-tabs :tab-position="tabPosition" style="height: 300px;" class="demo-tabs">
                <el-tab-pane label="我">coming soon </el-tab-pane>
                <el-tab-pane label="设置">coming soon</el-tab-pane>
                <el-tab-pane label="关于">版权所有</el-tab-pane>
                <el-tab-pane label="退出"><el-link @click="onLogout">注销登录</el-link></el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
.demo-tabs {
    padding-top: 100px;
}
.demo-tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}
.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
    height: 100%;
    font-size: 36px;
}
</style>
