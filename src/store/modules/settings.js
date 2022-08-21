const useSettingsStore = defineStore(
    // 唯一ID
    'settings',
    {
        state: () => ({
            mode: 'pc',
            title: ''
        }),
        actions: {
            // 设置访问模式
            setMode(width) {
                // if (this.layout.enableMobileAdaptation) {
                // 先判断 UA 是否为移动端设备（手机&平板）
                // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                //     this.mode = 'mobile'
                // } else {
                // 如果为桌面设备，再根据页面宽度判断是否需要切换为移动端展示
                if (width < 992) {
                    this.mode = 'mobile'
                } else {
                    this.mode = 'pc'
                }
                // }
                // } else {
                //     this.mode = 'pc'
                // }
            },
            // 设置网页标题
            setTitle(title) {
                this.title = title
            },
            // 设置主题颜色模式
            setColorScheme(color) {
                this.app.colorScheme = color
            },
            // 更新主题配置
            updateThemeSetting(data) {
                Object.assign(this, data)
            }
        }
    }
)

export default useSettingsStore
