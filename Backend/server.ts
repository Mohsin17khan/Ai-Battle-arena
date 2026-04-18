import app from "./src/app.js";

import { connectToMongoDB } from "./src/config/mongo.connect.js";

connectToMongoDB()




app.listen(3000, () =>{
    console.log('Server is running on port 3000');  
})