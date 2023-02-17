 function myDisplay() {
    let myPromise = new Promise(function(resolve, reject) {
      resolve("I love You !!");
    });
    console.log( myPromise);
  }
  
  myDisplay();
  console.log(1);