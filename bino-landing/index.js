const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/backend/nominatim/search", async (req, res) => {
    const { query, lat, lng } = req.body;
    try {
        const result = await axios.get("https://nominatim.openstreetmap.org/search", {
            params: {
            q: query,
            format: "json",
            addressdetails: 1,
            limit: 5,
            viewbox: `${lng - 0.1}, ${lat + 0.1}, ${lng + 0.1}, ${lat - 0.1}`,
            bounded: 1
            },
            headers: {
                "User-Agent": "Baskit" // Nominatim requires a UA header
            }
        })
        res.json(result.data);
    } catch(error) {
        console.log(error);
    }
})

app.listen(8080, () => {
    console.log("express is running");
})