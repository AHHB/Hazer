<template>

<v-container>
    <v-banner single-line> <v-icon slot="icon" color="accent" size="25" class="mb-2">mdi-help</v-icon> آموزش </v-banner>

    <v-row class="my-6">
        <v-col lg="3" md="3" sm="4" cols="12" class="px-16 px-xl-1 px-md-1 px-xl-2 px-sm-1">
            <v-img src="../assets/img/1.png"></v-img>
        </v-col>
        <v-col class="mt-6 mr-2">
            <p><b class="red--text">1.</b> منو </p>
            <p><b class="red--text">2.</b> تغییر تم روشن/تاریک</p>
            <p><b class="red--text">3.</b> بازگشت به صفحه اصلی </p>
            <p><b class="red--text">4.</b> افزودن کلاس جدید </p>
        </v-col>
    </v-row>

    <hr class="my-6">
    <v-row class="my-6">
        <v-col cols="12" class="text-center mb-3"> <h3>افزودن کلاس:</h3> </v-col>
        <v-col class="mt-6 mr-2">
            <p><b class="red--text">1.</b> نام کلاس </p>
            <p><b class="red--text">2.</b> تعداد اعضای کلاس (با افزودن دانش آموز به صورت خود کار تغییر می کند) </p>
            <p><b class="red--text">3.</b> نام و نام خانوادگی دانش آموز را در این قسمت وارد کرده  </p>
            <p><b class="red--text">4.</b> اضافه کردن دانش آموزی که نام آن در قسمت قبل وارد شده </p>
            <p><b class="red--text">5.</b> ذخیره کلاس </p>
        </v-col>
        <v-col lg="3" md="3" sm="4" cols="12" class="px-16 px-xl-1 px-md-1 px-xl-2 px-sm-1">
            <v-img src="../assets/img/2.png"></v-img>
        </v-col>
    </v-row>

    <hr class="my-6">

    <v-row class="my-6">
        <v-col cols="12" class="text-center mb-3"> <h3> کلاس:</h3> </v-col>
        <v-col lg="3" md="3" sm="4" cols="12" class="px-16 px-xl-1 px-md-1 px-xl-2 px-sm-1">
            <v-img src="../assets/img/3.png"></v-img>
        </v-col>
        <v-col class="mt-6 mr-2">
            <p><b class="red--text">1.</b> وارد شدن به کلاس </p>
            <p><b class="red--text">2.</b> ویرایش کلاس </p>
        </v-col>
    </v-row>

    <v-row class="my-6">
        <v-col lg="12" md="12" sm="12" cols="12" class="px-16 px-xl-1 px-md-1 px-xl-2 px-sm-1">
            <v-img src="../assets/img/4.png"></v-img>
        </v-col>
        <v-col class="mt-6 mr-2">
            <p><b class="red--text">1.</b> نام کلاس </p>
            <p><b class="red--text">2.</b> تعداد اعضای کلاس </p>
            <p><b class="red--text">3.</b> حذف کلاس </p>
            <p><b class="red--text">4.</b> ویرایش کلاس </p>
            <p><b class="red--text">5.</b> حضور و غیاب از دانش آموزان </p>
            <p><b class="red--text">6.</b> نمایش حضور و غیاب های انجام شده </p>
            <p><b class="red--text">7.</b> گرفتن خروجی از حضور و غیاب ها به صورت pdf و Exel </p>
            <p><b class="red--text">8.</b> نمایش لیست دانش آموزان </p>
        </v-col>
    </v-row>

    <hr class="my-6">

    <v-row class="my-6">
        <v-col cols="12" class="text-center mb-3"> <h3> حضور و غیاب جدید:</h3> </v-col>
        <v-col class="mt-6 mr-2">
            <p><b class="red--text">1.</b> تاریخ حضور و غیاب (حتما باید وارد شود) </p>
            <p><b class="red--text">2.</b> عنوان (اختیاری) </p>
            <p><b class="red--text">3.</b> شروع حضور و غیاب. بعد از شروع اسامی تمام دانش آموزان کلاس نمایش داده می شود.برای ثبت حاضری روی نام دانش آموز کلیک کنید و در آخر کلید ذخیره را فشار دهید (دانش آموزانی که انتخاب نشده باشند غیبت برای آنها لحاظ می شود) </p>
        </v-col>
        <v-col lg="3" md="3" sm="4" cols="12" class="px-16 px-xl-1 px-md-1 px-xl-2 px-sm-1">
            <v-img src="../assets/img/5.png"></v-img>
        </v-col>
    </v-row>

    <hr class="my-6">

    <v-row class="my-6">
        <v-col cols="12" class="text-center mb-3"> <h3> پشتیبان گیری:</h3> </v-col>
        <v-col lg="3" md="3" sm="4" cols="12" class="px-16 px-xl-1 px-md-1 px-xl-2 px-sm-1">
            <v-img src="../assets/img/7.png"></v-img>
        </v-col>
        <v-col class="mt-6 mr-2">
            <p>در این قسمت می توانید از داده های برنامه فایل پشتیبان تهیه کنید و همچنین فایل پشتیبانی که از قبل تهیه  کرده اید را وارد کنید</p>
        </v-col>
    </v-row>

</v-container>
    
</template>

<script>
export default {
    name: 'education',
    data() {
        return{

        }
    },
}
</script>