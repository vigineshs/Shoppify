function getProducts() {
			$.ajax({
				url: 'GetProducts',
				dataType: 'json',
				success: function(data) {
					insertProducts = '';
					$.each(data, function() {
						$.each(this, function(key, value) {
							insertProducts += '<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">'
							+ '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 thumbnail thumb">'
							+ '<img src="'+ value.productLink +'" alt="'+ value.productId +'" data-toggle="modal" data-target="#productModal" />'
							+ '<span class="glyphicon glyphicon-tag"> $'+ value.productPrice +'</span>'
							+ '<span class="glyphicon glyphicon-info-sign text-right "> '+ value.productName +'</span>'
							+ '</div>'
							+ '</div>'
						});
					});
					$('#homePage').html(insertProducts);
					$('#homePage').show('slow');
					$('#orderPage').hide();
				},
				error : function(request, textStatus, errorThrown) {
					alert(textStatus);
					alert(errorThrown);
				}
			});
		}
		
		function displayProduct(imageElement) {
			var imgId = $(imageElement).attr('alt');
			var sendItemd = {
					itemId: imgId
			};
			$.ajax({
				url: 'GetProduct',
				dataType: 'json',
				data: sendItemd,
				success: function(data) {
					showProduct = '';
					$.each(data, function() {
						$.each(this, function(key, value) {
							showProduct +=	'<div class="modal-dialog">'
							+ '<div class="modal-content">'
							+ '<div class="modal-header">'
							+ '<button type="button" class="close" data-dismiss="modal">&times;</button>'
							+ '<h4 class="modal-title">'+ value.productCategory +' - '+ value.productName + '</h4>'
							+ '</div>'
							+ '<div class="modal-body">'
							+ '<div class="row col-lg-12 col-md-12">'
							+ '<div class="thumbnail">'
							+ '<img src='+ value.productLink +' alt='+ value.productId +' />'
							+ '</div></div>'
							+ '<div class="row col-lg-12 col-md-12 cl-sm-12">'
							+ '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">'
							+ '<p><label>Type: </label>' + value.productCategory + '</p>' 
							+ '<p><label>Brand: </label>' + value.productSubCategory + '</p>' 
							+ '<p><label>Name: </label>' + value.productName + '</p>' 
							+ '<p><label>Price: </label> $' + value.productPrice + '</p>' 
							+ '</div>'
							+ '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">'
							+ '<form><p><label for="spinner">Select Quantity:</label><input type="number" id="quantity" class="form-control" name="selectedQuantity" min="1" max="'+ value.productQuantity +'" required></p></form>'
							+ '</div>'
							+ '</div></div>'
							+ '<div class="modal-footer">'
							+ '</div>'
							+ '</div>'
							+ '</div>';
						});
					});
					$('#productModal input[type="number"]').focus();
					$('#productModal').html(showProduct);
					
				},
				error : function(request, textStatus, errorThrown) {
					alert(textStatus);
					alert(errorThrown);
				}
			});
		}
		
		function getUser(type) {
			userForm = '';
			userForm +=	'<div class="modal-dialog">'
				+ '<div class="modal-content">'
				+ '<div class="modal-header">'
				+ '<button type="button" class="close" data-dismiss="modal">&times;</button>'
				+ '<h4 class="modal-title">'+ type +'</h4>'
				+ '</div>'
				+ '<div class="modal-body">'
				+ '<div class="row col-lg-12 col-md-12">'
				+ '<form><div class="form-group"><label id="err-msg"></label><div class="input-group"><div class="input-group-addon glyphicon glyphicon-user"></div>'
				+ '<input type="text" id="username" name="username" class="form-control" placeholder="Enter Username" required ></div></div>'
				+ '<div class="form-group"><label></label><div class="input-group"><div class="input-group-addon glyphicon glyphicon-lock"></div>'
				+ '<input type="password" id="password" name="password" class="form-control" placeholder="Enter Password" required ></div></div></form>'
				+ '</div>'				
				+ '</div>'
				+ '<div class="modal-footer">';
				if(type == "Log In") {
					userForm += 'Don\'t have an account?<span id="sign">Sign Up</span>';
				} else {
					userForm += 'Already a member?<span id="log">Log In</span>';
				}
				userForm += '</div>'
				+ '</div>'
				+ '</div>';
			$('#userModal').html(userForm).hide('slide');
			$('#userModal').html(userForm).show('slide');
			$('#userModal input[name="username"]').focus();
			setTimeout(function(){ $('#userModal input[name="username"]').focus() }, 1000);
			
			/*var imgId = $(imageElement).attr('alt');
			var sendItemd = {
					itemId: imgId
			};
			$.ajax({
				url: 'GetProduct',
				dataType: 'json',
				data: sendItemd,
				success: function(data) {
					showProduct = '';
					$.each(data, function() {
						$.each(this, function(key, value) {
							
						});
					});
					
					$('#productModal').html(showProduct);
						
				},
				error : function(request, textStatus, errorThrown) {
					alert(textStatus);
					alert(errorThrown);
				}
			});*/
		}
		
		
		function getCartItems() {
			$.ajax({
				url: 'GetCartItems',
				dataType: 'json',
				success: function(data) {
					insertCartItems = '';
					var cartItems = false;
					insertCartItems += '<div class=" panel panel-default">'
					+ '<div class="panel-heading"><h3 class="panel-title">Your Cart Items</h3></div>'
					
					$.each(data, function() {
						$.each(this, function(key, value) {
							cartItems = true;
							insertCartItems += '<div class="panel-body">'
							+ '<div class="row"><div class="col-lg-1 col-md-1 col-sm-1 col-xs-12">'
							+ '<input type="checkbox" value="'+ value.productId +'" name="cartSelection" />'
							+ '</div>'
							+ '<div class="col-lg-2 col-md-2 col-sm-3 col-xs-12 thumbnail">'
							+ '<img src="'+ value.productLink +'" alt="'+ value.productId +'" />'
							+ '</div>'
							+ '<div class="col-lg-offset-1 col-lg-3 col-md-4 col-sm-4 col-xs-6">'
							+ '<p><label>Product Type: </label>'+ value.productCategory +'</p>'
							+ '<p><label>Product Brand: </label>'+ value.productSubCategory +'</p>'
							+ '<p><label>Product: </label>'+ value.productName +'</p>'
							+ '</div>'
							+ '<div class="col-lg-offset-1 col-lg-3 col-md-4 col-sm-4 col-xs-6">'
							+ '<p><label>Product Quantity: </label>'+ value.productQuantity +'</p>'
							+ '<p><label>Product Price: </label>'+ value.productPrice +'</p>'
							+ '<p><label>Total Amount: </label>'+ value.productQuantity*value.productPrice +'</p>'
							+ '</div></div>'
							+ '</div>'
						});
					});
					if(!cartItems){
						insertCartItems += '<div class="panel-body text-center">'
					    + '<h1>You haven\'t added any products yet.</h1>'
					  	+ '</div>'
						+ '</div>';
					} else {
						insertCartItems += '<div class="panel-footer"><div class="btn-group">'
							+ '<button type="button" class="btn btn-danger" id="selectDel" disabled>Delete Selected</button>'
							+ '<button type="button" class="btn btn-danger" id="allDel" >Delete All</button>'
							+ '<button type="button" class="btn btn-success" id="selectOrder" disabled>Order Selected</button>'
							+ '<button type="button" class="btn btn-success" id="allOrder" >Order All</button>'
							+ '</div></div></div>';
					}
					$('#cartFragment').html(insertCartItems);
				},
				error : function(request, textStatus, errorThrown) {
					alert(textStatus);
					alert(errorThrown);
				}
			});
		}
		
		function getOrderItems() {
			$.ajax({
				url: 'GetOrderItems',
				dataType: 'json',
				success: function(data) {
					insertOrderItems = '';
					var orderItems = false;
					insertOrderItems += '<div class=" panel panel-default">'
					+ '<div class="panel-heading"><h3 class="panel-title">Your Orders</h3></div>'
					$.each(data, function() {
						$.each(this, function(key, value) {
							orderItems = true;
							insertOrderItems += '<div class="panel-body">'
							+ '<div class="col-lg-3 col-md-2 col-sm-2 col-xs-12 thumbnail">'
							+ '<img src="'+ value.orderLink +'" alt="'+ value.OrderId +'" />'
							+ '</div>'
							+ '<div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">'
							+ '<p><label>Order Item: </label>'+ value.orderItem +'</p>'
							+ '<p><label>Order Date: </label>'+ value.orderDate +'</p>'
							+ '<p><label>Order Quantity: </label>'+ value.orderQuantity +'</p>'
							+ '<p><label>Total Price: </label>'+ value.orderTotal +'</p>'
							+ '<span><button type="button" class="btn btn-default btn-xs" aria-label="'+ value.orderId +'">'
							+ '<span class="glyphicon glyphicon-star" aria-hidden="true"></span>'
							+ '</button><button type="button" class="btn btn-default btn-xs" aria-label="'+ value.orderId +'">'
							+ '<span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>'
							+ '</button><button type="button" class="btn btn-default btn-xs" aria-label="'+ value.orderId +'"">'
							+ '<span class="glyphicon glyphicon-share" aria-hidden="true"></span>'
							+ '</button></span>'
							+ '</div>'
							+ '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">'
							+ '<div class="userPeview active"></div>'
							+ '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 productTracking" style="height: 250px;" ></div>'
							+ '<div class="deliveryStatus"></div>'
							+ '</div>'
							+ '</div>'
						});
					});
					if(!orderItems){
						insertOrderItems += '<div class="panel-body text-center">'
					    + '<h1>You haven\'t made any purchases yet. Make your first purchase today!</h1>'
					  	+ '</div>'
						+ '</div>';
					}
					$('#orderFragment').html(insertOrderItems);
				},
				error : function(request, textStatus, errorThrown) {
					alert(textStatus);
					alert(errorThrown);
				}
			});
		}
		
		function loadReview(orderNumber, divElement) {
				var orderDetail =  {
					"orderNumber" : orderNumber
				};
				$.ajax({
					url: 'GetUserReview',
					dataType: 'json',
					data: orderDetail,
					success: function(data) {
						insertReview = '';
						var review = false;
						$.each(data, function() {
							$.each(this, function(key, value) {
								insertReview += '<p>';
								for(var i = 0; i < value.orderReviewStar; i++) {
									insertReview += '<span class="glyphicon glyphicon-star"></span>';
								}
								insertReview += '</p>'
								+ '<blockquote><h3><q>'+ value.orderReview +'</q><h3><cite><footer>'
								+ value.orderReviewer +'</footer></cite></blockquote';
							});
						});
						$(divElement).html(insertReview);
					},
					error : function(request, textStatus, errorThrown) {
						alert(textStatus);
						alert(errorThrown);
					}
				});
			}
			
			function loadMap(orderNumber, mapElement) {
		   		var orderDetail = {
		   			"orderNumber" : orderNumber
		   		};
		   		$.ajax({
	                url: 'GetTracker', // Your Servlet mapping or JSP(not suggested)
	                data: orderDetail, 
	                type : 'POST',
	                dataType : 'json', // Returns HTML as plain text; included script tags are evaluated when inserted in the DOM.
	                success : function(data) {
	                	$.each(data, function(idx, obj){ 
	                        $.each(obj, function(key, value){
	                        	initMap(mapElement, value.currentLat, value.currentLang, value.destLat, value.destLong);
	                        });
	                	});
	                	google.maps.event.addDomListener(window, 'load', initMap);
	                },
	                error : function(request, textStatus, errorThrown) {
	                    alert(textStatus);
	                	alert(errorThrown);
	                }
	            });
		   	}
			
			function initMap(goog, sLat, sLng, dLat, dLng) {
				var src = {lat: Number(sLat), lng: Number(sLng)};
			  	var dest = {lat: Number(dLat), lng: Number(dLng)};
			  	var map = new google.maps.Map(goog[0], {
				    center: src,
				    scrollwheel: false,
				    zoom: 7
				});

				var directionsDisplay = new google.maps.DirectionsRenderer({
				    map: map
				});

				// Set destination, origin and travel mode.
				var request = {
				    destination: dest,
				    origin: src,
				    travelMode: google.maps.TravelMode.DRIVING
				};

				// Pass the directions request to the directions service.
				var directionsService = new google.maps.DirectionsService();
				directionsService.route(request, function(response, status) {
					if (status == google.maps.DirectionsStatus.OK) {
				    	// Display the route on the map.
				      	directionsDisplay.setDirections(response);
				    }
				});
			}
		
			function loadDeliveryStatusDiv(orderNumber, deliveryStatusDiv) {
				var orderDetail =  {
						"orderNumber" : orderNumber
					};
					$.ajax({
						url: 'GetDeliveryStatus',
						dataType: 'json',
						data: orderDetail,
						success: function(data) {
							insertDeliveryStatus = '';
							var review = false;
							$.each(data, function() {
								$.each(this, function(key, value) {
									insertDeliveryStatus += '<table class="table table-hover table-condensed">'
									+ '<thead><tr><th>Date</th><th>Start</th><th>Destination</th></tr></thead>'
									+ '<tbody><tr><td>'+value.destDate1+'</td><td>'+value.dest1+'</td><td>'+value.dest2+'</td></tr>'
									+ '<tr><td>'+value.destDate2+'</td><td>'+value.dest2+'</td><td>'+value.dest3+'</td></tr>'
									+ '<tr><td>'+value.destDate3+'</td><td>'+value.dest3+'</td><td>'+value.dest4+'</td></tr></tbody>'
									+ '</table>';
								});
							});
							$(deliveryStatusDiv).html(insertDeliveryStatus);
						},
						error : function(request, textStatus, errorThrown) {
							alert(textStatus);
							alert(errorThrown);
						}
					});
			}
			
			function userLogin(username, password) {
				user = '';
				var userLoginDetails = {
			    		"username": username,
			    		"password": password
			     };
			     $.ajax({
						url: 'userLogin',
						dataType: 'json',
						data: userLoginDetails,
						success: function(data) {
		                	if(data != null) {
		                    	checkUser();
		                        $('#userModal').modal('hide');
							} else {
								$('#userModal input[name="username"]').focus();
								$('#userModal input[name="username"]').css('border','2px solid red');
								$('#userModal #err-msg').html("Username/Password combination wrong!");
								$('#userModal #err-msg').css({'border': '2px solid red', 'background-color': '#EECCCC'});
							}
						},
		                error : function(request, textStatus, errorThrown) {
		                    alert(textStatus);
		                	alert(errorThrown);
		                }
		            });
			}
			
		function makeActive(currentDiv) {
			var activeDiv = $(currentDiv).parent().children(".active").get();
			$(activeDiv).hide('slow');
			$(activeDiv).css('display', 'none');
			$(activeDiv).removeClass("active");
			$(currentDiv).addClass("active");
			$(currentDiv).css('display','block');
		}
		
		function checkUser() {
			$.ajax({
				url: 'CheckUser',
				dataType: 'json',
				success: function(data) {
					if(data != null) {
						$('#logIn').hide();
                        $('#register').hide();
                        $('#cart').show();
                        $('#logOut').show();
                        getProducts();
					} else {
						$('#logIn').show();
                        $('#register').show();
                        $('#cart').hide();
                        $('#logOut').hide();
					}
				},
                error : function(request, textStatus, errorThrown) {
                    alert(textStatus);
                	alert(errorThrown);
                }
			});
		}
		
		$('document').ready(function() {
			getProducts();
			checkUser();			
		});
		
		$('#home').click(function() {
			getProducts();
		});
		
		$('#register').click(function() {
			getUser("Register");
		});
		
		$('#logIn').click(function() {
			getUser("Log In");
		});
		
		$('#logOut').click(function() {
			if(confirm("Are you sure of logging out?"))
		    {
				$.ajax({
					url: 'UserLogout',
					dataType: 'json',
					success: function(data) {
						checkUser();
						getProducts();
					},
					error : function(request, textStatus, errorThrown) {
	                    alert(textStatus);
	                	alert(errorThrown);
	                }
				});
		    }
		});
		
		$('#userModal').on('click','#sign',function() {
			getUser("Register");
			$('#userModal input[name="username"]').focus();
		});
		
		$('#userModal').on('click','#log',function() {
			getUser("Log In");
			$('#userModal input[name="username"]').focus();
		});
		
		$('#userModal').on('keypress','#password',function() {
			if ( event.which == 13 ) {
			     event.preventDefault();
			     var username = $('#username').val();
			     var password = $('#password').val();
			     userLogin(username, password);
			  }
		});
		
		$('#cart').click(function() {
			$('#homePage').hide();
			$('#orderPage').show('slow');
			getCartItems();
			getOrderItems();
		});
		
		$('#cartFragment').on('click',':checkbox', function() {
			var parent = $(this).parent().parent().get();
			$(parent).toggleClass("highlight");
			if($(':checked').length > 0) {
				$('#selectDel').removeAttr('disabled');
				$('#allDel').attr('disabled', 'disabled');
				$('#selectOrder').removeAttr('disabled');
				$('#allOrder').attr('disabled', 'disabled');				
			} else {
				$('#allDel').removeAttr('disabled');
				$('#selectDel').attr('disabled', 'disabled');
				$('#allOrder').removeAttr('disabled');
				$('#selectOrder').attr('disabled', 'disabled');
			}
		});
		
		$('#cartFragment').on('click','#selectDel, #selectOrder', function() {
			var id = $(this).attr('id');
			if(id == "selectDel"){
				if(confirm("Are you sure you want to delete selected?")) {
					var length = $('#cartFragment :checked').length;
					for(var i = length-1; i < length && i >= 0; i--){
						var box = $('#cartFragment :checked')[i];
						var parent = $(box).parent().parent().get();
						$(parent).html('<h2>Your Cart item is deleted</h2>');
					}
					if($('#cartFragment :checkbox').length > 0) {
						$('#allDel').removeAttr('disabled');
						$('#selectDel').attr('disabled', 'disabled');
						$('#allOrder').removeAttr('disabled');
						$('#selectOrder').attr('disabled', 'disabled');
					} else {
						$('#allDel').attr('disabled', 'disabled');
						$('#selectDel').attr('disabled', 'disabled');
						$('#allOrder').attr('disabled', 'disabled');
						$('#selectOrder').attr('disabled', 'disabled');
					}
			    }
			} else {
				if(confirm("Are you sure you want to order selected?")) {
					var length = $('#cartFragment :checked').length;
					for(var i = 0; i < length; i++){
						var box = $('#cartFragment :checked')[i];
						var parent = $(box).parent().parent().get();
						$(parent).html('<h2>Your Cart item is ordered</h2>');
						$('#allDel').removeAttr('disabled');
						$('#selectDel').attr('disabled', 'disabled');
						$('#allOrder').removeAttr('disabled');
						$('#selectOrder').attr('disabled', 'disabled');
					}
					if($('#cartFragment :checkbox').length > 0) {
						$('#allDel').removeAttr('disabled');
						$('#selectDel').attr('disabled', 'disabled');
						$('#allOrder').removeAttr('disabled');
						$('#selectOrder').attr('disabled', 'disabled');
					} else {
						$('#allDel').attr('disabled', 'disabled');
						$('#selectDel').attr('disabled', 'disabled');
						$('#allOrder').attr('disabled', 'disabled');
						$('#selectOrder').attr('disabled', 'disabled');
					}
			    }
			}
			
			
		});
		
		$('#cartFragment').on('click','#allDel, #allOrder', function() {
			var parent = $(this).parent();
			var id = $(this).attr('id');
			if(id == "allDel"){
				if(confirm("Are you sure you want to delete all?"))
			    {
					$('#cartFragment .panel-body').empty();
					$(parent).html('<p>All Cart items deleted</p>');
					$(parent).addClass("text-center");
			    }
			} else {
				if(confirm("Are you sure you want to order allt?"))
			    {
					$('#cartFragment .panel-body').empty();
						$(parent).html('<p>All Cart items ordered</p>');
						$(parent).addClass("text-center");
			    }
			}
		});
		
		$('#homePage').on('click', '.thumb > img', function() {
			displayProduct(this);
		});
			
		$('#orderFragment').on('click', 'button > span.glyphicon-star', function() {
			var orderNumber = $(this).parent().attr('aria-label');
			var reviewDiv = $(this).parent().parent().parent().next('div').children(".userPeview").get();
			loadReview(orderNumber, reviewDiv);	
			makeActive(reviewDiv);
		});
		
		$('#orderFragment').on('click', 'button > span.glyphicon-map-marker', function() {
			var orderNumber = $(this).parent().attr('aria-label');
			var mapElement = $(this).parent().parent().parent().next('div').children(".productTracking").get();
			makeActive(mapElement);
			loadMap(orderNumber, mapElement);
		});
		
		$('#orderFragment').on('click', 'button > span.glyphicon-share', function() {
			var orderNumber = $(this).parent().attr('aria-label');
			var deliveryStatusDiv = $(this).parent().parent().parent().next('div').children(".deliveryStatus").get();
			makeActive(deliveryStatusDiv);
			loadDeliveryStatusDiv(orderNumber, deliveryStatusDiv);
		
		});