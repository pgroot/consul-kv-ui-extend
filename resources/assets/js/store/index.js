import Vuex from 'vuex'
import Vue from 'vue'
import _ from 'lodash'

Vue.use(Vuex)


let store = new Vuex.Store({
    state: {
        snackbar: {
            visible: false,
            color: 'success',
            multiLine: false,
            timeout: 10 * 1000,
            vertical: false,
            top: true,
            right: false,
            bottom: false,
            left: false,
            text: null,
            closeable: true
        },
        dcs: [],
        fullpageLoading: false,
        currentDc: [],
        currentDcName: '',
        drawer: true
    },
    getters: {

    },
    mutations: {
        snackBarState: (state, options) => {
            let opt = state.snackbar
            state.snackbar = _.assign(opt, options)
        },
        setDcsList: (state, dcs) => {
            _.each(dcs, (team) => {
                _.map(team.dcs, (dc) => {
                    dc.checked = _.indexOf(state.currentDcName.split(","), dc.name) >= 0
                })
            })
            state.dcs = dcs
        },
        setFullpageLoading: (state, loading) => {
            state.fullpageLoading = loading
        },
        setCurrentDc: (state, project) => {
            state.currentDc = project
            let keys = []
            _.each(project, (p) => {
                keys.push(p.projectKey)
            })
            state.currentDcName = keys.join(',')
        },
        setDrawerState: (state, visible) => {
            state.drawer = visible
        }
    },
    actions: {}
});

export default store
