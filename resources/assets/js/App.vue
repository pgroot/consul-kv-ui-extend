<template>
    <layout>
        <router-view></router-view>
    </layout>
</template>

<script>
    import Layout from './layouts/Default'
    import {getAllDcs} from './services'

    export default {
        name: 'App',
        components: {
            Layout
        },
        computed: {
            currentDcName() {
                return this.$store.state.currentDcName
            }
        },
        mounted() {
            try {
                let project = localStorage.getItem('currentDc')
                if(project) {
                    project = JSON.parse(project)
                    this.$store.commit('setCurrentDc', project)
                }
            } catch(e) {
                console.log(e)
            }
            this.getAllDcs()
            if(!this.currentDcName) {
                this.$router.push('/dashboard')
            }
        },
        methods: {
            getAllDcs() {
                this.$store.commit('setFullpageLoading', true)
                getAllDcs().then(res => {
                    this.$store.commit('setDcsList', res)
                    this.$store.commit('setFullpageLoading', false)
                }).catch(err => {
                    this.$store.commit('snackBarState', {
                        visible: true,
                        text: err
                    })
                }).then(() => {
                    this.$store.commit('setFullpageLoading', false)
                })
            }
        }
    }
</script>

<style scoped>

</style>
