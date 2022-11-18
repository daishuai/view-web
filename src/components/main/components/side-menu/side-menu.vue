<template>
    <div class="side-menu-wrapper">
        <slot></slot>
        <Menu ref="menu" v-show="!collapsed" :active-name="activeName" :open-names="openNames" :accordion="accordion"
              :theme="theme" width="auto" @on-select="handleSelect">
            <template v-for="item in menuList">
                <template v-if="item.children && item.children.length === 1">
                    <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`"
                                    :parent-item="item"></side-menu-item>
                    <menu-item v-else :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`">
                        <common-icon :type="item.children[0].icon || ''"/>
                        <span>{{ showTitle(item.children[0]) }}</span>
                    </menu-item>
                </template>
                <template v-else>
                    <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`"
                                    :parent-item="item"></side-menu-item>
                    <menu-item v-else :name="getNameOrHref(item)" :key="`menu-${item.name}`">
                        <common-icon :type="item.icon || ''"/>
                        <span>{{ showTitle(item) }}</span>
                    </menu-item>
                </template>
            </template>
        </Menu>
        <!--侧边栏被收起来-->
        <div class="menu-collapsed" v-show="collapsed">
            <template v-for="item in menuList">
                <collapsed-menu v-if="item.children && item.children.length > 1" @on-click="handleSelect" hide-title
                                :root-icon-size="rootIconSize" :icon-size="iconSize" :theme="theme" :parent-item="item"
                                :key="`drop-menu-${item.name}`"></collapsed-menu>
                <Tooltip transfer v-else
                         :content="showTitle(item.children && item.children[0] ? item.children[0] : item)"
                         placement="right" :key="`drop-menu-${item.name}`">
                    <a @click="handleSelect(getNameOrHref(item, true))" class="drop-menu-a"
                       :style="{textAlign: 'center'}">
                        <common-icon :size="rootIconSize" :color="textColor"
                                     :type="item.icon || (item.children && item.children[0].icon)"/>
                    </a>
                </Tooltip>
            </template>
        </div>
    </div>
</template>

<script>
import SideMenuItem from '@/components/main/components/side-menu/side-menu-item'
import mixin from '@/components/main/components/side-menu/mixin'
import CollapsedMenu from '@/components/main/components/side-menu/collapsed-menu'
import itemMixin from '@/components/main/components/side-menu/item-mixin'
import {getUnion} from '@/libs/tools'

export default {
    name: 'SideMenu',
    mixins: [mixin, itemMixin],
    components: {CollapsedMenu, SideMenuItem},
    // 父组件通过 props 向下传递数据给子组件；子组件通过 events 给父组件发送消息
    // https://www.jianshu.com/p/89bd18e44e73
    props: {
        collapsed: {
            type: Boolean
        },
        theme: {
            type: String,
            default: 'dark'
        },
        accordion: Boolean,
        activeName: {
            type: String,
            default: ''
        },
        openNames: {
            type: Array,
            default: () => []
        },
        rootIconSize: {
            type: Number,
            default: 20
        },
        iconSize: {
            type: Number,
            default: 16
        },
        menuList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            openedNames: []
        }
    },
    methods: {
        handleSelect(name) {
            this.$emit('on-select', name)
        },
        getOpenedNamesByActiveName(name) {
            return this.$route.matched.map(item => item.name).filter(item => item !== name)
        }
    },
    // 值发生变化时触发
    // https://www.jianshu.com/p/b70f1668d08f
    watch: {
        // activeName属性值发生变化时触发
        activeName(name) {
            if (this.accordion) {
                this.openNames = this.getOpenedNamesByActiveName(name)
            } else {
                this.openNames = getUnion(this.openNames, this.getOpenedNamesByActiveName(name))
            }
        }
    }
}
</script>

<style lang="less">
@import './side-menu.less';
</style>