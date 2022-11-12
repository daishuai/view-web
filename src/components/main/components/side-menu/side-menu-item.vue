<template>
    <Submenu :name="`${parentName}`">
        <template v-slot:title>
            <common-icon :type="parentItem.icon || ''"/>
            <span>{{ showTitle(parentItem) }}</span>
        </template>
        <template v-for="item in children">
            <template v-if="item.children && item.children.length === 1">
                <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`"
                                :parent-item="item"></side-menu-item>
                <menu-item v-else :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name()}`">
                    <common-icon :type="item.children[0].icon() || ''"/>
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
    </Submenu>
</template>

<script>
import mixin from '@/components/main/components/side-menu/mixin'
import itemMixin from '@/components/main/components/side-menu/item-mixin'

export default {
    name: 'SideMenuItem',
    //混合 (mixins) 是一种分发 Vue 组件中可复用功能的非常灵活的方式。混合对象可以包含任意组件选项。当组件使用混合对象时，所有混合对象的选项将被混入该组件本身的选项
    // https://www.jianshu.com/p/a72bf060eeaa
    mixins: [mixin, itemMixin]
}
</script>

<style scoped>

</style>