<template>
    <v-app id="inspire">
        <v-navigation-drawer
                :clipped="$vuetify.breakpoint.lgAndUp"
                v-model="drawer"
                fixed
                app
        >
            <v-list dense>
                <template v-for="item in items">
                    <v-layout
                            v-if="item.heading"
                            :key="item.heading"
                            row
                            align-center
                    >
                        <v-flex xs6>
                            <v-subheader v-if="item.heading">
                                {{ item.heading }}
                            </v-subheader>
                        </v-flex>
                        <v-flex xs6 class="text-xs-center">
                            <a href="#!" class="body-2 black--text">EDIT</a>
                        </v-flex>
                    </v-layout>
                    <v-list-group
                            v-else-if="item.children"
                            v-model="item.model"
                            :key="item.text"
                            :prepend-icon="item.model ? item.icon : item['icon-alt']"
                            append-icon=""
                    >
                        <v-list-tile slot="activator">
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ item.text }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile
                                v-for="(child, i) in item.children"
                                :key="i"
                                @click="redirectToLink(child)"
                        >
                            <v-list-tile-action v-if="child.icon">
                                <v-icon>{{ child.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ child.text }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-group>
                    <v-list-tile v-else :key="item.text" @click="redirectToLink(item)">
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ item.text }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar
                :clipped-left="$vuetify.breakpoint.lgAndUp"
                color="blue darken-3"
                dark
                app
                fixed
        >
            <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
                <v-toolbar-side-icon @click.stop="handleDrawerClick"></v-toolbar-side-icon>
                <span class="hidden-sm-and-down">Consul KV</span>
            </v-toolbar-title>
            <v-text-field
                    flat
                    solo-inverted
                    hide-details
                    prepend-inner-icon="search"
                    label="Search"
                    class="hidden-sm-and-down"
            ></v-text-field>
            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-btn flat slot="activator" @click="dcSelectorVisible = true">
                    {{currentDcs || 'Please select a project' }}
                    <v-icon>keyboard_arrow_down</v-icon>
                </v-btn>
                <data-center-selector :visible.sync="dcSelectorVisible"></data-center-selector>
            </v-toolbar-items>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height>
                <slot></slot>
            </v-container>
        </v-content>
        <v-btn
                fab
                bottom
                right
                color="pink"
                dark
                fixed
                @click.stop="dialog = !dialog"
        >
            <v-icon>add</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" width="800px">
            <v-card>
                <v-card-title
                        class="grey lighten-4 py-4 title"
                >
                    Create contact
                </v-card-title>
                <v-container grid-list-sm class="pa-4">
                    <v-layout row wrap>
                        <v-flex xs12 align-center justify-space-between>
                            <v-layout align-center>
                                <v-avatar size="40px" class="mr-3">
                                    <img
                                            src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                                            alt=""
                                    >
                                </v-avatar>
                                <v-text-field
                                        placeholder="Name"
                                ></v-text-field>
                            </v-layout>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field
                                    prepend-icon="business"
                                    placeholder="Company"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field
                                    placeholder="Job title"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                    prepend-icon="mail"
                                    placeholder="Email"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                    type="tel"
                                    prepend-icon="phone"
                                    placeholder="(000) 000 - 0000"
                                    mask="phone"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                    prepend-icon="notes"
                                    placeholder="Notes"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-card-actions>
                    <v-btn flat color="primary">More</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
                    <v-btn flat @click="dialog = false">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar
                v-model="snackbar.visible"
                :color="snackbar.color"
                :multi-line="snackbar.multiLine"
                :timeout="snackbar.timeout"
                :top="snackbar.top"
                :bottom="snackbar.bottom"
                :left="snackbar.left"
                :right="snackbar.right"
                :vertical="snackbar.vertical"
        >
            {{ snackbar.text }}
            <v-btn
                    v-if="snackbar.closeable"
                    dark
                    flat
                    @click="closeSnackBar"
            >
                Close
            </v-btn>
        </v-snackbar>

        <div class="fullpage-loading" v-if="fullpageLoading">
            <v-progress-circular
                    :width="3"
                    :size="50"
                    color="green"
                    indeterminate
            ></v-progress-circular>
        </div>
    </v-app>
</template>

<script>
    import items from '../menu'
    import DataCenterSelector from '../modules/DataCenterSelector'

    export default {
        data: () => ({
            dialog: false,
            items: items,
            drawer: true,
            dcSelectorVisible: false
        }),
        computed: {
            snackbar() {
                return this.$store.state.snackbar
            },
            fullpageLoading() {
                return this.$store.state.fullpageLoading
            },
            currentDcs() {
                let projects = this.$store.state.currentDc
                if(!projects) {
                    return null
                }
                if(projects.length === 1) {
                    return projects[0].name
                }
                return projects ? projects.length + "  DCs" : null
            }
        },
        methods: {
            redirectToLink(item) {
                this.$router.push(item.link)
            },
            closeSnackBar() {
                this.$store.commit('snackBarState', {
                    visible: false,
                    text: null
                })
            },
            handleDrawerClick() {
                this.drawer = !this.drawer
                this.$store.commit('setDrawerState', !this.drawer)
                localStorage.setItem('drawer', this.drawer ? 'open' : 'close')
            }
        },
        components: {
            DataCenterSelector
        },
        created() {
            this.drawer = localStorage.getItem('drawer') === 'open'
        }
    }
</script>
<style>
    .fullpage-loading {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(255,255,255, .5);
        z-index: 999;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
