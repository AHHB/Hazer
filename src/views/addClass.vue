<template>
  <v-container>
    <v-banner single-line><v-icon slot="icon" color="accent" size="25">mdi-book-plus</v-icon>  افزودن کلاس  </v-banner>

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
                <v-text-field label="نام کلاس" outlined v-model="className"> </v-text-field>
            </v-col>
            <v-col lg="1" md="2" sm="2" cols="4" class="pa-1">
                <v-text-field label="اعضا" outlined disabled v-model="countMember"></v-text-field>
            </v-col>
        </v-row>
        <p>اضافه کردن دانش آموزان به کلاس:</p>
        <v-row>
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
        <v-row class="mt-8" align="center" justify="space-around">
            <v-data-table :headers="headers" :items="da" :sort-by="['lname']" class="elevation-1" :footer-props="{ itemsPerPageAllText: 'همه', itemsPerPageText: 'نمایش:',}" v-if="da.length > 0">
                    <template v-slot:item.del="{ item }">
                        <v-btn icon @click="deleteItem(item)"> <v-icon color="red accent-4" size="20">mdi-delete</v-icon> </v-btn>
                    </template>
            </v-data-table>
        </v-row>

        <v-divider class="my-10"></v-divider>

        <v-row align="center" justify="space-around" class="mb-16"> <v-btn color="success" large @click="newClassSave">ذخیره<v-icon small class="mr-2">mdi-content-save</v-icon></v-btn> </v-row>

    </div>
  </v-container>
  
</template> 

<script>
import {data_config,data_add} from '../data'

var date = new Date();

  export default {
    name: 'addClass',
    data () {
      return {
        headers: [
          { text: 'نام:', align: 'start', value: 'fname' },
          { text: 'نام خانوادگی:', align: 'start', value: 'lname' },
          { text: 'حذف', align: 'start', value: 'del', sortable: false  },
        ],
        da: [
             
        ],
        countMember: 0,
        className: "",
        fname: "",
        lname: "",
        snackbar: false,
        snackbarColor: 'success',
        snackbarTime: 2000,
        snackbarText: "دانش آموز افزوده شد",
      }
    },

    methods:{
        deleteItem (item) {
        this.da.splice(this.da.indexOf(item), 1)
        this.countMember = this.da.length
        this.snackbarText = "دانش آموز حذف شد"
          this.snackbarColor = 'error'
          this.snackbar = true
      },
      
      addStudent(){
          if(this.fname !="" && this.lname !=""){
            this.da.push({fname: this.fname , lname: this.lname})
            this.fname = ""
            this.lname = ""
            this.snackbarText = "دانش آموز افزوده شد"
            this.snackbarColor = 'success'
            this.snackbar = true
            this.countMember = this.da.length
          }else{
            this.snackbarText = "هیچ نامی وارد نشده است"
            this.snackbarColor = 'error'
            this.snackbar = true
          }
      },

      newClassSave(){
        if(this.className!="" && this.da.length > 0){
          let classId = date.getTime()
          let count = 1
          let classObject = {
              id: classId,
              name: this.className,
              count: this.countMember, 
              hg: [],
              student: [

              ]
            }

          this.da.forEach(element => {
            classObject.student.push({
               fname: element.fname,
                lname: element.lname,
                id: count,
                status:[]
            })
          count +=1
          });
          var result = data_add('class',classObject,2)
          if(result){
            this.$router.push('/')
          }else{
            this.snackbarText = "هیچ نامی وارد نشده است"
            this.snackbarColor = 'error'
            this.snackbar = true
          }
        }else{
          this.snackbarText = "هیچ نامی وارد نشده است"
          this.snackbarColor = 'error'
          this.snackbar = true
        }
      }

    },
  }

</script>