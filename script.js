document.getElementsByClassName("js-open-nav")[0].onclick = function () {document.getElementsByClassName("nav")[0].classList.remove("hidden-mobile");}
document.getElementsByClassName("js-close-nav")[0].onclick = function () {document.getElementsByClassName("nav")[0].classList.add("hidden-mobile");}

function setSlideshow(id, imgNum, transition=false) {
	var elm = document.querySelector("#"+id+ " .slideshow__imgs");
	var width = document.querySelector("#"+id+ " .slideshow__img").clientWidth;

	var prev = document.querySelector("#"+id+ " .js-slideshow-prev");
	var next = document.querySelector("#"+id+ " .js-slideshow-next");

	if (prev !== null && next !== null) {
		prev.disabled = false;
		next.disabled = false;

		if (imgNum === 1) {
			prev.disabled = true;
		} else if (imgNum === +elm.dataset.imgs) {
			next.disabled = true;
		}
	}

	var offset = imgNum - 1
	elm.dataset.imgViewed = imgNum;
	if (transition) {
		elm.style.transform = "translateX(" + -offset * width + "px)";
	} else {
		elm.classList.add("slideshow__imgs__notransition");
		setTimeout(function(){ elm.style.transform = "translateX(" + -offset * width + "px)"; }, 10);
		setTimeout(function(){ elm.classList.remove("slideshow__imgs__notransition"); }, 20);
	}

	document.querySelector("#"+id+ " .slideshow__thumbnail.selected").classList.remove("selected");
	document.querySelector("#"+id+ " .slideshow__thumbnail:nth-child("+imgNum+")").classList.add("selected");
}

function moveSlideshow(id, dir) {
	var elm = document.querySelector("#"+id+ " .slideshow__imgs");
	var imgViewed = +elm.dataset.imgViewed;

	if (imgViewed + dir < 1 || imgViewed + dir > elm.dataset.imgs) {
		return;
	}

	setSlideshow(id, imgViewed + dir, true);
}

function openLightbox() {
	var lightbox = document.querySelector(".lightbox");
	lightbox.classList.remove("hidden-desktop");

	var imgNum = document.querySelector("#slideshow .slideshow__imgs").dataset.imgViewed;
	setSlideshow("lightbox", imgNum, false);
}

function closeLightbox() {
	var lightbox = document.querySelector(".lightbox");
	lightbox.classList.add("hidden-desktop");
}

function changeQuantity(delta) {
	var elm = document.getElementsByClassName("js-quantity-count")[0];
	var quantity = Math.max(0, +elm.innerText + delta);
	elm.innerText = quantity;

}

var items = 0;
function addToCart() {
	var quantity = document.getElementsByClassName("js-quantity-count")[0].innerText;
	if (quantity === "0") {
		return;
	}
	if (items > 0) {
		document.getElementsByClassName("js-cart-item-quantity")[0].innerText = items + +quantity;
	} else {
		var item = `
		<div class="cart-item">
          <img class="cart-item__img" src="images/image-product-1-thumbnail.jpg">
          <div class="cart-item__desc">
            <span class="cart-item__desc__title">Fall Limited Edition Sneakers</span>
            <span class="cart-item__desc__price">$125 x <span class="js-cart-item-quantity">` + quantity + `</span> <span class="cart-item__desc__total">$375.00</span>
          </div>
          <button class="flex-push-right" onclick="deleteItem(this)">
            <img class="btn-icon" src="images/icon-delete.svg">
          </button>
        </div>`;

    	document.getElementsByClassName("js-cart-modal-title")[0].insertAdjacentHTML("afterend", item);
	}
	items += +quantity;
    document.getElementsByClassName("js-cart-btn")[0].setAttribute("data-items", items);

    document.getElementsByClassName("js-quantity-count")[0].innerText = "0";
}

function deleteItem(elm) {
	elm.parentNode.remove();
	items = 0;
	document.getElementsByClassName("js-cart-btn")[0].setAttribute("data-items", items);
}

function toggleCartModal(cartBtn) {
	var elm = document.getElementsByClassName("js-cart-modal")[0];
	if (elm.classList.contains("hide")) {

		elm.classList.remove("hide");
		cartBtn.classList.add("showing");
	} else {
		elm.classList.add("hide");
		cartBtn.classList.remove("showing");
	}


}