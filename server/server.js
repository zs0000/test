require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const db = require("./db");


app.use(cors());
app.use(express.json());

// get all breeders
app.get("/api/v1/breeders", async(req, res) => {
    try {
        //const results =  await db.query("SELECT * FROM breeders");
        const breederRatingsData = await db.query("SELECT * FROM breeders left join (SELECT breeder_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating FROM reviews GROUP BY breeder_id) reviews ON breeders.id = reviews.breeder_id;")
       // console.log("results", results);
         res.json({
             status: "success",
             results: breederRatingsData.rows.length,
             data: {
                breeders: breederRatingsData.rows
             }
            })
    } catch (err) {
        res.status(500).json("Error locating all breeders")
    }
});

//get one breeder
app.get("/api/v1/breeders/:id", async (req, res) =>{
try {
    const breeder = await db.query("SELECT * FROM breeders left join (SELECT breeder_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating FROM reviews GROUP BY breeder_id) reviews ON breeders.id = reviews.breeder_id WHERE id = $1;", [req.params.id]);
    const reviews = await db.query("SELECT * FROM reviews WHERE breeder_id = $1",[req.params.id]);
    res.status(200).json({
        status: "success",
        data: {
            breeders: breeder.rows[0],
            reviews: reviews.rows
        }
    })
} catch (error) {
    res.status(500).json("")
}
});

//create a breeder 

app.post("/api/v1/breeders", async(req, res) => {
try {
    const results = await db.query(
    "INSERT INTO breeders (name, location, price_range) values ($1, $2, $3) RETURNING *", 
    [req.body.name, req.body.location, req.body.price_range]
    );
    console.log(results);
    res.status(201).json({
        status: "success",
        data: {
            breeders: results.rows[0],
        }
    })    
} catch (err) {
    res.status(500).json("error creating breeder");
}

});

//update a breeder

app.put("/api/v1/breeders/:id", async(req, res) => {
try {
    const results = await db.query("UPDATE breeders SET name =$1, location =$2, price_range =$3 where id = $4 RETURNING *", [req.body.name, req.body.location, req.body.price_range, req.params.id]);
    res.status(200).json({
    status: "success",
    data: {
        breeders: results.rows[0]
    }
})
} catch (err) {
    res.status(500).json("Couldnt update")
}

})

//delete breeder

app.delete("/api/v1/breeders/:id", async(req, res) => {
    try {
        const delReviews = await db.query("DELETE FROM reviews WHERE breeder_id = $1", [req.params.id]);
        const results = await db.query("DELETE FROM breeders WHERE id = $1", [req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                breeders: results.rows[0],
                reviews: delReviews.rows
            }
        }) 
    } catch (err) {
     res.status(500).json("Error when Deleting item")   
    }
});

//add breeeder

app.post("/api/v1/breeders/:id/addReview", async(req,res)=>{
    try {
        const newReview = await db.query("INSERT INTO reviews (breeder_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *;",[req.params.id, req.body.name, req.body.review, req.body.rating])
        res.status(200).json({
            status: "success",
            data: {
                review: newReview.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

const port = process.env.PORT || 3001;
app.listen(port, () =>{
    console.log(`server is up and listening on ${port}`);
});