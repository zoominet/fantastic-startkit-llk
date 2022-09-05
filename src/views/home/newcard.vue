<script setup name="HomeNewcard">
// const { proxy } = getCurrentInstance()
// const router = useRouter()
// const route = useRoute()
import api from '@/api'

import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/token'

const userStore = useUserStore()

const cardForm = reactive({
    sets: [],
    setid: '',
    tempid: '1',
    frontContent: '',
    backContent: ''
})

// import Editor from '@tinymce/tinymce-vue'

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

// const contentHeight = () => {
//     return (window.innerHeight - 200) + 'px'
// }

const regex = /(<([^>]+)>)/ig

const onSubmit = () => {
    console.log(cardForm)

    if (cardForm.frontContent.replace(regex, '') == '' || cardForm.backContent.replace(regex, '') == '') {
        ElMessage({
            type: 'error',
            showClose: true,
            message: '请输入卡片正面和背面内容'
        })
        return
    }

    let carddata = {
        'Card': {
            'set_id': cardForm.setid,
            'front_temp_id': cardForm.tempid,
            'create_by': userStore.token,
            'front_content': cardForm.frontContent,
            'back_content': cardForm.backContent,
            '@role': 'OWNER'
        },
        'tag': 'Card',
        '@datasource': 'hikari'
    }
    api.post('post', carddata).then(res => {
        if (res.ok === true) {
            let setCardsNum = 0
            for (var i = 0; i < cardForm.sets.length; i++) {
                if (cardForm.sets[i].CardSet.id == cardForm.setid) {
                    setCardsNum = cardForm.sets[i].CardSet.card_num
                }
            }
            let cardset = {
                'CardSet': {
                    'id': cardForm.setid,
                    'card_num': setCardsNum + 1,
                    'update_by': userStore.token,
                    'update_time': getCurrentDatetime()
                },
                'tag': 'CardSet',
                '@datasource': 'hikari'
            }
            api.post('put', cardset).then(res => {
                if (res.ok === true) {

                    ElMessage({
                        type: 'success',
                        showClose: true,
                        message: '创建成功'
                    })
                    resetContent()
                } else {
                    ElMessage({
                        type: 'error',
                        showClose: true,
                        message: res.msg
                    })
                }

            }).catch(error => {
                ElMessage({
                    type: 'error',
                    showClose: true,
                    message: error
                })
            })
            // ElMessage({
            //     type: 'success',
            //     showClose: true,
            //     message: '创建成功'
            // })
            // resetContent()
        } else {
            ElMessage({
                type: 'error',
                showClose: true,
                message: res.msg
            })
        }

    }).catch(error => {
        ElMessage({
            type: 'error',
            showClose: true,
            message: error
        })
    })
}

const resetContent = () => {
    cardForm.frontContent = ''
    cardForm.backContent = ''
}

const getCurrentDatetime = () => {
    const date = new Date(+new Date() + 8 * 3600 * 1000)
    const str = date.toISOString().slice(0, 19).replace('T', ' ')
    // console.log('ctime', str)
    return str
}

const getCartSets = () => {

    let querydata = {
        '[]': {
            'CardSet': {
                '@role': 'OWNER'
            },
            'query': 0
        },
        '@datasource': 'hikari'
    }
    api.post('get', querydata).then(res => {
        if (res.ok === true) {
            cardForm.sets = res['[]']
            cardForm.setid = cardForm.sets[0].CardSet.id
        } else {
            ElMessage({
                type: 'error',
                showClose: true,
                message: res.msg
            })
        }

    }).catch(error => {
        ElMessage({
            type: 'error',
            showClose: true,
            message: error
        })
    })
}
getCartSets()
</script>

<template>
    <el-row class="firstline">
        <el-col :span="6" :style="{'text-align':'left'}">
            <!-- <el-form :inline="true" size="mini" :model="cardForm">
                <el-form-item label="">
                    <el-select v-model="cardForm.setid" placeholder="">
                        <el-option label="默认卡片组" value="1" />
                        <el-option label="Zone two" value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="cardForm.tempid" placeholder="">
                        <el-option label="默认模板:正反卡片" value="1" />
                    </el-select>
                </el-form-item>
            </el-form> -->
        </el-col>
        <el-col :span="18" :style="{'text-align':'right'}">
            <el-form :inline="true" size="mini" :model="cardForm">
                <el-form-item label="所属卡集：">
                    <el-select v-model="cardForm.setid" placeholder="">
                        <el-option
                            v-for="item in cardForm.sets"
                            :key="item.CardSet.id"
                            :label="item.CardSet.set_name"
                            :value="item.CardSet.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" round @click="onSubmit">新增</el-button>
                    <el-button type="primary" link @click="resetContent">重置</el-button>
                    <!-- <el-button type="info" plain @click="resetContent">重置</el-button> -->
                <!-- <el-button type="primary" @click="onSubmit">新增&继续</el-button> -->
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
    <!-- <el-divider>
        <el-icon><star-filled /></el-icon>
    </el-divider> -->
    <el-row :style="{'margin-top':'-10px','border':'1px solid var(--el-border-color)','font-size': 'var(--el-font-size-extra-large)'}">
        <el-col :span="12" :style="{'padding':'10px 0','background':'#fff'}">
            正面
        </el-col>
        <el-col :span="12" :style="{'padding':'10px 0','background':'#ECEFF1'}">
            背面
        </el-col>
    </el-row>
    <el-row :style="{'margin-top':'-10px'}">
        <el-col :span="12">
            <!-- <TEditor ref="editor" v-model="cardForm.frontContent" /> -->
            <Editor
                v-model="cardForm.frontContent"
                :init="{'min_height':'500'}"
            />
            <!-- <editor
                v-model="cardForm.frontContent"
                api-key="7kdjc9shmflxt8292cfpao9aj9qm7i2vbfbyqc3un3sh1zb3"
                :init="{
                    selector: 'textarea',
                    language: 'zh_CN',
                    height :contentHeight(),
                    plugins: 'lists link image table code help wordcount',
                    images_upload_url: 'postAcceptor.php'
                }"
            /> -->
        </el-col>
        <el-col :span="12" :style="{'background':'#ECEFF1'}">
            <Editor
                v-model="cardForm.backContent"
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
    // border-bottom: 1px dashed var(--el-border-color);
}

</style>
