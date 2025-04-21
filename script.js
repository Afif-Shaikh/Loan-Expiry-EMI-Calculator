document.getElementById("loanForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let loanAmount = parseFloat(document.getElementById("loanAmount").value);
    let interestRate = parseFloat(document.getElementById("interestRate").value) / 100;
    let installments = parseInt(document.getElementById("installments").value);
    let frequency = document.getElementById("frequency").value;
    let startDate = new Date(document.getElementById("startDate").value);

    // Calculate EMI
    let ratePerPeriod;
    let periodsInYear;
    
    if (frequency === "monthly") {
        ratePerPeriod = interestRate / 12;
        periodsInYear = 12;
    } else if (frequency === "quarterly") {
        ratePerPeriod = interestRate / 4;
        periodsInYear = 4;
    } else if (frequency === "halfyearly") {
        ratePerPeriod = interestRate / 2;
        periodsInYear = 2;
    } else if (frequency === "yearly") {
        ratePerPeriod = interestRate;
        periodsInYear = 1;
    }

    let emi = (loanAmount * ratePerPeriod * Math.pow(1 + ratePerPeriod, installments)) / (Math.pow(1 + ratePerPeriod, installments) - 1);

    // Calculate Loan Expiry Date (minus 1 month)
    let expiryDate = new Date(startDate);
    
    // Add installments based on frequency
    if (frequency === "monthly") {
        expiryDate.setMonth(expiryDate.getMonth() + installments); // Add months
    } else if (frequency === "quarterly") {
        expiryDate.setMonth(expiryDate.getMonth() + (installments * 3)); // Add months for quarterly
    } else if (frequency === "halfyearly") {
        expiryDate.setMonth(expiryDate.getMonth() + (installments * 6)); // Add months for half-yearly
    } else if (frequency === "yearly") {
        expiryDate.setFullYear(expiryDate.getFullYear() + installments); // Add years
    }

    // Subtract 1 month to get the expiry date minus 1 month
    expiryDate.setMonth(expiryDate.getMonth() - 1);

    // Format expiry date in dd-mm-yyyy format
    let expiryDateString = ("0" + expiryDate.getDate()).slice(-2) + "-" + ("0" + (expiryDate.getMonth() + 1)).slice(-2) + "-" + expiryDate.getFullYear();

    // Display results
    document.getElementById("emiAmount").innerText = emi.toFixed(2);
    document.getElementById("expiryDate").innerText = expiryDateString;
});
