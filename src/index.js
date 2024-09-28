const app = require("./app")

const main = async () => {
    try {
       app.listen(8080)
    console.log("Server is running on port 3000"); 
    } catch (error) {
        console.log(error)
    }
    
}

main()