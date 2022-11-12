<style lang="less">
@import './main.less';
</style>
<template>
    <Layout style="height: 100%" class="main">
        <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider"
               :style="{overflow: 'hidden'}">
            <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed"
                       @on-select="turnToPage" :menu-list="menuList">

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

export default {
    name: 'Main',
    components: {SideMenu},
    data() {
        return {
            collapsed: false
        }
    },
    // 当其依赖的属性的值发生变化时，计算属性会重新计算，反之，则使用缓存中的属性值。
    // https://www.cnblogs.com/zhilu/p/15252046.html
    computed: {
        menuList() {
            return []
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