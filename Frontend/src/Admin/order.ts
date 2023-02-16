let orders = document.getElementById("orders")! as HTMLDivElement;
let container = document.getElementById("stats-table-data")!;

const getOrders = async () => {
    let response = await fetch("");
    if (response.status === 200) {
        let orders = await response.json();
        return orders;
    } else {
        console.log("error");
    }
}

orders.addEventListener("click", async () => {
    let orders = await getOrders();
    container.innerHTML = "";
    orders.forEach((order: any) => {
        let row = document.createElement("tr");
        let id = document.createElement("td");
        let userName = document.createElement("td");
        let order_status = document.createElement("td");
        let total_price = document.createElement("td");
        let date = document.createElement("td");
        
        userName.innerHTML = order.user_id;
        order_status.innerHTML = order.order_status;
        total_price.innerHTML = order.total_price;
        date.innerHTML = order.created_at;
       
        row.appendChild(id);
        row.appendChild(userName);
        row.appendChild(order_status);
        row.appendChild(total_price);
        row.appendChild(date);
        container.insertAdjacentElement
    });
}
);
