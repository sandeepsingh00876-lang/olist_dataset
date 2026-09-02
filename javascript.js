fetch("seller vs total_revenue.csv")
    .then(response => response.text())
    .then(data => {

        const rows = data.split("\n");

        const headers = rows[0].split(",");

        console.log(headers);

        for (let i = 1; i < rows.length; i++) {

            const row = rows[i].split(",");
            if (rows[i].trim() === "") {
        continue;
    }

            const seller = row[0];
            const revenue = Number(row[1]);

            console.log(seller, revenue);
        }
    });