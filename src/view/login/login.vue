<style lang="less">
@import './login.less';
</style>

<template>
    <div class="login">
        <div class="login-con">
            <Card icon="log-in" title="欢迎登录" :bordered="false">
                <div class="form-con">
                    <login-form @on-success-valid="handleSubmit"></login-form>
                    <p class="login-tip">输入任意用户名和密码即可</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import LoginForm from '@/components/login-form'
import {mapActions} from 'vuex'

export default {
    name: 'login',
    components: {
        LoginForm
    },
    methods: {
        ...mapActions([
            'handleLogin',
            'getUserInfo'
        ]),
        handleSubmit({username, password}) {
            this.handleLogin({username, password}).then(res => {
                console.log(res)
                this.getUserInfo().then(res => {
                    console.log(res)
                    // 详解 router.push() https://xie.infoq.cn/article/ede331cef7631470bf260b065
                    this.$router.push({
                        name: this.$config.homeName
                    })
                })
            })
        }
    }
}
</script>

<style>

</style>
