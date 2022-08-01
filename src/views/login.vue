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
import api from '@/api'
import { ElMessage } from 'element-plus'

const tokenStore = useTokenStore()

const form = reactive({
    phone: '',
    password: '',
    remember: false
})

const url =
    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'

const onLogin = () => {
    // todo 表单校验
    // api.post('login', form).then(res => {
    //     // console.log(res)
    //     if (res.ok === true) {

    //     } else {
    //         ElMessage({
    //             type: 'error',
    //             showClose: true,
    //             message: res.msg
    //         })
    //     }
    // })

    tokenStore.login(form).then(() => {
        ElMessage({
            type: 'success',
            message: '欢迎使用'
        })
        // 登录成功后路由跳回
        if (route.query.redirect) {
            router.replace({
                path: route.query.redirect
            })
        } else {
            if (window.history.length <= 1) {
                router.push({ path: '/' })
            } else {
                router.go(-1)
            }
        }
    })

}

</script>

<template>
    <el-row>
        <el-col :span="24" :style="{height:'80px'}" />
    </el-row>
    <el-row>
        <el-col :span="9"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="6">
            <el-image style="width: 100px; height: 100px;" :src="url" :fit="fit" />
            <h2>登录</h2>

            <el-form :model="form" label-width="120px">
                <el-form-item label="手机号">
                    <el-input v-model="form.phone" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input
                        v-model="form.password"
                        type="password"
                        show-password
                    />
                </el-form-item>
                <el-form-item label="">
                    <el-checkbox v-model="form.remember" label="记住我" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :icon="User" @click="onLogin">登录</el-button>
                    <el-link :class="{reglink:true}">注册</el-link>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="9"><div class="grid-content ep-bg-purple" /></el-col>
    </el-row>
</template>

<style lang="scss">
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
    margin-top: 100px;
}

</style>
