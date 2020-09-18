import Vue from 'vue';
import VueRouter from 'vue-router';
import Upload from './components/Upload';
import Csv from './components/Csv';

Vue.use(VueRouter)

export const router = new VueRouter({
    routes: [
        {path: '/', component: Upload},
        {path: '/csv', component: Csv}
    ]
})