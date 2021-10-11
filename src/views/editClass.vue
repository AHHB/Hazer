<template>
    <v-container>
        <v-banner single-line><v-icon slot="icon" color="accent" size="25">mdi-pencil</v-icon>  ویرایش کلاس  </v-banner>

        <v-snackbar v-model="snackbar" :timeout="snackbarTime" :color="snackbarColor" >
            {{ snackbarText }}
            <template v-slot:action="{ attrs }">
                <v-btn color="blue darken-4" text v-bind="attrs" @click="snackbar = false">بستن</v-btn>
            </template>
        </v-snackbar>

        <div class="mt-3">
            <br>
            <v-row>
                <v-col lg="5" md="5" sm="9" cols="8" class="pa-1">
                    <v-text-field label="نام کلاس" outlined v-model="da[0].name"> </v-text-field>
                </v-col>
                <v-col lg="1" md="2" sm="2" cols="4" class="pa-1">
                    <v-text-field label="اعضا" outlined disabled v-model="da[0].count"></v-text-field>
                </v-col>
            </v-row>
            <br>
            <v-row>
                <p class="mt-1 mx-4">ویرایش دانش آموزان:</p>
                <v-btn outlined color="primary" @click="addStatus=!addStatus"> <v-icon>mdi-account-plus</v-icon> افزودن دانش آموز </v-btn>
            </v-row>

            <v-row v-if="addStatus" class="mt-10">
                <v-col lg="5" md="5" sm="6" cols="6" class="pa-1">
                    <v-text-field label="نام دانش آموز" outlined class="pa-0" v-model="fname"> </v-text-field>
                </v-col>
                <v-col lg="5" md="5" sm="6" cols="6" class="pa-1">
                    <v-text-field label="نام خانوادگی" outlined class="pa-0" v-model="lname"> </v-text-field>
                </v-col>
                <v-col lg="1" md="2" sm="12" cols="12" class="text-center pa-0">
                    <v-btn elevation="2" fab large @click="addStudent">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-col>
            </v-row>

            <v-row class="mt-10">
                <v-data-table :headers="headers" :items="da[0].student" :sort-by="['lname']" class="elevation-1" :footer-props="{ itemsPerPageAllText: 'همه', itemsPerPageText: 'نمایش:',}" v-if="da.length > 0">
                    <template v-slot:item.del="{ item }" >
                        <v-btn icon @click="deleteItem(item)"> <v-icon color="red accent-4" size="20">mdi-delete</v-icon> </v-btn>
                        <v-btn icon @click="editItem(item)"> <v-icon color="secondary" size="20">mdi-pencil</v-icon> </v-btn>
                    </template>
                </v-data-table>
            </v-row>

            <v-divider class="my-10"></v-divider>

            <v-row align="center" justify="space-around" class="mb-16"> <v-btn color="success" large @click="editClassSave">ذخیره<v-icon small class="mr-2">mdi-content-save</v-icon></v-btn> </v-row>

        </div>

        <div class="text-center">
            <v-dialog v-model="dialog" width="500"> 
            <v-card>
                <v-card-title class="text-h5">
                ویرایش دانش آموز
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="mt-8">
                <v-text-field label="نام دانش آموز" outlined class="pa-0" v-model="editStudent.fname"> </v-text-field>
                <v-text-field label="نام خانوادگی" outlined class="pa-0" v-model="editStudent.lname"> </v-text-field>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false" >تایید</v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </div>

    </v-container>
</template>

<script>
import {data_read,data_update} from '../data'

export default {
    name: 'editClass',
    data(){
        return{
            headers: [ { text: 'نام:', align: 'start', value: 'fname' }, { text: 'نام خانوادگی:', align: 'start', value: 'lname' }, { text: 'حذف', align: 'start', value: 'del', sortable: false  },],
            da: data_read('class',Number(sessionStorage.getItem("editClass"))),
            snackbar: false,
            snackbarColor: 'success',
            snackbarTime: 2000,
            snackbarText: "دانش آموز افزوده شد",
            addStatus: false,
            fname: "",
            lname: "",
            dialog: false,
            editStudent: 0 ,
        }
    },

    methods:{
        deleteItem (item) {
            this.da[0].student.splice(this.da.indexOf(item), 1)
            this.da[0].count -= 1
            this.snackbarText = "دانش آموز حذف شد"
            this.snackbarColor = 'error'
            this.snackbar = true
        },

        editItem(item){
            this.dialog = true
            this.editStudent = item
            // console.log(this.editStudent);
        },

      addStudent(){
          if(this.fname !="" && this.lname !=""){
            this.da[0].student.push({fname: this.fname , lname: this.lname , id: this.da[0].count+1 , status: []})
            this.fname = ""
            this.lname = ""
            this.snackbarText = "دانش آموز افزوده شد"
            this.snackbarColor = 'success'
            this.snackbar = true
            this.da[0].count += 1
          }else{
            this.snackbarText = "هیچ نامی وارد نشده است"
            this.snackbarColor = 'error'
            this.snackbar = true
          }
      },

      editClassSave(){
          data_update('class',sessionStorage.getItem("editClass"),this.da[0])
          sessionStorage.removeItem('editClass')
          this.$router.go(-1)
      },

    },

    beforeMount(){
        if(!sessionStorage.getItem('editClass')){
            this.$router.push('/')
        }
    },
}
</script>