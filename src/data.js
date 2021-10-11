/*****************
     Data base    
*****************/



/**
 * creat and set object store in data base
 *
 * @return {number} creat and set object store in data base.
 */
export function data_config() {
 
   //prefixes of window.IDB objects
   window.IDBTransaction = window.IDBTransaction || 
   window.webkitIDBTransaction || window.msIDBTransaction;
   window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || 
   window.msIDBKeyRange

   var db;
   var request = window.indexedDB.open("hazer", 1);

   request.onerror = function (event) {
      alert("اتصال به دیتابیس نا موفق بود"+"::" + event.target.errorCode);
   };

   request.onsuccess = function (event) {
      db = request.result;
      console.log("success: " + db);
   };

   request.onupgradeneeded = function (event) {
      var db = event.target.result;
      console.log(db.element)
      var objectClass = db.createObjectStore("class", {  autoIncrement: true ,  keyPath: "id" } );
   }

   request.oncomplete = function () {
      db.close();
   };
}


/**
 * add data to data base
 *
 * @param {string} store name of bject store.
 * @param {Array} data object for insert.
 * @param {number} type type 1=array - type 2=object.
 * @return {string} add data to data base - return true or false
 */
export function data_add(store,data,type){
   var db;
   var request = window.indexedDB.open("hazer", 1);
   var resultAdd = true

   request.onsuccess = function (event) {
      db = request.result;
      if(type==1){
         data.forEach(element => {
            request = db.transaction([store], "readwrite").objectStore(store).add(element);
         });
      }
      if(type==2){
         request = db.transaction([store], "readwrite").objectStore(store).add(data);
      }
               
         request.onsuccess = function(event) {
            resultAdd = true
         };
          
         request.onerror = function(event) {
            console.log("اتصال به دیتابیس نا موفق بود"+"::" + event.target.errorCode);
            resultAdd = false
         }
   };
   request.onerror = function (event) {
      alert("اتصال به دیتابیس نا موفق بود"+"::" + event.target.errorCode);
      resultAdd = false
   };

   request.oncomplete = function () {
      db.close();
   };

return resultAdd
}


/**
 * read all data
 *
 * @param {string} store name of bject store.
 * @return {object} 
 */
export function data_readAll(store){
   var db;
   var request = window.indexedDB.open("hazer", 1);
   var re = []

   request.onsuccess = function (event) {
      db = request.result;
      var objectStore = db.transaction([store], "readwrite").objectStore(store);
            
      objectStore.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      
      if (cursor) {
         // console.log(cursor.value);
         re.push(cursor.value)
         cursor.continue();
      } 
      };
   };

   request.oncomplete = function () {
      db.close();
   };
   
   return re
}


/**
 * read data by key
 *
 * @param {string} store name of bject store.
 * @param {string} key key to find
 * @return {object} 
 */
export function data_read(store,key){
   var db;
   var request = window.indexedDB.open("hazer", 1);
   var res = []

   request.onsuccess = function (event) {
      db = request.result;
      
      var transaction = db.transaction([store]);
      var objectStore = transaction.objectStore(store);
      var requ = objectStore.get(key);
            
      requ.onerror = function(event) {
         alert("اتصال به دیتابیس نا موفق بود"+"::" + event.target.errorCode);
      };
            
      requ.onsuccess = function(event) {
         // Do something with the request.result!
         if(requ.result) {
            res.push(requ.result)
         } else {
            alert("هیچ موردی یافت نشد");
          }
      };
   };

   request.oncomplete = function () {
      db.close();
   };

return res
}


/**
 * update data by key
 *
 * @param {string} store name of bject store.
 * @param {string} key key to find
 * @param {object} update data to update
 * @return {object} 
 */
 export function data_update(store,key,update){
   var db;
   var request = window.indexedDB.open("hazer", 1);
   var res = []

   request.onsuccess = function (event) {
      db = request.result;
      
      var transaction = db.transaction([store],"readwrite");
      var objectStore = transaction.objectStore(store);
      var requ = objectStore.get(key);
            
      requ.onerror = function(event) {
         alert("اتصال به دیتابیس نا موفق بود"+"::" + event.target.errorCode);
      };
            
      requ.onsuccess = function(event) {
         var data = event.target.result;
         data = update
         var requestUpdate = objectStore.put(data);
      };
   };

   request.oncomplete = function () {
      db.close();
   };
   
return res
}


/**
 * delete data by key
 *
 * @param {string} store name of bject store.
 * @param {string} key key to delete
 */
export function data_delete(store,key){
   var db;
   var request = window.indexedDB.open("hazer", 1);

   request.onsuccess = function (event) {
      db = request.result;
      
      db.transaction([store], "readwrite").objectStore(store).delete(key);
   };

   request.oncomplete = function () {
      db.close();
   };
}