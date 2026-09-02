fetch("seller vs total_revenue.csv")
    .then(Response => Response.text())
    .then(data => {
        const rows = data.split("\n");
        console.log(rows);

    });