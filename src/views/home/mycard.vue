<script setup name="HomeMycard">
// const { proxy } = getCurrentInstance()
const router = useRouter()
import api from '@/api'

// const route = useRoute()

import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

import { reactive } from 'vue'

const formInline = reactive({
    user: '',
    region: ''
})
const newSetForm = reactive({
    setname: '',
    isDisplay: false
})

const showNewSetForm = () => {
    newSetForm.isDisplay = !newSetForm.isDisplay
}

const scrollerHeight = left => {
    if (left)
        return (window.innerHeight - 80) + 'px'
    else
        return (window.innerHeight - 207) + 'px'
}
const goNewCard = () => {
    router.push({ path: '/home/newcard' })
}

const pageData = reactive({
    sets: [],
    cards: [],
    defaultSetId: 0,
    cardLoading: false,
    setLoading: false,
    cardCount: 0,
    currentPage: 1
})

const getPageCards = cpage => {
    // console.log('cpage', cpage)
    pageData.currentPage = cpage
    getCards(pageData.defaultSetId)
}

const getCards = setId => {
    // console.log('setId:', setId)
    // if (setId != pageData.defaultSetId) {
    pageData.defaultSetId = setId
    pageData.cards = []
    pageData.cardLoading = true
    let querydata = {
        '[]': {
            'Card': {
                'set_id': setId,
                '@order': 'id'
            },
            'page': pageData.currentPage - 1,
            'count': 100,
            'query': 2
        },
        'total@': '/[]/total',
        // 'info@': '/[]/info',
        '@datasource': 'hikari'
    }
    api.post('get', querydata).then(res => {
        if (res.ok === true) {
            pageData.cards = res['[]']
            pageData.cardCount = res['total']
            pageData.cardLoading = false
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
    // }
}

const getSets = () => {
    pageData.setLoading = true
    let querydata = {
        '[]': {
            'CardSet': {
                '@role': 'OWNER',
                '@order': 'id'
            }
        },
        '@datasource': 'hikari'
    }
    api.post('get', querydata).then(res => {
        if (res.ok === true) {
            pageData.sets = res['[]']
            pageData.defaultSetId = pageData.sets[0].CardSet.id
            getCards(pageData.defaultSetId)
            pageData.setLoading = false
            // console.log(pageData.sets)
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
getSets()

</script>

<template>
    <el-row>
        <el-col v-loading="pageData.setLoading" :span="6" :style="{height:scrollerHeight(true)}">
            <el-scrollbar>
                <el-row>
                    <el-col>
                        <el-button type="primary" size="large" :icon="Plus" round @click="showNewSetForm">新卡片组</el-button>
                    </el-col>
                </el-row>
                <el-row v-show="newSetForm.isDisplay">
                    <el-col>
                        <el-form :inline="true" size="mini" :model="newSetForm">
                            <el-form-item label="">
                                <el-input v-model="newSetForm.setname" :class="{'setname':1}" placeholder="输入卡片组名称" />
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">新增</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>

                <!-- <el-row>
                    <el-col>
                        <el-card>
                            <div class="card-header">
                                <span>默认组</span>
                                <el-button class="button" text><el-icon><MoreFilled /></el-icon></el-button>
                            </div>
                            <div :inline="true" class="set-item"><el-icon><CopyDocument /></el-icon> 13 张</div>
                        </el-card>
                    </el-col>
                </el-row> -->

                <el-row v-for="set in pageData.sets" :key="set">
                    <el-col>
                        <el-card :style="{'border': '1px solid var(--el-color-primary)'}" @click="getCards(set.CardSet.id)">
                            <div class="card-header">
                                <span>{{ set.CardSet.set_name }}</span>
                                <!-- <el-button class="button" size="mini" text><el-icon><MoreFilled /></el-icon></el-button> -->
                                <el-dropdown size="small">
                                    <el-icon color="var(--el-color-primary)"><MoreFilled /></el-icon>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item v-if="set.CardSet.set_status==0&&set.CardSet.card_num>0">开始学习</el-dropdown-item>
                                            <el-dropdown-item v-if="set.CardSet.set_status==1">修改学习计划</el-dropdown-item>
                                            <el-dropdown-item>重命名</el-dropdown-item>
                                            <el-dropdown-item>分享</el-dropdown-item>
                                            <el-dropdown-item>删除</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                            <div :inline="true" class="set-item">
                                <el-icon color="var(--el-color-primary)"><CopyDocument /></el-icon> {{ set.CardSet.card_num }} 张
                                <el-tag v-if="set.CardSet.set_status == 1" type="success" size="small" round>学习中</el-tag>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-scrollbar>
        </el-col>
        <el-col :span="18">
            <el-row>
                <el-col>
                    <el-form :inline="true" size="mini" :model="formInline">
                        <el-form-item label="关键字">
                            <el-input v-model="formInline.user" placeholder="" />
                        </el-form-item>
                        <el-form-item label="掌握程度">
                            <el-select v-model="formInline.region" placeholder="全部">
                                <el-option label="Zone one" value="shanghai" />
                                <el-option label="Zone two" value="beijing" />
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="onSubmit">筛选</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row v-loading="pageData.cardLoading" :style="{'margin-top':'18px'}">
                <el-col>
                    <el-scrollbar :style="{height:scrollerHeight(false)}">
                        <el-space direction="horizontal" alignment="start">
                            <el-space wrap>
                                <el-card class="new-card" @click="goNewCard">
                                    <div class="new-item">
                                        <p />
                                        <el-icon class="new-button"><Plus /></el-icon>
                                        <p>新卡片</p>
                                    </div>
                                </el-card>
                                <el-card v-for="card in pageData.cards" :key="card" class="box-card">
                                    <div class="card-header">
                                        <span />
                                        <el-dropdown size="small">
                                            <el-icon color="var(--el-color-info-light-5)"><MoreFilled /></el-icon>
                                            <template #dropdown>
                                                <el-dropdown-menu>
                                                    <el-dropdown-item>加入学习</el-dropdown-item>
                                                    <el-dropdown-item>编辑</el-dropdown-item>
                                                    <el-dropdown-item>删除</el-dropdown-item>
                                                </el-dropdown-menu>
                                            </template>
                                        </el-dropdown>
                                    </div>
                                    <div class="card-item">
                                        <div v-html="card.Card.front_content" />
                                    </div>
                                </el-card>
                            </el-space>
                        </el-space>
                    </el-scrollbar>
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="pageData.cardCount"
                        :page-size="100"
                        :hide-on-single-page="true"
                        @current-change="getPageCards"
                        @prev-click="getPageCards"
                        @next-click="getPageCards"
                    />
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
}
.set-item {
    font-size: 16px;
    margin-top: 10px;
    text-align: left;
}
.card-item {
    font-size: 14px;
    // margin-top: 10px;
    text-align: center;
}
.box-card {
    width: 130px;
    height: 160px;
}
.new-card {
    width: 130px;
    height: 160px;
    background-color: #fafafa;
    box-shadow: var(--el-box-shadow-light);
    border: 2px dashed #e0e0e0;
}
.setname {
    width: 150px;
}
.el-form--inline .el-form-item {
    margin-right: 15px;
    margin-bottom: 0;
}
.new-item {
    text-align: center;
}
.new-button {
    font-size: 26px;
}
.el-scrollbar {
    text-align: left;
}
.el-pagination {
    // padding: 5px 10px;
    padding-top: 20px;
    padding-left: 15px;
}
</style>
