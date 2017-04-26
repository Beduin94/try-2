var myApp = angular.module('myApp');  //������� ������ myApp
myApp            //������ myApp
         .controller('MyController', ['$scope', 'myCart', function($scope, myCart){ // ������������� ����������� MyController
              $scope.items = []; // ������� ������ ������ items � scope �����������
              
              for(var i = 1; i < 11; i++){ // ������� 10 ��������� � ������� �����
                $scope.items.push({id: i, name: "����� �" + i, cost: 100 * i}) // ��������� �� � ������ items, � ������ �������� item ���������� 3 ����, id ����������� ����� �������� �����, name ����������� ������ "����� �" + ����� �������� �����, ���� 100 �������� �� ����� �������� 
              }
              
              $scope.addToCart = function(item){ // ������� addToCart ����������� ��� ������� �� ������ + � ��������� ������ item
                myCart.addItem(item); // ��������� ������� addItem ������� myCart � �������� ���� ������ item
              }
          }])
	     .service('myCart', ['$rootScope', function($rootScope){ // ������ myCart
            var cart = this; // ������� ������ cart, ������� ������ ������ myCart
            
            cart.list = []; // ������� ������ ������ list � ������� cart 
            
            cart.addItem = function(itemToAdd){ // ������� addItem ��������� ������ item
              var existItems = cart.list.filter(function(itemInCart){ // ������� ���������� existItems, ��������� ������� filter, �������� �� ���� ������ itemInCart
                return itemInCart.id == itemToAdd.id; // �������� id itemToAdd � itemInCart � �������� ��������� � existItems
              })
              if(existItems.length){ // ���� ������ existItems �� ����� ���� (�� ���� ��� ��� �� ����) �������� count ������� existItems ������������� �� 1
                existItems[0].count++;
              } else {  // ����� ����������� ���� count ������� itemToAdd �������� 1 � ��������� ������� itemToAdd � ������ list ������� cart
                itemToAdd.count = 1; 
                cart.list.push(itemToAdd); 
              }
              
              $rootScope.$emit('cartChanged', cart); // ��������� ������� cartChanged, ������� � ���� ������ cart, ���������� �������� Scope, ����� ������� ����� ���� ������ ������
            }
            return cart; // ���������� ������ 
          }])
          .directive('renderCart', ['$rootScope', function($rootScope){	 //��������� renderCart
              return {
                restrict: 'E', //// ����������� �������� �� ���������
				template: // ������ renderCart, ����� ������������ � ���� <render-cart>
				'<h2>�������:</h2>' + '<ul><li ng-repeat="cart_item in cart.list">{{cart_item.name}}-{{cart_item.count}} ��.</li></ul>', //��������� � ������
                link: function($scope, elem, attrs){   // �� ����� ����� ���
                  $rootScope.$on('cartChanged', function(event, cart){  //����� ������� cartChanged, �������� ������ cart
                    $scope.cart = cart;	 //��������� ������ cart � scope
                  });
                }
              }
            }])