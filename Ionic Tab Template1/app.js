angular.module('app', ['ionic', 'app.controllers', 'app.controllersViaje'])

        .config(function ($stateProvider, $urlRouterProvider) {

            // Ionic uses AngularUI Router which uses the concept of states
            // Learn more here: https://github.com/angular-ui/ui-router
            // Set up the various states which the app can be in.
            // Each state's controller can be found in controllers.js
            $stateProvider

              .state('firstPageState', {
                  url: '/firstpage',
                  views: {
                      firstpage: {
                          templateUrl: 'firstpage.html'
                      }
                  }
              })

              .state('secondPageState', {
                  url: '/secondpage',                  
                  views: {
                      secondpage: {
                          templateUrl: 'templates/main.html',
                          controller: 'MainCtrl'
                      }
                  }
              })

              .state('viajePageState', {
                  url: '/viajepage',
                  views: {
                      viajepage: {
                          templateUrl: 'templates/viaje.html',
                          controller: 'ViajeCtrl'
                      }
                  }
              })
            ;

            // if none of the above states are matched, use this as the fallback

            $urlRouterProvider.otherwise('/firstpage');


        });