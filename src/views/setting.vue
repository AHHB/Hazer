<template>
    <v-container>

        <v-banner single-line> <v-icon slot="icon" color="accent" size="25" class="mb-2">mdi-cog</v-icon> تنظیمات </v-banner>

        <div class="mb-3 mt-10 mr-n5">
            <v-subheader class="font-size-smal">تنظیمات کلی</v-subheader>
        </div>

        <v-row>
            <v-col lg="4" md="5" sm="6" cols="7">
                <v-text-field outlined label="نام معلم" v-model="teachName"></v-text-field>
            </v-col>
            <v-col>
                <v-btn outlined large color="accent" class="pa-5 mt-1" @click="techSave"> <v-icon size="35">mdi-content-save-edit</v-icon> </v-btn>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-btn color="error" large @click="dialog = true"> <v-icon>mdi-delete-alert</v-icon> پاک کردن تمام داده ها</v-btn>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
                <v-card-title class="text-h5">تمام داده ها پاک شود؟</v-card-title>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" text @click="dialog = false">لغو</v-btn>
                <v-btn color="error" text @click="deleteAll">تایید</v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </v-row>

        <div class="mb-3 mt-10 mr-n5">
            <v-subheader class="font-size-smal">تنظیمات ظاهری</v-subheader>
        </div>

        <v-row>
            <v-col cols="12">
                <v-switch inset label="تم تاریک" v-model="themeStatus" @click="themeChange"></v-switch>
            </v-col>
            <v-col cols="12" class="mt-n8">
                <v-checkbox label="نمایش دکمه تغییر تم در نوار بالایی" v-model="themeNavBtn" @click="themBtn"></v-checkbox>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-checkbox label="دکمه بازگشت" v-model="backStatus" @click="backBtn" ></v-checkbox> 
            </v-col>
        </v-row>

        <div class="mb-3 mt-10 mr-n5">
            <v-subheader class="font-size-smal">برنامه نویس</v-subheader>
        </div>

        <v-row>
            <v-col class="d-inline-block">
                <h4 class="d-inline-block"> برنامه نویس: </h4>
                <h3 class="d-inline-block font-yekan mr-2"> امیر حسین حسنی </h3>
            </v-col>
        </v-row>

        <v-row class="mt-10">
            <v-divider></v-divider>
        </v-row>

        <v-row justify="center" align="center" class="mt-10"> 
            <v-img contain src="../assets/img/ahhb_black@80-45.png" max-width="60" v-if="this.$vuetify.theme.dark == false"></v-img>
            <v-img contain src="../assets/img/ahhb_white@80-45.png" max-width="60" v-if="this.$vuetify.theme.dark == true"></v-img>
        </v-row>

        <v-row justify="center" align="center" class="mt-10 mb-10">
            <a href="https://github.com/AHHB" class="v-btn"> <v-btn icon large target="_blank"> <v-icon color="grey darken-3">mdi-github</v-icon> </v-btn> </a>
            <a href="https://www.linkedin.com/in/amir-hossein-hassani-a19b68189" class="v-btn"> <v-btn icon large target="_blank"> <v-icon color="grey darken-3">mdi-linkedin</v-icon> </v-btn> </a>
            <a href="mailto:amirhosseinhassani@outlook.com" class="v-btn"> <v-btn icon large target="_blank"> <v-icon color="grey darken-3">mdi-email</v-icon> </v-btn> </a>
            <a href="https://ahhb.ir" class="v-btn"> <v-btn icon large target="_blank"> <v-icon color="grey darken-3">mdi-web</v-icon> </v-btn> </a>
            <a href="https://telegram.me/A_H_H_B_79" class="v-btn"> <v-btn icon large target="_blank"> <v-icon color="grey darken-3">mdi-send</v-icon> </v-btn> </a>
        </v-row>

    </v-container>
</template>

<script>
import {data_delete, data_readAll} from '../data'

export default {
    name: 'setting',
    data() {
        return{
            teachName: localStorage.getItem("teachName"),
            da: data_readAll('class'),
            dialog: false,
            themeStatus: this.$vuetify.theme.dark,
            themeNavBtn: true,
            backStatus: false,
        }
    },

    methods:{
        techSave(){
            localStorage.setItem("teachName",this.teachName)
        },

        deleteAll(){
            this.da.forEach(element => {
                data_delete('class',element.id)
            });
            this.dialog = false
        },

        themeChange() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            localStorage.setItem("theme", this.$vuetify.theme.dark);
        },

        themBtn(){
            var stbtn = localStorage.getItem('themeBtn')

            if(stbtn == 'false'){
                localStorage.setItem('themeBtn',true)
                this.themeNavBtn = true
            }
            if(stbtn == 'true'){
                localStorage.setItem('themeBtn',false)
                this.themeNavBtn = false
            }
            location.reload()
        },

        backBtn(){
            var stbtn = localStorage.getItem('backBtn')

            if(stbtn == 'false'){
                localStorage.setItem('backBtn',true)
                this.themeNavBtn = true
            }
            if(stbtn == 'true'){
                localStorage.setItem('backBtn',false)
                this.themeNavBtn = false
            }
            location.reload()
        }

    },

  mounted(){
    var stbtn = localStorage.getItem('themeBtn')

    if(stbtn == 'true'){
        this.themeNavBtn = true
    }
    if(stbtn == 'false'){
        this.themeNavBtn = false
    }

    var stbtnback = localStorage.getItem('backBtn')

    if(stbtnback == 'true'){
        this.backStatus = true
    }
    if(stbtnback == 'false'){
        this.backStatus = false
    }
  }
}
</script>