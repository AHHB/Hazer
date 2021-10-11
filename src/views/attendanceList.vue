<template>
    <v-container>
        <v-tabs fixed-tabs v-model="tab" centered color="secondary" show-arrows>
            <v-tabs-slider color="primary"></v-tabs-slider>
            <v-tab href="#t-1">حضور و غیاب ها</v-tab>
            <v-tab href="#t-2" @click="stydentg">دانش آموزان</v-tab>
            <v-tab href="#t-3" @click="allg">آمار</v-tab>
            <v-tab href="#t-4">نمایش کلی</v-tab>
            <v-tabs-items v-model="tab" class="pa-lg-5 mt-4 transparent">
                <v-tab-item value="t-1">
                    <v-subheader>مجموع: {{da[0].hg.length}}</v-subheader>
                    <v-expansion-panels focusable>
                        <v-expansion-panel v-for="(item,i) in da[0].hg" :key="i" class="mt-2">
                        <v-expansion-panel-header>
                            تاریخ: {{item.date}} 
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <p v-if="item.title != ''" class="mt-3"> عنوان: {{item.title}}</p>
                            <div v-for="d in da[0].student" :key="d" class="mx-lg-2">
                                <p v-if="d.status[i].status == 0" class="red lighten-4 red--text text--darken-4 pa-3 mb-2 rounded">{{d.fname+' '+d.lname}} <v-icon class="float-left error--text">mdi-account-cancel</v-icon> </p>
                                <p v-if="d.status[i].status == 1" class="green lighten-4 green--text text--darken-4 pa-3 mb-2 rounded">{{d.fname+' '+d.lname}} <v-icon class="float-left success--text">mdi-account-check</v-icon> </p>
                            </div>
                        </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-tab-item>

                <v-tab-item value="t-2">
                    <v-expansion-panels focusable>
                        <v-expansion-panel v-for="(item,i) in da[0].student" :key="i" class="mt-2">
                        <v-expansion-panel-header>
                            {{item.fname+' '+item.lname}}
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <p class="mt-3">{{studentG[i]}} غیبت از {{da[0].hg.length}} حضور و غیاب</p>
                            <div v-for="d in item.status" :key="d">
                                <p v-if="d.status == 0" class="red lighten-4 red--text text--darken-4 pa-3 mb-2 rounded">تاریخ: {{da[0].hg[d.id].date}} <v-icon class="float-left error--text">mdi-account-cancel</v-icon> </p>
                                <p v-if="d.status == 1" class="green lighten-4 green--text text--darken-4 pa-3 mb-2 rounded">تاریخ: {{da[0].hg[d.id].date}} <v-icon class="float-left success--text">mdi-account-check</v-icon> </p>
                            </div>  
                        </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-tab-item>

                <v-tab-item value="t-3">
                    <v-row justify="center" align="center">
                        <v-col lg="2" md="2" sm="3" cols="6">
                            <v-card color="primary lighten-1">
                                <v-responsive :aspect-ratio="16/7">
                                    <v-card-title class="text-center px-auto">
                                       {{da[0].hg.length}}
                                    </v-card-title>
                                    <v-card-text class="text-left font-size-smal mt-n7">
                                       حضور و غیاب 
                                    </v-card-text>
                                </v-responsive>
                            </v-card>
                        </v-col>

                        <v-col lg="2" md="2" sm="3" cols="6">
                            <v-card color="primary lighten-1" elevation="3">
                                <v-responsive :aspect-ratio="16/7">
                                    <v-card-title class="text-center px-auto">
                                       {{allG}}
                                    </v-card-title>
                                    <v-card-text class="text-left font-size-smal mt-n7">
                                        غیبت از {{da[0].hg.length*da[0].student.length}}
                                    </v-card-text>
                                </v-responsive>
                            </v-card>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-sheet color="primary" class="rounded elevation-3">
                                <div class="text-center pt-3 white--text">
                                    <h3>آمار غیبت ها</h3>
                                </div> 
                                <v-sparkline :labels="labels" :value="dayG" color="rgba(255, 255, 255, .7)" height="130" padding="24" stroke-linecap="round"></v-sparkline>
                            </v-sheet>
                        </v-col>
                    </v-row>

                </v-tab-item>

                <v-tab-item value="t-4">
                   <div class="overflow-x">
                        <table class="tbl">
                            <tr>
                                <th>نام:</th>
                                <th>نام خانوادگی:</th>
                                <th v-for="t in da[0].hg" :key="t">{{t.date.replace('-','/').replace('-','/')}}</th>
                            </tr>
                            <tr v-for="(item,i) in da[0].student" :key="i">
                                <td>{{item.fname}}</td>
                                <td>{{item.lname}}</td>
                                <td v-for="d in item.status" :key="d">
                                    <p v-if="d.status == 1" class="green--text text--darken-3 green lighten-3 ma-0 pa-0 w-100 h-100">ح</p>
                                    <p v-if="d.status == 0" class="red--text text--darken-3 red lighten-3 ma-0 pa-0 w-100 h-100">غ</p>
                                </td>
                            </tr>
                        </table>
                   </div>
                </v-tab-item>
            </v-tabs-items>
        </v-tabs>
    </v-container>
</template>

<script>
import {data_read} from '../data'

export default {
    name:'attendanceList',

    data(){
        return{
            da: data_read('class',Number(sessionStorage.getItem("class"))),
            tab: null,
            studentG: [],
            allG: 0,
            dayG: [],
            daygS: true,
            labels: [],
        }
    },

    methods:{
        stydentg(){
            var studentGCount = 0
            this.studentG = []
            this.dayG = []
            this.da[0].student.forEach(element => {
                element.status.forEach(d => {
                    if(d.status == 0){
                        studentGCount += 1
                    }
                });
                this.studentG.push(studentGCount)
                studentGCount = 0
            });
        },

        allg(){
            this.allG = 0
            var daygCount = 0
            this.da[0].student.forEach(element => {
                element.status.forEach(d => {
                    if(d.status == 0){
                        this.allG += 1
                    }
                });
            });

            if(this.daygS){
                this.daygS = false
                for (let i = 0; i < this.da[0].hg.length; i++) {
                this.da[0].student.forEach(element => {
                    element.status.forEach(e => {
                        if(e.status == 0 && e.id == i){
                            daygCount += 1
                        }
                    });
                });
                this.dayG.push(daygCount)
                daygCount = 0
                }

                this.da[0].hg.forEach(element => {
                    this.labels.push(element.date.replace("-", "/").slice(2).replace("-", "/"))
                });
            }
        },

    },

    beforeMount(){
        if(!sessionStorage.getItem('class')){
            this.$router.push('/')
        }     
    }
}
</script>