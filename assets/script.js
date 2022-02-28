if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
	var remove = document.getElementsByClassName('btn-danger');
	for(var i=0; i<remove.length; i++){
		var button = remove[i];
		button.addEventListener('click', removeItem);
	}

	var quantity = document.getElementsByClassName('input-number')
    for (var i=0; i<quantity.length; i++) {
        var input = quantity[i];
        input.addEventListener('change', quantityChange);
    }

	var addCart = document.getElementsByClassName('btn-secondary')
    for (var i=0; i<addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addToCard);
    }
}

function removeItem(event) {
	var buttonClicked = event.target;
	buttonClicked.parentElement.parentElement.remove();
	cartTotal();
}

function quantityChange(event) {
	var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    cartTotal();
}

function addToCard(event) {
	var button = event.target;
    var cartItem = button.parentElement.parentElement;
    var name = cartItem.getElementsByClassName('item-name')[0].innerText;
	var price = cartItem.getElementsByClassName('item-prices')[0].innerText;
	var price = parseInt(price);
	var prices = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price);
    var image = cartItem.getElementsByClassName('img-coffee')[0].src;
    addItemToCart(name, prices, price, image);
    cartTotal();
}

function addItemToCart(name, prices, price, image) {
    var cartBox = document.createElement('div');
    cartBox.classList.add('cart-title');
    var cartItems = document.getElementsByClassName('cart-box')[0];;
    var cartItemNames = cartItems.getElementsByClassName('item-name');
    for (var i=0; i<cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == name) {
            alert('This item is already added to the cart');
            return;
        }
    }
    var cartBoxContents = `
	<div class="cart-box">
		<div class="row cart-items">
			<div class="col-md-4 col-xl-4">
				<div class="row row-center">
					<div class="col-xl-2">
						<img src="${image}" alt="" class="radius-image img-fluid img-coffee">
					</div>
					<div class="col">
						<h5 class="item-name">${name}</h5>
					</div>
				</div>
			</div>
			<div class="col-md-4 col-xl-3">
				<h5>${prices}</h5>
				<input type="hidden" name="price" value="${price}">
			</div>
			<div class="col-md-4 col-xl-3 col-centered">
				<input type="number" class="form-control input-number" value="1" min="1" max="100" name="quantity">
				<div style="margin-left: 20px;"></div>
				<button class="btn btn-danger"><i class="fas fa-trash"></i></button>
			</div>
			<div class="col-md-4 col-xl-2">
				<h5 class="price-total">${price}</h5>
			</div>
		</div>
	</div>`
    cartBox.innerHTML = cartBoxContents;
    cartItems.append(cartBox);
	var elmnt = document.getElementById("cart");
  	elmnt.scrollIntoView();
    cartBox.getElementsByClassName('btn-danger')[0].addEventListener('click', removeItem);
    cartBox.getElementsByClassName('input-number')[0].addEventListener('change', quantityChange);
}

function cartTotal() {
    var cartBox = document.getElementsByClassName('cart-box')[0];
    var cartItems = cartBox.getElementsByClassName('cart-items');
	var subtotal = 0;
	var totalTagihan = 0;
    for (var i=0; i<cartItems.length; i++) {
        var cartItem = cartItems[i];
		var price = cartItem.querySelector('input[name="price"]').value;
		var quantity = cartItem.querySelector('input[name="quantity"]').value;
		document.getElementsByClassName('price-total')[i].innerText = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price * quantity);
		subtotal += (price * quantity);
	}
	totalTagihan += subtotal + 3000;
    document.getElementsByClassName('price-subtotal')[0].innerText = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(subtotal);
    document.getElementsByClassName('totalHargaResult')[0].innerText = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(subtotal);
	document.getElementsByClassName('totalTagihanResult')[0].innerText = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(totalTagihan);
}