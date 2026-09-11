let sellerdata = [];


// =====================================
// LOAD CSV
// =====================================

fetch("seller_performance.csv")

    .then(response => {

        if (!response.ok) {
            throw new Error("CSV file not found");
        }

        return response.text();

    })

    .then(data => {

        const rows = data.trim().split("\n");

        const headers = rows[0].split(",");

        sellerdata = [];

        for (let i = 1; i < rows.length; i++) {

            const row = rows[i].split(",");

            sellerdata.push({

                seller_id: row[0],

                total_revenue: Number(row[1]),

                avg_order_value: Number(row[2]),

                total_orders: Number(row[3]),

                total_product_sold: Number(row[4])

            });

        }


        console.log("Seller Performance Data:", sellerdata);


        // Run dashboard functions

        calculateKPIs();

        createRevenueChart();

        createOrderChart();

        createProductChart();

        createAOVChart();

        createSellerTable();

    })

    .catch(error => {

        console.error("Error loading CSV:", error);

    });



// =====================================
// KPI CALCULATIONS
// =====================================

function calculateKPIs() {

    const totalRevenue = sellerdata.reduce(
        (sum, item) => sum + item.total_revenue,
        0
    );


    const totalOrders = sellerdata.reduce(
        (sum, item) => sum + item.total_orders,
        0
    );


    const totalProducts = sellerdata.reduce(
        (sum, item) => sum + item.total_product_sold,
        0
    );


    const totalSellers = sellerdata.length;


    document.getElementById("totalRevenue").textContent =
        "₹" + totalRevenue.toLocaleString("en-IN", {
            maximumFractionDigits: 0
        });


    document.getElementById("totalOrders").textContent =
        totalOrders.toLocaleString("en-IN");


    document.getElementById("totalSellers").textContent =
        totalSellers.toLocaleString("en-IN");


    document.getElementById("totalProducts").textContent =
        totalProducts.toLocaleString("en-IN");

}



// =====================================
// REVENUE CHART
// =====================================

function createRevenueChart() {

    const data = [...sellerdata]
        .sort((a, b) => b.total_revenue - a.total_revenue)
        .slice(0, 10);


    new Chart(document.getElementById("revenueChart"), {

        type: "bar",

        data: {

            labels: data.map(item =>
                item.seller_id.substring(0, 8) + "..."
            ),

            datasets: [{

                label: "Total Revenue",

                data: data.map(item =>
                    item.total_revenue
                ),

                borderWidth: 0

            }]

        },

        options: {

            indexAxis: "y",

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: false
                }

            },

            scales: {

                x: {
                    beginAtZero: true
                }

            }

        }

    });

}



// =====================================
// ORDERS CHART
// =====================================

function createOrderChart() {

    const data = [...sellerdata]
        .sort((a, b) => b.total_orders - a.total_orders)
        .slice(0, 10);


    new Chart(document.getElementById("orderChart"), {

        type: "bar",

        data: {

            labels: data.map(item =>
                item.seller_id.substring(0, 8) + "..."
            ),

            datasets: [{

                label: "Total Orders",

                data: data.map(item =>
                    item.total_orders
                ),

                borderWidth: 0

            }]

        },

        options: {

            indexAxis: "y",

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: false
                }

            }

        }

    });

}



// =====================================
// PRODUCTS SOLD CHART
// =====================================

function createProductChart() {

    const data = [...sellerdata]
        .sort((a, b) => b.total_product_sold - a.total_product_sold)
        .slice(0, 10);


    new Chart(document.getElementById("productChart"), {

        type: "bar",

        data: {

            labels: data.map(item =>
                item.seller_id.substring(0, 8) + "..."
            ),

            datasets: [{

                label: "Products Sold",

                data: data.map(item =>
                    item.total_product_sold
                ),

                borderWidth: 0

            }]

        },

        options: {

            indexAxis: "y",

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: false
                }

            }

        }

    });

}



// =====================================
// AVERAGE ORDER VALUE CHART
// =====================================

function createAOVChart() {

    const data = [...sellerdata]
        .sort((a, b) => b.avg_order_value - a.avg_order_value)
        .slice(0, 10);


    new Chart(document.getElementById("aovChart"), {

        type: "bar",

        data: {

            labels: data.map(item =>
                item.seller_id.substring(0, 8) + "..."
            ),

            datasets: [{

                label: "Average Order Value",

                data: data.map(item =>
                    item.avg_order_value
                ),

                borderWidth: 0

            }]

        },

        options: {

            indexAxis: "y",

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: false
                }

            }

        }

    });

}



// =====================================
// COMPLETE SELLER TABLE
// =====================================

function createSellerTable() {

    const tableBody = document.getElementById("sellerTableBody");


    tableBody.innerHTML = sellerdata.map(item => `

        <tr>

            <td>${item.seller_id}</td>

            <td>₹${item.total_revenue.toLocaleString("en-IN")}</td>

            <td>${item.avg_order_value.toLocaleString("en-IN")}</td>

            <td>${item.total_orders.toLocaleString("en-IN")}</td>

            <td>${item.total_product_sold.toLocaleString("en-IN")}</td>

        </tr>

    `).join("");

}



// =====================================
// SEARCH SELLER
// =====================================

document.getElementById("searchInput").addEventListener("input", function () {

    const searchValue = this.value.toLowerCase();


    const filteredData = sellerdata.filter(item =>
        item.seller_id.toLowerCase().includes(searchValue)
    );


    const tableBody = document.getElementById("sellerTableBody");


    tableBody.innerHTML = filteredData.map(item => `

        <tr>

            <td>${item.seller_id}</td>

            <td>₹${item.total_revenue.toLocaleString("en-IN")}</td>

            <td>₹${item.avg_order_value.toLocaleString("en-IN")}</td>

            <td>${item.total_orders.toLocaleString("en-IN")}</td>

            <td>${item.total_product_sold.toLocaleString("en-IN")}</td>

        </tr>

    `).join("");

});
