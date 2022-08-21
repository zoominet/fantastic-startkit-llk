<script setup name="HomeNewcard">
// const { proxy } = getCurrentInstance()
// const router = useRouter()
// const route = useRoute()

import { reactive } from 'vue'

const cardForm = reactive({
    setid: '1',
    tempid: '1',
    frontContent: '',
    backContent: ''
})

import Editor from '@tinymce/tinymce-vue'

// export default {
//     name: 'app',
//     components: {
//         'editor': Editor
//     }
// }

// 引入
// import TEditor from '@/components/TEditor.vue'
// 注册
// components: {
//     TEditor,
// }

const contentHeight = () => {
    return (window.innerHeight - 200) + 'px'
}

</script>

<template>
    <el-row class="firstline">
        <el-col :span="18" :style="{'text-align':'left'}">
            <el-form :inline="true" size="mini" :model="cardForm">
                <el-form-item label="">
                    <el-select v-model="cardForm.setid" placeholder="">
                        <el-option label="默认卡片组" value="1" />
                        <el-option label="Zone two" value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="cardForm.tempid" placeholder="">
                        <el-option label="默认模板" value="1" />
                    </el-select>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="6" :style="{'text-align':'right'}">
            <el-form :inline="true" size="mini">
                <el-button type="primary" @click="onSubmit">新增</el-button>
                <el-button type="primary" @click="onSubmit">新增&继续</el-button>
            </el-form>
        </el-col>
    </el-row>
    <!-- <el-divider>
        <el-icon><star-filled /></el-icon>
    </el-divider> -->
    <el-row>
        <el-col :span="12" :style="{'padding-top': '10px'}">
            正面/问题
        </el-col>
        <el-col :span="12" :style="{'padding-top': '10px'}">
            背面/答案
        </el-col>
    </el-row>
    <el-row :style="{'margin-top':'-10px'}">
        <el-col :span="12" :style="{'padding': '10px'}">
            <!-- <TEditor ref="editor" v-model="cardForm.frontContent" /> -->

            <editor
                v-model="cardForm.frontContent"
                api-key="7kdjc9shmflxt8292cfpao9aj9qm7i2vbfbyqc3un3sh1zb3"
                :init="{
                    selector: 'textarea',
                    language: 'zh_CN',
                    height :contentHeight(),
                    plugins: 'lists link image table code help wordcount',
                    images_upload_url: 'postAcceptor.php'
                }"
            />
        </el-col>
        <el-col :span="12" :style="{'padding': '10px'}">
            <editor
                v-model="cardForm.backContent"
                api-key="7kdjc9shmflxt8292cfpao9aj9qm7i2vbfbyqc3un3sh1zb3"
                :init="{
                    selector: 'textarea',
                    language: 'zh_CN',
                    height :contentHeight(),
                    plugins: 'lists link image table code help wordcount',
                    images_upload_url: 'postAcceptor.php'
                }"
            />
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
// scss
.el-row {
    text-align: center;
}
.el-col {
    border-radius: 1px;
}
.firstline {
    border-bottom: 1px dashed var(--el-border-color);
}
.el-form-item {
    margin-bottom: 10px;
}
.editor {
    margin: 10px;
}
</style>
