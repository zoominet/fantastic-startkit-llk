<script setup name="HomeNewcard">
// const { proxy } = getCurrentInstance()

const router = useRouter()
const route = useRoute()

import useTokenStore from '@/store/modules/token'
import { ElMessage } from 'element-plus'

const tokenStore = useTokenStore()

const onLogout = () => {

    tokenStore.logout().then(() => {
        // router.push({ path: '/' })
        router.push({
            path: '/login',
            query: {
                redirect: router.currentRoute.fullPath
            }
        })
    })

}
import { ref } from 'vue'

const tabPosition = ref('left')
</script>

<template>
    <el-row>
        <el-col :span="8" :offset="8">
            <el-tabs :tab-position="tabPosition" style="height: 300px;" class="demo-tabs">
                <el-tab-pane label="我">个人信息[WIP]</el-tab-pane>
                <el-tab-pane label="设置">系统设置[WIP]</el-tab-pane>
                <el-tab-pane label="关于">帮助每个人找到自己的记忆曲线，提高记忆效率和学习效果</el-tab-pane>
                <el-tab-pane label="退出"><el-link @click="onLogout">注销</el-link></el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
.el-tabs__item {
    font-size: 32px;
}
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
.el-link {
    color: red;
    font-size: 16px;
}
.el-tab-pane {
    margin-top: 80px;
    margin-left: 50px;
}
</style>
