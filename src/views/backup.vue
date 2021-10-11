<template>
    <v-container>

        <v-banner single-line> <v-icon slot="icon" color="accent" size="25" class="mb-2">mdi-backup-restore</v-icon> پشتیبان گیری </v-banner>

        <v-row class="mt-10">
            <v-col cols="12">
                از تمامی داده های شما در قالب یک فایل پشتیبان گرفته می شود.
            </v-col>
            <v-col class="mt-n3">
                <v-btn large color="primary" @click="write"> <v-icon>mdi-content-save-move</v-icon> گرفتن فایل پشتیبان</v-btn>
            </v-col>
        </v-row>

        <v-row class="mt-13">
            <v-col cols="12">
                فایل پشتیبانی که قبلار تهیه کرده اید را بارگزاری کنید تا اطلاعات شما بازیابی شود.
            </v-col>
            <v-col lg="5" md="6" sm="7" cols="8" class="mt-n5">
                <v-file-input show-size truncate-length="16" label="آپلود فایل" v-model="up"></v-file-input>
            </v-col>
            <v-col class="mt-n6" cols="12">
                <v-btn large color="primary" @click="upload"> <v-icon>mdi-file-download-outline</v-icon> بازیابی فایل پشتیبان</v-btn>
            </v-col>
        </v-row>


    </v-container>
</template>

<script>
import {data_readAll,data_add} from '../data'
import { saveAs } from 'file-saver';

var date = new Date();



export default {
    name: 'backup',
    data() {
        return{
            da: data_readAll('class'),
            up: null ,
        }
    },

    methods:{
        write(){    
            var name = "hazer-backup - "+ date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()
            var myFile = new File([JSON.stringify(this.da[0])], name+".json", {type: "json"});
            saveAs(myFile);
        },

        upload(){
            if(this.up){
                var reader = new FileReader();
                reader.readAsText(this.up, "UTF-8");
                reader.onload = function(evt){
                    var fileString = evt.target.result;
                    data_add('class',JSON.parse(fileString),2)
                    alert("فایل با موفقیت آپلود شد")
                };
                reader.onerror = function(evt){
                    if(evt.target.error.name == "NotReadableError") {
                        alert('فایل آپلود شده قابل خواندن نیست')
                    }
                }
            }
        }
            
    },
}

function loaded(evt) {
  // Obtain the read file data
  var fileString = evt.target.result;
  // Handle UTF-16 file dump
 console.log(fileString);
  // xhr.send(fileString)
}

</script>