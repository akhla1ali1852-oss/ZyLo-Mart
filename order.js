emailjs.init("v6Q6Gq1wJUZn5m03Q");

// OPEN ORDER MODAL
function openOrder(){

    document.getElementById("popupProductName").innerHTML = currentProduct;

    document.getElementById("popupProductPrice").innerHTML = currentPrice;

    document.getElementById("popupProductImage").src =
    document.getElementById("productImage").src;

    document.getElementById("orderModal").style.display="flex";

}

// CLOSE ORDER MODAL
function closeModal(){
    document.getElementById("orderModal").style.display = "none";
}

// SUBMIT ORDER (EMAIL SEND)
function submitOrder(){

    let name = document.getElementById("custName").value.trim();
    let phone = document.getElementById("custPhone").value.trim();
    let qty = document.getElementById("custQty").value.trim();
    let payment = document.getElementById("custPayment").value;
    let address = document.getElementById("custAddress").value.trim();

    // basic validation
    if(!name || !phone || !qty || !payment || !address){
        alert("Please fill all fields ❗");
        return;
    }

// Mobile number validation
    if (!/^[6-9]\d{9}$/.test(phone)) {
    alert("⚠️ Please enter a valid 10-digit mobile number!");
    return;
}

    emailjs.send("service_7u8bcaq", "template_hvrqw6j", {
        from_name: name,
        phone: phone,
        quantity: qty,
        payment: payment,
        address: address,
        product: currentProduct,
        price: currentPrice
    }).then(function(){
        document.getElementById("successPopup").style.display = "flex";
        closeModal();
    }, function(error){
        alert("Error sending order ❌");
        console.log(error);
    });
    
}

// CLOSE ON OUTSIDE CLICK
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("orderModal");

    if(modal){
        modal.addEventListener("click", function(e){
            if(e.target === modal){
                closeModal();
            }
        });
    }
});
function closeSuccessPopup(){
    document.getElementById("successPopup").style.display = "none";
}
/* ===== AUTO STICKY ORDER BAR ===== */

document.addEventListener("DOMContentLoaded", function () {

    const bar = document.createElement("div");

    bar.className = "sticky-order-bar";

    bar.innerHTML = `
        <div class="sticky-price">
            ₹${currentPrice}
        </div>

        <button class="sticky-order-btn" onclick="openOrder()">
            🛒 Order Now
        </button>
    `;

    document.body.appendChild(bar);

});
/* ===== STICKY BAR CSS ===== */

const style = document.createElement("style");

style.innerHTML = `

.sticky-order-bar{
    position:fixed;
    left:0;
    bottom:0;
    width:100%;
    background:#fff;
    box-shadow:0 -5px 20px rgba(0,0,0,.12);
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:12px 20px;
    z-index:99999;
    box-sizing:border-box;
}

.sticky-price{
    font-size:26px;
    font-weight:bold;
    color:#111;
}

.sticky-order-btn{
    background:#111;
    color:#fff;
    border:none;
    padding:14px 28px;
    border-radius:40px;
    font-size:16px;
    font-weight:bold;
    cursor:pointer;
    transition:.3s;
}

.sticky-order-btn:hover{
    transform:scale(1.05);
}

@media(max-width:768px){

.sticky-order-bar{
    padding:10px 15px;
}

.sticky-price{
    font-size:22px;
}

.sticky-order-btn{
    padding:12px 20px;
    font-size:15px;
}

}

`;

document.head.appendChild(style);
