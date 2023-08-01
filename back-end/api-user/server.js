// inicializar o meu servidor local
import app from "./src/app.js"

const PORT = process.env.PORT;

app.listen(PORT, () =>{
    console.log(`server ${PORT}`)
})