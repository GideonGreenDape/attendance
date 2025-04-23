const adminlogRouter = require("express").Router();
const AdminSignIn = require("../mongodb/admin");


adminlogRouter.post("/", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    try {
        const admin = await AdminSignIn(username, password);
        if (admin) {
            res.status(200).json(admin);
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = adminlogRouter;
// This code defines an Express router for handling admin login requests. It imports the necessary modules, including the AdminSignIn function from the MongoDB logic file. The router listens for POST requests to the root URL ("/") and expects a JSON payload containing a username and password. If the credentials are valid, it stores the admin information in the session and responds with a 200 status code and the admin data. If the credentials are invalid or if there is an error, it responds with appropriate error messages and status codes.