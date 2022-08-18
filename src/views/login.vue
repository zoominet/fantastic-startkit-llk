<route>
{
    meta: {
        layout: false,
        title: '登录'
    }
}
</route>

<script setup>
const router = useRouter()
const route = useRoute()

import { User } from '@element-plus/icons-vue'

import useTokenStore from '@/store/modules/token'
// import api from '@/api'
import { ElMessage } from 'element-plus'

const tokenStore = useTokenStore()

const form = reactive({
    phone: '',
    password: '',
    remember: false,
    '@datasource': 'hikari'
})

const url =
    'https://linkard.oss-cn-beijing.aliyuncs.com/img/401660148927_.pic.jpg'

const onLogin = () => {
    // todo 表单校验

    tokenStore.login(form).then(() => {
        ElMessage({
            type: 'success',
            message: '欢迎使用'
        })
        router.push({ path: '/' })
        // 登录成功后路由跳回
        // if (route.query.redirect) {
        //     router.replace({
        //         path: route.query.redirect
        //     })
        // } else {
        //     if (window.history.length <= 1) {
        //         router.push({ path: '/' })
        //     } else {
        //         router.go(-1)
        //     }
        // }
    })

}
const contentHeight = () => {
    return (window.innerHeight - 200) + 'px'
}

</script>

<template>
    <el-row>
        <el-col :span="24" :style="{height:'80px'}" />
    </el-row>
    <el-row>
        <el-col :sm="6" :md="8" :lg="10" />
        <el-col :sm="12" :md="8" :lg="4" :style="{height:contentHeight()}">
            <el-image style="width: 120px; height: 120px;" :src="url" :fit="fit" />
            <h2>零卡</h2>

            <el-form :model="form" size="large" label-width="60px">
                <el-form-item label="手机号">
                    <el-input v-model="form.phone" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input
                        v-model="form.password"
                        type="password"
                        show-password
                        @keydown.enter="onLogin"
                    />
                </el-form-item>
                <el-form-item label="">
                    <el-checkbox v-model="form.remember" label="记住我" />
                </el-form-item>
                <!-- <el-form-item>
                    <el-button type="primary" :icon="User" :style="{'width': '100%'}" @click="onLogin">登录</el-button>
                    <el-link :class="{reglink:true}">注册</el-link>
                </el-form-item> -->
            </el-form>
            <el-button type="primary" :icon="User" :style="{'width': '100%'}" @click="onLogin">登录</el-button>
        </el-col>
        <el-col :sm="6" :md="8" :lg="10" />
    </el-row>

    <!-- <el-affix position="bottom" :offset="50">
        <p>版权所有 © 2022</p>
    </el-affix> -->
</template>

<style lang="scss">
body {
    background-color: #fafafa;
}
.el-row {
    margin: 20px;
    text-align: center;
}
.el-row:last-child {
    margin-bottom: 0;
}
.el-col {
    border-radius: 4px;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
.reglink {
    margin-left: 50px;
}
h2 {
    margin-bottom: 60px;
    margin-top: 0;
}
.el-affix {
    text-align: center;
}
.el-form-item__label {
    width: 80px;
}
.el-form-item--large {
    --font-size: 16px;
    // --el-form-label-font-size: var(--font-size);
    // margin-bottom: 22px;
}
.el-checkbox.el-checkbox--large .el-checkbox__label {
    font-size: 16px;
}
</style>
