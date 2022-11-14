<style lang="less">
@import './main.less';
</style>
<template>
    <Layout style="height: 100%" class="main">
        <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider"
               :style="{overflow: 'hidden'}">
            <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed"
                       @on-select="turnToPage" :menu-list="menuList">
                <div class="logo-con">
                    <img v-show="!collapsed" :src="maxLogo" key="max-logo" alt="大Logo">
                    <img v-show="collapsed" :src="minLogo" key="min-logo" alt="小Logo">
                </div>
            </side-menu>
        </Sider>
        <Layout>
            <Header class="header-con">

            </Header>
            <Content class="main-content-con">

            </Content>
        </Layout>
    </Layout>
</template>

<script>
import SideMenu from '@/components/main/components/side-menu/side-menu'
import maxLogo from '@/assets/images/logo.jpg'
import minLogo from '@/assets/images/logo-min.jpg'

export default {
    name: 'Main',
    components: {SideMenu},
    data() {
        return {
            collapsed: false,
            minLogo,
            maxLogo
        }
    },
    // 当其依赖的属性的值发生变化时，计算属性会重新计算，反之，则使用缓存中的属性值。
    // https://www.cnblogs.com/zhilu/p/15252046.html
    computed: {
        menuList() {
            return this.$store.getters.menuList
        }
    },

    methods: {
        turnToPage(route) {
            let {name, params, query} = {}
            if (typeof route === 'string') {
                name = route
            } else {
                name = route.name
                params = route.params
                query = route.query
            }

            if (name.indexOf('isTurnByHref_') > -1) {
                window.open(name.split('_')[1])
                return
            }
            this.$router.push({
                name,
                params,
                query
            })
        }
    }
}
</script>
<style>
</style>