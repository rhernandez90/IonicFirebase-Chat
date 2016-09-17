/**
 * Created by robertoarturo on 16/09/2016.
 */
angular.module('starter.services', [])
  .service('fireService',function () {
    this.config = {
      apiKey: "AIzaSyCfdmZLFi1WT4Z9MksK94TbwKWoxu6x71U",
      authDomain: "chat-b3795.firebaseapp.com",
      databaseURL: "https://chat-b3795.firebaseio.com",
      storageBucket: "chat-b3795.appspot.com",
    };
    this.initFire = function () {
      firebase.initializeApp(this.config);
    }
    this.initFire();

    this.fireDB = firebase.database();





  });
