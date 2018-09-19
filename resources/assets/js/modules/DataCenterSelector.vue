<template>
    <v-layout row justify-center>
        <v-dialog v-model="visible" scrollable max-width="500px" persistent>
            <v-card>
                <v-card-title>Select Data Center</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 300px;">
                    <v-checkbox
                            v-for="(dc, index) in dcs"
                            :key="index"
                            :label="dc.name"
                            v-model="dc.checked"
                            @change="handleChange"
                    ></v-checkbox>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue darken-1" flat @click.native="close">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="select">Select</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    import _ from 'lodash'

    export default {
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            multi: {
                type: Boolean,
                default: false
            }
        },
        computed: {

        },
        data () {
            return {
                dcs: [],
                dialog: false
            }
        },
        methods: {
            handleChange() {

            },
            close() {
                this.$emit('update:visible', false)
            },
            select() {

                this.close()
            }
        }
    }
</script>

<style scoped>

</style>