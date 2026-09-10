fetch("seller vs total_revenue.csv")
    .then(response => response.text())
    .then(data => {

        const rows = data.trim().split("\n");

        
        let sellerdata = []
        for (let i = 1; i < rows.length; i++) {

            const row = rows[i].split(",");

            const seller = row[0];
            const revenue = Number(row[1]);
            sellerdata.push({
                seller: seller,
                revenue: revenue
            });

        }

        //sort the sellerdata array in descending order based on revenue
        sellerdata.sort((a, b) => b.revenue - a.revenue);
        // get the top 10 sellers
        sellerdata = sellerdata.slice(0, 10);

        const sellers = sellerdata.map(item => item.seller);
        const revenues = sellerdata.map(item => item.revenue);

        new Chart(document.getElementById("sellerChart"), {

            type: "bar",

            data: {
                labels: sellers.map(item => item.substring(0, 8) + "..."),

                datasets: [{
                    label: "Total Revenue",
                    data: revenues
                }]
            },

            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false
            }

        });

    });

    fetch("seller vs total_order.csv")
    .then(response => {
        console.log("Status:", response.status);
        console.log("Requested URL:", response.url);

        if (!response.ok) {
            throw new Error("CSV file not found");
        }

        return response.text();
    })
    .then(data => {
        
        const rows = data.trim().split("\n");

        
        let orderdata = []
        for (let i = 1; i < rows.length; i++) {

            const row = rows[i].split(",");

            const seller = row[0];
            const total_order = Number(row[1]);
            orderdata.push({
                seller: seller,
                total_order: total_order
            });

        }
        const sellers = orderdata.map(item => item.seller);
const orders = orderdata.map(item => item.total_order);

new Chart(document.getElementById("sellerOrderChart"), {

    type: "bar",

    data: {
        labels: orderdata.map(item => item.seller.substring(0, 8) + "..."),

        datasets: [{
            label: "Total Orders",
            data: orders
        }]
    },

    options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false
    }

});
    });

fetch("top_10_seller vs product_sold.csv")
    .then(response => {
        console.log("Status:", response.status);
        console.log("request url", response.url)

        if(!response.ok)
            throw new Error("CSV File Not Found")

        return response.text();
            
     })
    .then (data => {
        const rows = data.trim().split("\n");

        console.log(data)

        let productdata = []
        for(let i = 1; i < rows.length; i++) {

            const row = rows[i].split(",");

            const seller = row[0];
            const product = row[1];
            productdata.push({
                seller: seller,
                product: product

            });

        }
        const sellers = productdata.map(item => item.seller);
        const products = productdata.map(item => item.product)

        new Chart(document.getElementById("SellerProductChart"),{
        
            type: "bar",

            data: {
        labels: productdata.map(item => item.seller.substring(0, 8) + "..."),

        datasets: [{
            label: "product",
            data: products
        }]
    },
        options: {
            indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false
    }
        });

           });

fetch("seller vs avg_order_value.csv")
    .then(response => {
        console.log("Status:", response.status);
        console.log("request url", response.url)

        if(!response.ok)
            throw new Error("CSV File Not Found")

        return response.text();
            
     })
    .then (data => {
        const rows = data.trim().split("\n");

        console.log(data)

        let seller_avg_order_value = []
        for(let i = 1; i < rows.length; i++) {

            const row = rows[i].split(",");

            const seller = row[0];
            const avg_order_value = row[3];
            seller_avg_order_value.push({
                seller: seller,
                avg_order_value: avg_order_value,

            });

        }

        //sort the sellerdata array in descending order based on revenue
        seller_avg_order_value.sort((a, b) => b.avg_order_value - a.avg_order_value);
        // get the top 10 sellers
        seller_avg_order_value = seller_avg_order_value.slice(0, 10);

        const sellers = seller_avg_order_value.map(item => item.seller);
        const avg_order_value = seller_avg_order_value.map(item => item.avg_order_value)

        new Chart(document.getElementById("SellerAvgOrderValue"),{
        
            type: "bar",

            data: {
        labels: seller_avg_order_value.map(item => item.seller.substring(0, 8) + "..."),

        datasets: [{
            label: "avg order value",
            data: avg_order_value
        }]
    },
        options: {
            indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false
    }
        });

           });
