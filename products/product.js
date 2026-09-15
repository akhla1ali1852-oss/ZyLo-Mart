// ==========================================
// ZYLO PRODUCT ORDER SYSTEM
// EmailJS + Supabase Orders
// ==========================================

let orderProductName = "";
let orderProductPrice = 0;


// ==========================================
// EMAILJS LOAD
// ==========================================

const emailJSScript = document.createElement("script");

emailJSScript.src =
    "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";

emailJSScript.onload = function () {

    emailjs.init("v6Q6Gq1wJUZn5m03Q");

    console.log("EmailJS Ready");

};

document.head.appendChild(emailJSScript);


// ==========================================
// CREATE ORDER POPUP
// ==========================================

function createOrderModal() {

    if (document.getElementById("productOrderModal")) {
        return;
    }

    const modal = document.createElement("div");

    modal.id = "productOrderModal";

    modal.innerHTML = `

        <div class="product-order-box">

            <button class="order-close-btn"
                onclick="closeProductOrder()">
                ×
            </button>

            <img id="orderProductImage"
                class="order-product-image">

            <h2 id="orderProductName"></h2>

            <div id="orderProductPrice"
                class="order-product-price">
            </div>


            <input
                type="text"
                id="customerName"
                placeholder="Your Name"
            >


            <input
                type="tel"
                id="customerPhone"
                placeholder="10-digit Mobile Number"
                maxlength="10"
            >


            <input
                type="number"
                id="customerQuantity"
                placeholder="Quantity"
                min="1"
                value="1"
            >


            <select id="customerPayment">

                <option value="">
                    Select Payment Method
                </option>

                <option value="Cash on Delivery">
                    Cash on Delivery
                </option>

            </select>


            <textarea
                id="customerAddress"
                placeholder="Delivery Address"
                rows="4"
            ></textarea>


            <button
                class="place-order-btn"
                onclick="submitProductOrder()">

                Place Order

            </button>

        </div>

    `;

    document.body.appendChild(modal);


    // ======================================
    // POPUP CSS
    // ======================================

    const style = document.createElement("style");

    style.innerHTML = `

        #productOrderModal {

            position: fixed;
            inset: 0;

            background: rgba(0,0,0,0.65);

            display: none;

            justify-content: center;
            align-items: center;

            padding: 20px;

            z-index: 999999;

        }


        .product-order-box {

            background: white;

            width: 100%;
            max-width: 430px;

            max-height: 90vh;

            overflow-y: auto;

            padding: 25px;

            border-radius: 18px;

            position: relative;

            box-sizing: border-box;

            box-shadow:
                0 20px 60px rgba(0,0,0,0.25);

        }


        .order-close-btn {

            position: absolute;

            right: 15px;
            top: 10px;

            width: 35px;
            height: 35px;

            border: none;

            border-radius: 50%;

            background: #eee;

            font-size: 25px;

            cursor: pointer;

        }


        .order-product-image {

            width: 120px;
            height: 120px;

            object-fit: contain;

            display: block;

            margin: 0 auto 15px;

        }


        #orderProductName {

            text-align: center;

            font-size: 20px;

            margin-bottom: 8px;

        }


        .order-product-price {

            text-align: center;

            font-size: 22px;

            font-weight: bold;

            margin-bottom: 20px;

        }


        .product-order-box input,
        .product-order-box select,
        .product-order-box textarea {

            width: 100%;

            padding: 13px;

            margin-bottom: 12px;

            border: 1px solid #ddd;

            border-radius: 10px;

            box-sizing: border-box;

            font-size: 15px;

            outline: none;

        }


        .product-order-box textarea {

            resize: vertical;

        }


        .place-order-btn {

            width: 100%;

            padding: 14px;

            border: none;

            border-radius: 12px;

            background: #111;

            color: white;

            font-size: 17px;

            font-weight: bold;

            cursor: pointer;

        }


        .place-order-btn:hover {

            opacity: 0.9;

        }

    `;

    document.head.appendChild(style);


    // ======================================
    // CLOSE WHEN CLICK OUTSIDE
    // ======================================

    modal.addEventListener("click", function (e) {

        if (e.target === modal) {

            closeProductOrder();

        }

    });

}


// ==========================================
// ORDER NOW
// ==========================================

function orderProduct() {

    createOrderModal();


    const nameElement =
        document.getElementById("productName");

    const priceElement =
        document.getElementById("productPrice");

    const imageElement =
        document.getElementById("mainProductImage");


    if (!nameElement || !priceElement) {

        alert("Product information nahi mili.");

        return;

    }


    orderProductName =
        nameElement.textContent.trim();


    orderProductPrice =
        priceElement.textContent
        .replace("₹", "")
        .replace(/,/g, "")
        .trim();


    document.getElementById("orderProductName").textContent =
        orderProductName;


    document.getElementById("orderProductPrice").textContent =
        "₹" + orderProductPrice;


    // Product image

    if (imageElement) {

        document.getElementById("orderProductImage").src =
            imageElement.src;

    }


    document.getElementById("productOrderModal").style.display =
        "flex";

}


// ==========================================
// CLOSE POPUP
// ==========================================

function closeProductOrder() {

    const modal =
        document.getElementById("productOrderModal");

    if (modal) {

        modal.style.display = "none";

    }

}


// ==========================================
// SUBMIT ORDER
// ==========================================

async function submitProductOrder() {

    const name =
        document.getElementById("customerName")
        .value
        .trim();


    const phone =
        document.getElementById("customerPhone")
        .value
        .trim();


    const quantity =
        parseInt(
            document.getElementById("customerQuantity")
            .value
        );


    const payment =
        document.getElementById("customerPayment")
        .value;


    const address =
        document.getElementById("customerAddress")
        .value
        .trim();


    // ======================================
    // VALIDATION
    // ======================================

    if (
        !name ||
        !phone ||
        !quantity ||
        !payment ||
        !address
    ) {

        alert("Please fill all fields ❗");

        return;

    }


    if (!/^[6-9]\d{9}$/.test(phone)) {

        alert(
            "⚠️ Please enter a valid 10-digit mobile number!"
        );

        return;

    }


    if (quantity < 1) {

        alert("Quantity kam se kam 1 honi chahiye.");

        return;

    }


    const price =
        parseFloat(orderProductPrice);


    const totalPrice =
        price * quantity;


    // ======================================
    // BUTTON DISABLE
    // ======================================

    const button =
        document.querySelector(".place-order-btn");


    button.disabled = true;

    button.textContent =
        "Placing Order...";


    try {


        // ==================================
        // 1. SAVE ORDER IN SUPABASE
        // ==================================

        const { data, error } =
            await supabaseClient
            .from("orders")
            .insert([

                {

                    customer_name: name,

                    phone: phone,

                    product_name: orderProductName,

                    quantity: quantity,

                    price: price,

                    total_price: totalPrice,

                    payment_method: payment,

                    address: address,

                    status: "pending"

                }

            ])


        if (error) {

            console.error(
                "Supabase Order Error:",
                error
            );

            throw new Error(
                "Order database mein save nahi hua."
            );

        }


        console.log(
            "Order saved in Supabase:",
            data
        );


        // ==================================
        // 2. SEND EMAIL
        // ==================================

        if (typeof emailjs === "undefined") {

            throw new Error(
                "EmailJS abhi load nahi hua. Thoda wait karke try karein."
            );

        }


        await emailjs.send(

            "service_7u8bcaq",

            "template_hvrqw6j",

            {

                from_name: name,

                phone: phone,

                quantity: quantity,

                payment: payment,

                address: address,

                product: orderProductName,

                price: "₹" + price,

                total_price: "₹" + totalPrice

            }

        );


        // ==================================
        // SUCCESS
        // ==================================

        closeProductOrder();


        alert(
            "✅ Order placed successfully!"
        );


        // Clear form

        document.getElementById("customerName").value = "";

        document.getElementById("customerPhone").value = "";

        document.getElementById("customerQuantity").value = "1";

        document.getElementById("customerPayment").value = "";

        document.getElementById("customerAddress").value = "";


    }

    catch (error) {

        console.error(
            "Order Error:",
            error
        );


        alert(
            "❌ Order place nahi ho paya.\n\n" +
            error.message
        );

    }


    finally {

        button.disabled = false;

        button.textContent =
            "Place Order";

    }

}