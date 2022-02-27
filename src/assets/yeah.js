// const myApp = angular.module("MyApp", ["oc.lazyLoad"]);
//
// myApp.controller("MyCtrl", function($ocLazyLoad) {
//   $ocLazyLoad.load('testModule.js');
// });
//
// myApp.config(function ($routeProvider) {
//   $routeProvider.when("/home",{
//     templateUrl: "/home",
//     controller: 'MyApp',
//     resolve: {
//       js:[`$ocLazyLoad`,function ($ocLazyLoad) {
//         return $ocLazyLoad.load("/yep.js");
//       }]
//     }
//   })
// })
