let friendCount = 0;

addFriend();
addFriend();

function addFriend() {
    friendCount++;

    const div = document.createElement("div");
    div.className = "friend";
    div.innerHTML = `
        <input type="text" placeholder="Friend Name" id="name${friendCount}">
        <input type="number" placeholder="Paid ₹" id="paid${friendCount}" value="0">
    `;

    document.getElementById("friends").appendChild(div);
}

function calculate() {

    const names = [];
    const paid = [];

    for (let i = 1; i <= friendCount; i++) {

        const nameInput = document.getElementById(`name${i}`);
        const paidInput = document.getElementById(`paid${i}`);

        if (!nameInput || !paidInput) continue;

        const name = nameInput.value.trim();
        const amount = parseFloat(paidInput.value) || 0;

        if (name !== "") {
            names.push(name);
            paid.push(amount);
        }
    }

    if (names.length === 0) {
        document.getElementById("result").innerHTML = "Enter at least one friend.";
        return;
    }

    const total = paid.reduce((a, b) => a + b, 0);
    const share = total / names.length;

    let output = `Total Expense: ₹${total.toFixed(2)}<br>`;
    output += `Each Person Should Pay: ₹${share.toFixed(2)}<br><br>`;

    const creditors = [];
    const debtors = [];

    for (let i = 0; i < names.length; i++) {
        const balance = paid[i] - share;

        if (balance > 0) creditors.push({ name: names[i], amount: balance });
        if (balance < 0) debtors.push({ name: names[i], amount: -balance });
    }

    for (const debtor of debtors) {
        let remaining = debtor.amount;

        for (const creditor of creditors) {
            if (remaining === 0) break;

            const pay = Math.min(remaining, creditor.amount);

            if (pay > 0) {
                output += `${debtor.name} owes ${creditor.name} ₹${pay.toFixed(2)}<br>`;
                creditor.amount -= pay;
                remaining -= pay;
            }
        }
    }

    document.getElementById("result").innerHTML = output;
}

function clearData() {
    document.getElementById("friends").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    friendCount = 0;
    addFriend();
    addFriend();
}