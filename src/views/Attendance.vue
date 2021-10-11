<template>
    <v-container>

        <v-snackbar v-model="snackbar" :timeout="snackbarTime" :color="snackbarColor" >
            {{ snackbarText }}
            <template v-slot:action="{ attrs }">
                <v-btn color="blue darken-4" text v-bind="attrs" @click="snackbar = false">بستن</v-btn>
            </template>
        </v-snackbar>

        <v-card  elevation="2" class="pa-3" v-if="!hgStatus">
            <v-card-title>حضور و غیاب</v-card-title>
            <v-card-subtitle class="font-size-smal">توضیحات برای لیست حضور و غیاب</v-card-subtitle>
            <v-card-text>
                <v-row>
                    <v-col class="mt-2" cols="12" lg="1" md="3" sm="12"> تاریخ: <i class="red--text">*</i></v-col>
                    <v-col class="pa-1" lg="2" md="3" sm="4" cols="4"> <v-select outlined label="روز" :items="d" v-model="vd" :hint="vd" persistent-hint></v-select> </v-col>
                    <v-col class="pa-1" lg="2" md="3" sm="4" cols="4"> <v-select outlined label="ماه" :items="m" item-text="Month" item-value="value" v-model="vm" :hint="vm" persistent-hint></v-select> </v-col>
                    <v-col class="pa-1" lg="2" md="3" sm="4" cols="4"> <v-select outlined label="سال" :items="s" v-model="vs" :hint="vs" persistent-hint></v-select> </v-col>
                </v-row>
                <v-row>
                    <v-col class="mt-2" cols="12" lg="1" md="2" sm="3"> عنوان:</v-col>
                    <v-col class="pa-1" lg="3" md="6" sm="9" cols="12">
                        <v-text-field outlined label="عنوان" placeholder="اختیاری" v-model="vTitle"></v-text-field>
                    </v-col>
                </v-row>
                <v-btn color="primary" large block @click="setHg">تایید</v-btn>
            </v-card-text>
        </v-card>

        <v-btn color="success" block x-large class="mb-6 mt-4" v-if="hgStatus" @click="saveHg">ذخیره</v-btn>

        <v-card class="mx-auto mt-3" max-width="650" v-if="hgStatus">
            <v-list two-line>
                <v-list-item-group v-model="selected" active-class="green lighten-4 green--text text--darken-4" multiple>
                    <template v-for="(item, index) in da[0].student">
                    <v-list-item :key="item.id"  class="pa-2">
                        <template v-slot:default="{ active }">
                        <v-list-item-content>
                            <v-list-item-title v-text="item.fname+' '+item.lname"></v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-icon v-if="!active" color="grey lighten-1">mdi-star-outline</v-icon>
                            <v-icon v-else color="yellow darken-4">mdi-star</v-icon>
                        </v-list-item-action>
                        </template>
                    </v-list-item>
                    <v-divider v-if="index < da[0].student.length - 1" :key="index"></v-divider>
                    </template>
                </v-list-item-group>
            </v-list>
        </v-card>

    </v-container>
</template>

<script>
import {data_read,data_update} from '../data'

var date = new Date();

export default {
    data(){
        return{
            d: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
            m: [{ Month: 'فروردین', value: 1 },{ Month: 'اردیبهشت', value: 2 },{ Month: 'خرداد', value: 3 },{ Month: 'تیر', value: 4 },{ Month: 'مرداد', value: 5 },{ Month: 'شهریور', value: 6 },{ Month: 'مهر', value: 7 },{ Month: 'آبان', value: 8 },{ Month: 'آذر', value: 9 },{ Month: 'دی', value: 10 },{ Month: 'بهمن', value: 11 },{ Month: 'اسفند', value: 12 }],
            s: [1399,1400,1401,1402,1403,1404,1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420],
            vd: 0,
            vm: 0,
            vs: 0,
            vTitle: '',
            hgStatus: false,
            snackbar: false,
            stId: 0,
            snackbarColor: 'error',
            snackbarTime: 2000,
            snackbarText: "فیلد تاریخ اجباری است",
            da: data_read('class',Number(sessionStorage.getItem("class"))),
            headers: [{ text: 'نام:', align: 'start', value: 'fname' },{ text: 'نام خانوادگی:', align: 'start', value: 'lname' },{ text: 'وضعیت', align: 'start', value: 'st', sortable: false  },],
            icon: 'mdi-account-cancel-outline',
            color: 'error',
            selected: [],
        }
    },

    methods:{
        setHg(){
            if(this.vd != 0 && this.vm != 0 && this.vs != 0){
                this.stId = this.da[0].hg.length
                this.da[0].hg.push({id: this.stId , date: this.vs+'-'+this.vm+'-'+this.vd ,title: this.vTitle })
                this.hgStatus = true
            }else{
                this.snackbarText= "فیلد تاریخ اجباری است",
                this.snackbar = true
            }
        },
        saveHg(){
            var isSelect = false
            var lCount = 0
            this.da[0].student.forEach(element => {
                this.selected.forEach(element => {
                    if(element == lCount){
                        isSelect =true
                    }
                });
                if(isSelect){
                    element.status.push({id: this.stId , status: 1})
                    lCount += 1
                    isSelect = false
                }else{
                    element.status.push({id: this.stId , status: 0})
                    lCount += 1
                }
            });
            data_update('class',sessionStorage.getItem('class'),this.da[0])
            sessionStorage.setItem('hgs',1)
            this.$router.go(-1)
        }

    },

    beforeMount(){
        if(!sessionStorage.getItem('class')){
            this.$router.push('/')
        }
    }
}
</script>