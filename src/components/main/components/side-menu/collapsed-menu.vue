<template>
    <Dropdown ref="dropdown" @on-click="handleClick" :class="hideTitle ? '' : 'collapsed-menu-dropdown'"
              :transfer="hideTitle" :placement="placement">
        <a class="drop-menu-a" type="text" @mousemove="handleMousemove($event, children)"
           :style="{textAlign: !hideTitle ? 'left' : ''}">
            <common-icon :size="rootIconSize" :color="textColor" :type="parentItem.icon"/>
            <span class="menu-title" v-if="!hideTitle">{{ showTitle(parentItem) }}</span>
            <Icon style="float: right;" v-if="!hideTitle" type="ios-arrow-forward" :size="16"/>
        </a>
        <!--v-slot指令以及动态插槽的使用 https://www.jianshu.com/p/0d54f6a65fda-->
        <template v-slot:list>
            <DropdownMenu ref="dropdown">
                <template v-for="child in children">
                    <collapsed-menu v-if="showChildren(child)" :icon-size="iconSize" :parent-item="child"
                                    :key="`drop-${child.name}`"></collapsed-menu>
                    <DropdownMenu v-else :key="`drop-${child.name}`" :name="child.name">
                        <common-icon :size="iconSize" :type="child.icon"/>
                        <span class="menu-title">{{ showTitle(child) }}</span>
                    </DropdownMenu>
                </template>
            </DropdownMenu>
        </template>
    </Dropdown>
</template>

<script>
import itemMixin from '@/components/main/components/side-menu/item-mixin'
import CommonIcon from '@/components/common-icon/common-icon'
import mixin from '@/components/main/components/side-menu/mixin'

export default {
    name: 'CollapsedMenu',
    components: {CommonIcon},
    mixins: [mixin, itemMixin],
    props: {
        hideTitle: {
            type: Boolean,
            default: false
        },
        rootIconSize: {
            type: Number,
            default: 16
        }
    },
    data() {
        return {
            placement: 'right-end'
        }
    },
    methods: {
        handleClick(name) {
            // vue 为每个组件对象提供了一个内置方法 $emit ，它等同于自定义事件中的 new Event,trigger 等
            // 父组件可以使用 props 把数据传给子组件。
            // 子组件可以使用 $emit 触发父组件的自定义事件。
            // https://www.jianshu.com/p/300e331fdbb6
            this.$emit('on-click', name)
        },
        handleMousemove(event, childrent) {
            const {pageY} = event
            const height = childrent.length * 38
            const isOverflow = pageY + height < window.innerHeight
            this.placement = isOverflow ? 'right-start' : 'right-end'
        }
    }
}
</script>

<style scoped>

</style>