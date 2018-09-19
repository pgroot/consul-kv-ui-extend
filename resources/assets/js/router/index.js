import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);


export default new VueRouter({
    saveScrollPosition: true,
    routes: [
        {
            path: '/dashboard',
            component: resolve => require(['../components/Dashboard'], resolve),
        }
    ]
});
