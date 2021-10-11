<template>
    <v-container>
        <v-banner single-line> <v-icon slot="icon" color="accent" size="25" class="mb-2">mdi-book</v-icon> {{da[0].name}} <v-btn icon small class="float-left" @click="goToEdit(da[0].id)"> <v-icon>mdi-pencil</v-icon> </v-btn> <v-btn icon small class="float-left ml-2"  @click="dialog=!dialog"> <v-icon>mdi-delete</v-icon> </v-btn> </v-banner>
        <v-subheader class="mt-n3"><v-icon size="18" class="ml-1">mdi-account-supervisor</v-icon> {{da[0].count}} نفر</v-subheader>

        <v-dialog v-model="dialog" persistent max-width="320" >
            <v-card>
                <v-card-title class="text-h5">آیا کلاس " {{da[0].name}} " حذف شود؟ </v-card-title>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" text @click="dialog = false">لغو</v-btn>
                <v-btn color="error" text @click="deleteClass">تایید</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar" :timeout="snackbarTime" :color="snackbarColor" >
            {{ snackbarText }}
            <template v-slot:action="{ attrs }">
                <v-btn color="blue darken-4" text v-bind="attrs" @click="snackbar = false">بستن</v-btn>
            </template>
        </v-snackbar>

        <v-row justify="center" align="center" class="mt-5">
            <v-col lg="3" md="4" sm="6" cols="12">
                <v-hover v-slot="{ hover }">
                <v-item v-slot="{toggle }">
                    <v-card elevation="3" class="d-flex align-center" @click="toggle" :elevation="hover ? 12 : 2">
                        <v-responsive :aspect-ratio="16/8" @click="goTohag()">
                        <v-card-title class="centered"> <h3 class="font-yekan"> <v-icon size="30">mdi-hand-pointing-up</v-icon> حضور و غیاب </h3> </v-card-title>
                        <v-card-text class="font-size-smal">حضور و غیاب از دانش آموزان</v-card-text>
                        </v-responsive>
                    </v-card>
                </v-item>
                </v-hover>
            </v-col>
            <v-col lg="3" md="4" sm="6" cols="12">
                <v-hover v-slot="{ hover }">
                <v-item v-slot="{toggle }">
                    <v-card elevation="3" class="d-flex align-center" @click="toggle" :elevation="hover ? 12 : 2">
                        <v-responsive :aspect-ratio="16/8" @click="goToHgList()">
                        <v-card-title class="centered"> <h3 class="font-yekan"> <v-icon size="30" class="ml-1">mdi-list-status</v-icon> لیست حضور و غیاب </h3> </v-card-title>
                        <v-card-text class="font-size-smal">لیست حضور و غیاب دانش آموزان بر اساس تاریخ</v-card-text>
                        </v-responsive>
                    </v-card>
                </v-item>
                </v-hover>
            </v-col>
            <v-col lg="3" md="4" sm="6" cols="12">
                <v-hover v-slot="{ hover }">
                <v-item v-slot="{toggle }">
                    <v-card elevation="3" class="d-flex align-center" @click="toggle" :elevation="hover ? 12 : 2">
                        <v-responsive :aspect-ratio="16/8" @click="goToExportList">
                        <v-card-title class="centered"> <h3 class="font-yekan"> <v-icon size="30" class="ml-1">mdi-printer-check</v-icon> چاپ لیست </h3> </v-card-title>
                        <v-card-text class="font-size-smal"> چاپ لیست حضور و غیاب دانش آموزان</v-card-text>
                        </v-responsive>
                    </v-card>
                </v-item>
                </v-hover>
            </v-col>
        </v-row>

        <v-expansion-panels class="mt-16 px-lg-16" focusable>
            <v-expansion-panel>
                <v-expansion-panel-header expand-icon="mdi-transfer-down">لیست دانش آموزان</v-expansion-panel-header>
                
                <v-expansion-panel-content>
                    <v-data-table :headers="headers" :items="da[0].student" :sort-by="['lname']" class="elevation-1" :footer-props="{ itemsPerPageAllText: 'همه', itemsPerPageText: 'نمایش:',}" v-if="da.length > 0"></v-data-table>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>

               
    </v-container>    
</template>

<script>
import {data_read,data_delete} from '../data'

export default {
    data(){
        return{
            da: data_read('class',Number(sessionStorage.getItem("class"))),
            headers: [ { text: 'نام:', align: 'start', value: 'fname' }, { text: 'نام خانوادگی:', align: 'start', value: 'lname' }],
            dialog: false,
            snackbar: false,
            snackbarColor: 'success',
            snackbarTime: 3000,
            snackbarText: "حضور و غیاب با موفقیت انجام شد",
        }
    },

    methods:{
        goToEdit(id){
            sessionStorage.setItem("editClass",id)
            this.$router.push("/edit-class")
        },

        deleteClass(){
            data_delete('class',this.da[0].id)
            this.$router.push('/')
        },

        goTohag(){
            this.$router.push('/Attendance')
        },

        goToHgList(){
            this.$router.push('/attendance-List')
        },

        goToExportList(){
            this.$router.push('/export-list')
        }
    },

    mounted(){
        if(sessionStorage.getItem('hgs')){
            this.snackbarColor = 'success',
            this.snackbarTime = 3000,
            this.snackbarText = "حضور و غیاب با موفقیت انجام شد",
            this.snackbar = true
            sessionStorage.removeItem('hgs')
        }

        if(!sessionStorage.getItem('class')){
            this.$router.push('/')
        }
    }

}
</script>