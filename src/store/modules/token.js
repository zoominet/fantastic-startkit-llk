import api from '@/api'
import { ElMessage } from 'element-plus'

const useTokenStore = defineStore(
    // 唯一ID
    'token',
    {
        state: () => ({
            token: localStorage.token,
            failuretime: localStorage.failuretime
        }),
        getters: {
            isLogin: state => {
                let retn = false
                if (state.token != null) {
                    let unix = Date.parse(new Date())
                    if (unix < state.failuretime * 1000) {
                        retn = true
                    }
                }
                return retn
            }
        },
        actions: {
            // login() {
            //     return new Promise(resolve => {
            //         // 模拟登录成功，写入 token 信息
            //         localStorage.setItem('token', '1234567890')
            //         localStorage.setItem('failuretime', Date.parse(new Date()) / 1000 + 24 * 60 * 60)
            //         this.token = '1234567890'
            //         this.failuretime = Date.parse(new Date()) / 1000 + 24 * 60 * 60
            //         resolve()
            //     })
            // },
            login(data) {
                return new Promise((resolve, reject) => {
                    api.post('login', data).then(res => {

                        if (res.ok === true) {
                            // console.log(res)
                            localStorage.setItem('token', res.user.id)
                            localStorage.setItem('failuretime', Date.parse(new Date()) / 1000 + 24 * 60 * 60)
                            this.token = res.user.id
                            this.failuretime = Date.parse(new Date()) / 1000 + 24 * 60 * 60
                            resolve(res)
                        } else {
                            ElMessage({
                                type: 'error',
                                showClose: true,
                                message: res.msg
                            })
                        }

                    }).catch(error => {
                        reject(error)
                    })
                })
            },
            logout() {
                return new Promise(resolve => {
                    api.post('logout').then(res => {
                        console.log(res)
                        if (res.ok === true) {
                            // 模拟退出登录，清除 token 信息
                            localStorage.removeItem('token')
                            localStorage.removeItem('failuretime')
                            this.token = null
                            this.failuretime = null
                            // resolve()
                        }
                        // else {
                        //     ElMessage({
                        //         type: 'error',
                        //         showClose: true,
                        //         message: res.msg
                        //     })
                        // }

                    }).catch(error => {
                        // reject(error)
                    })
                    resolve()
                })
            }
        }
    }
)

export default useTokenStore
