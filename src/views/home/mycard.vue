<script setup name="HomeMycard">
// const { proxy } = getCurrentInstance()
const router = useRouter()
import api from '@/api'

// const route = useRoute()

import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

import { reactive } from 'vue'

const formSearch = reactive({
    keyword: '',
    keyscore: '',
    keyflag: ''
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
        return (window.innerHeight - 20) + 'px'
    else
        return (window.innerHeight - 136) + 'px'
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
            // getCards(pageData.defaultSetId)
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
        <el-col v-loading="pageData.setLoading" :span="6" :style="{height:scrollerHeight(true),'border-right':'1px solid #d9dfe8'}">
            <el-scrollbar>
                <el-row>
                    <el-col>
                        <el-button size="large" :icon="Plus" round @click="showNewSetForm">新卡集</el-button>
                    </el-col>
                </el-row>
                <el-row v-show="newSetForm.isDisplay">
                    <el-col>
                        <el-form :inline="true" size="mini" :model="newSetForm">
                            <el-form-item label="">
                                <el-input v-model="newSetForm.setname" :class="{'setname':1}" placeholder="输入新卡集名称" />
                            </el-form-item>
                            <el-form-item>
                                <el-button @click="onSubmit">新增</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>

                <!-- <el-row v-for="i in 20" :key="set">
                    <el-col>
                        <el-card>
                            <div class="card-header">
                                <span>默认组</span>
                                <el-dropdown size="small">
                                    <el-icon color="var(--el-color-primary)"><MoreFilled /></el-icon>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item>开始学习</el-dropdown-item>
                                            <el-dropdown-item>修改学习计划</el-dropdown-item>
                                            <el-dropdown-item>重命名</el-dropdown-item>
                                            <el-dropdown-item>删除</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                            <div :inline="true" class="set-item"><el-icon><CopyDocument /></el-icon> 13 张</div>
                        </el-card>
                    </el-col>
                </el-row> -->

                <el-row v-for="set in pageData.sets" :key="set">
                    <el-col>
                        <el-card :style="{'border': '1px solid var(--el-color-primary)'}" shadow="hover" @click="getCards(set.CardSet.id)">
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
                                            <!-- <el-dropdown-item>分享</el-dropdown-item> -->
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
                <el-col :span="4">
                    <el-button type="primary" size="large" :icon="Plus" round @click="goNewCard">新卡片</el-button>
                </el-col>
                <el-col :span="20" :style="{'text-align':'right'}">
                    <el-form :inline="true" size="mini" :model="formSearch">
                        <el-form-item label="">
                            <el-input v-model="formSearch.keyword" placeholder="关键字" />
                        </el-form-item>
                        <el-form-item label="">
                            <el-select v-model="formSearch.keyscore" :style="{'width':'100px'}" placeholder="掌握程度">
                                <el-option label="困难" value="1" />
                                <el-option label="良好" value="2" />
                                <el-option label="简单" value="3" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="">
                            <el-select v-model="formSearch.keyflag" :style="{'width':'100px'}" placeholder="旗标">
                                <el-option label="1" value="1">
                                    <el-icon><Flag /></el-icon>
                                </el-option>
                                <el-option label="2" value="2">
                                    <el-icon><Flag /></el-icon>
                                </el-option>
                                <el-option label="3" value="3">
                                    <el-icon><Flag /></el-icon>
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="formSearchSubmit">搜索</el-button>
                        </el-form-item>
                        <el-form-item :style="{'margin-right':'0'}">
                            <el-button link size="small" @click="formSearchReset">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row v-loading="pageData.cardLoading" :style="{'margin-top':'10px'}">
                <el-col>
                    <el-scrollbar :style="{height:scrollerHeight(false),'background':'var(--el-color-info-light-9)','padding':'10px'}">
                        <el-space direction="horizontal" alignment="start">
                            <el-space wrap>
                                <!-- <el-card class="new-card" @click="goNewCard">
                                    <div class="new-item">
                                        <p />
                                        <el-icon class="new-button"><Plus /></el-icon>
                                        <p>新卡片</p>
                                    </div>
                                </el-card> -->

                                <el-card v-for="card in pageData.cards" :key="card" class="box-card" shadow="hover">
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
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="pageData.cardCount"
                        :page-size="100"
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
    margin-top: -10px;
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
    margin: -10px;
}
.box-card {
    width: 130px;
    height: 160px;
    overflow: hidden;
}
.new-card {
    width: 130px;
    height: 160px;
    // background-color: #fafafa;
    box-shadow: var(--el-box-shadow-light);
    border: 1px dashed #e0e0e0;
}
.setname {
    width: 150px;
}
.el-form--inline .el-form-item {
    margin-right: 10px;
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
    justify-content: center;
}
</style>
