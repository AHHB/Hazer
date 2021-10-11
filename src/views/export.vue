<template>

    <v-container>

        <v-snackbar v-model="snackbar" :timeout="snackbarTime" :color="snackbarColor" >
            {{ snackbarText }}
            <template v-slot:action="{ attrs }">
                <v-btn color="blue darken-4" text v-bind="attrs" @click="snackbar = false">بستن</v-btn>
            </template>
        </v-snackbar>

        <v-card class="pa-4" v-if="!sht">
            <v-row>
                <v-col cols="12"> <p>تاریخ مورد نظر:</p> </v-col>
                <v-col lg="3" md="4" sm="5" cols="6">
                    <v-select outlined label="از" :items="date" item-text="item" item-value="val" @click="setDate" v-model="dateFrom"></v-select>
                </v-col>
                <v-col lg="3" md="4" sm="5" cols="6">
                    <v-select outlined label="تا" :items="date" item-text="item" item-value="val" @click="setDate" v-model="dateTo"></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-checkbox label="نام آموزگار" v-model="teachName"></v-checkbox>
                </v-col>
            </v-row>

            <v-row>
                <v-col lg="6" md="8" sm="10" cols="12">
                    <v-checkbox label="درج عنوان" v-model="titr"></v-checkbox>
                    <v-textarea outlined counter label="متن عنوان" v-model="titrText" v-if="titr"></v-textarea>
                </v-col>
                
            </v-row>

            <v-row>
                <v-col cols="12">
                    <v-btn large color="primary" @click="showTbl">نمایش</v-btn>
                </v-col>
            </v-row>

        </v-card>

        <v-card class="pa-4" v-if="sht">
            <v-btn large color="accent" class="ma-2" @click="print"> <v-icon>mdi-printer</v-icon> چاپ لیست</v-btn>
            <v-btn large color="accent" class="ma-2" @click="printExel"> <v-icon>mdi-file-table-outline</v-icon> دانلود فایل اکسل</v-btn>
            <hr class="my-3">
            <div class="overflow-x pa-3 text-right" id="print">
                <div class="right-align text-right right float-right" style="direction: rtl; background-color: #a1a1a12f;">
                <div class="pa-1 p-1" v-if="titr">
                    <h4>عنوان:{{titrText}}</h4>
                </div>
                <div class="pa-1 p-1" v-if="teachName">
                    <h5>آموزگار:{{teach}}</h5>
                </div>
                <table class="tbl table table-sm table-bordered table-striped text-center centered right" id="tbl">
                    <tr style="height: 70px;">
                        <th>نام:</th>
                        <th>نام خانوادگی:</th>
                        <th v-for="t in hgDate" :key="t" class="p-0 m-0"><h6 class="p-0 m-0" style="transform: rotate(90deg) TranslateX(48px);width: 15px;font-size: 12px;">{{t.date.replace('-','/').replace('-','/')}}</h6></th>
                    </tr>
                    <tr v-for="(item,i) in da[0].student" :key="i">
                        <td>{{item.fname}}</td>
                        <td>{{item.lname}}</td>
                        <td v-for="d in hgStudent[i]" :key="d" class="p-0 h-0" style="width: 15px;">
                            <p v-if="d.status == 1" class="green--text text--darken-3 green lighten-3 ma-0 pa-0 m-0 p-0 w-100 h-100 text-success">ح</p>
                            <p v-if="d.status == 0" class="red--text text--darken-3 red lighten-3 ma-0 pa-0 m-0 p-0 w-100 h-100 text-danger">غ</p>
                        </td>
                    </tr>
                </table>
                </div>
            </div>
        </v-card>


    </v-container>
    
</template>

<script>
import {data_read} from '../data'
import TableToExcel from "@linways/table-to-excel";

export default {
    name: 'exportList',

    data(){
        return{
            da: data_read('class',Number(sessionStorage.getItem("class"))),
            sht: false ,
            date: [],
            dateFrom: null ,
            dateTo: null ,
            teachName: true,
            teach: localStorage.getItem('teachName'),
            titr: false,
            snackbar: false,
            snackbarColor: 'success',
            snackbarTime: 3000,
            snackbarText: "حضور و غیاب با موفقیت انجام شد",
            hgDate: [],
            hgStudent: []
        }
    },

    methods:{
        setDate(){
            this.da[0].hg.forEach(element => {
                this.date.push({item: element.date.replaceAll('-','/') , val: element.id})
            });
        },

        showTbl(){
            if(this.dateFrom < this.dateTo){
                this.da[0].hg.forEach(element => {
                    if(element.id >= this.dateFrom && element.id <= this.dateTo){
                        this.hgDate.push(element)
                    }
                });

                var st = []

                this.da[0].student.forEach(element => {
                    element.status.forEach(d => {
                        if(d.id >= this.dateFrom && d.id <= this.dateTo){
                            st.push(d)
                        }
                    });
                    this.hgStudent.push(st)
                    st = []
                });
                this.sht = true
            }else{
                if(this.dateFrom == this.dateTo){
                    this.snackbarText = "تاریخ شروع و پایان در یک روز است"
                }else{
                    this.snackbarText = "تاریخ شروع بعد از تاریخ پایان است"
                }
                this.snackbarColor = 'error'
                this.snackbar = true
            }
        },

        print(){
            this.$htmlToPaper('print');
        },

        printExel(){
            var name = "کلاس " + this.da[0].name+" از " + this.da[0].hg[this.dateFrom].date + " تا " + this.da[0].hg[this.dateTo].date
            TableToExcel.convert(document.getElementById("tbl"), {
                name: name+".xlsx",
                sheet: {
                    name: "Sheet 1"
                }
            });
        }

    },

}
</script>