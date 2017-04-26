var myApp = angular.module('myApp');  //создаем модуль myApp
myApp            //модуль myApp
         .controller('MyController', ['$scope', 'myCart', function($scope, myCart){ // инициализация контроллера MyController
              $scope.items = []; // создаем пустой массив items в scope контроллера
              
              for(var i = 1; i < 11; i++){ // создаем 10 элементов с помощью цикла
                $scope.items.push({id: i, name: "Товар №" + i, cost: 100 * i}) // добавляем их в массив items, в каждом элементе item содержится 3 поля, id присваиваем номер итерации цикла, name присваиваем строку "Товар №" + номер итерации цикла, цена 100 умножить на номер итерации 
              }
              
              $scope.addToCart = function(item){ // функция addToCart запускается при нажатии на кнопку + и принимает объект item
                myCart.addItem(item); // запускаем функцию addItem сервиса myCart и передаем туда объект item
              }
          }])
	     .service('myCart', ['$rootScope', function($rootScope){ // сервис myCart
            var cart = this; // создаем объект cart, видимый только внутри myCart
            
            cart.list = []; // создаем пустой массив list в объекте cart 
            
            cart.addItem = function(itemToAdd){ // функция addItem принимает объект item
              var existItems = cart.list.filter(function(itemInCart){ // создали переменную existItems, запустили функцию filter, получили на вход объект itemInCart
                return itemInCart.id == itemToAdd.id; // сравнили id itemToAdd и itemInCart и записали результат в existItems
              })
              if(existItems.length){ // если длинна existItems не равна нулю (то есть там что то есть) значение count объекта existItems увеличивается на 1
                existItems[0].count++;
              } else {  // иначе присваиваем полю count объекта itemToAdd значение 1 и добавляем элемент itemToAdd в массив list объекта cart
                itemToAdd.count = 1; 
                cart.list.push(itemToAdd); 
              }
              
              $rootScope.$emit('cartChanged', cart); // запускаем событие cartChanged, предаем в него объект cart, используем корневой Scope, чтобы отловит можно было откуда угодно
            }
            return cart; // возвращаем объект 
          }])
          .directive('renderCart', ['$rootScope', function($rootScope){	 //директива renderCart
              return {
                restrict: 'E', //// ограничения действия по элементам
				template: // шаблон renderCart, будет отображаться в теге <render-cart>
				'<h2>Корзина:</h2>' + '<ul><li ng-repeat="cart_item in cart.list">{{cart_item.name}}-{{cart_item.count}} шт.</li></ul>', //заголовок и список
                link: function($scope, elem, attrs){   // не понял зачем это
                  $rootScope.$on('cartChanged', function(event, cart){  //ловим событие cartChanged, получаем объект cart
                    $scope.cart = cart;	 //добавляем объект cart в scope
                  });
                }
              }
            }])