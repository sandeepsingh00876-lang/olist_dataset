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
                labels: sellers,

                datasets: [{
                    label: "Total Revenue",
                    data: revenues
                }]
            },

            options: {
                responsive: true
            }

        });

    });

    fetch("seller vs total_revenue.csv")
    .then(response => response.text())
    .then(data =>{
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
    console.log(orderdata)

    });
