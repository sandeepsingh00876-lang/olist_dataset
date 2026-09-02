f\










\\etch("seller vs total_revenue.csv")
    .then(response => response.text())
    .then(data => {

        const rows = data.trim().split("\n");

        let sellers = [];
        let revenues = [];

        for (let i = 1; i < rows.length; i++) {

            const row = rows[i].split(",");

            sellers.push(row[0]);
            revenues.push(Number(row[1]));

        }

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