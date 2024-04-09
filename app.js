var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var paypalButton = document.getElementById("paypal-button-container");

// Funktion zur Überprüfung der Formulargültigkeit
function checkFormValidity() {
    var name = nameInput.value.trim();
    var email = emailInput.value.trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Überprüfe, ob Name und E-Mail ausgefüllt sind
    if (name !== "" && email !== "" && emailPattern.test(email)) {
        return true; // Aktiviere den PayPal-Button
    } else {
        console.log('nüscht')
        return false; // Deaktiviere den PayPal-Button
    }
}

document.getElementById("ticket-form").addEventListener("input", function() {
    var paypalButton = document.getElementById("paypal-button-container");

    // Überprüfen, ob Formular gültig ist
    if (checkFormValidity()) {
        paypalButton.classList.remove("paypal-button-disabled"); // PayPal-Button aktivieren
    } else {
        paypalButton.classList.add("paypal-button-disabled"); // PayPal-Button deaktivieren
    }
});

document.getElementById('quantity').addEventListener('input', updateTotalPrice);

    function updateTotalPrice() {
        var ticketPrice = 30.00; // 30 Euro per ticket
        var ticketCount = parseInt(document.getElementById('quantity').value);
        var totalPrice = ticketPrice * ticketCount;
        document.getElementById('total-price').textContent = totalPrice.toFixed(2).replace('.', ',') + " €";
    }

paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: parseFloat(document.getElementById('total-price').textContent),
                    currency_code: 'EUR'
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            
            // collect user data for registration process
            var name = document.getElementById("name").value;
            console.log(name);
            var email = document.getElementById("email").value;
            console.log(email);
            var quantity = document.getElementById("quantity").value;
            var price = document.getElementById("total-price").textContent;
            console.log(price);
        
            // Weiterleitung oder Bestätigungsnachricht anzeigen
            //alert('Transaction completed by ' + details.payer.name.given_name + '!');
            
            sendEmail(name, email, quantity, price);

            var conf_link =  "confirmation.html?to_email=" + encodeURIComponent(email);

            window.location.href = conf_link;
        });
    }
}).render('#paypal-button-container');


function updateTotal() {
    var quantity = parseInt(document.getElementById('quantity').value);
    var price = 30; // Preis pro Ticket
    var total = quantity * price;
    document.getElementById('total').textContent = quantity + " x " + price.toFixed(2).replace('.', ',') + " €";
}