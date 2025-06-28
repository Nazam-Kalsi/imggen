import app from "./src/app"

const port = process.env.PORT || 8000

app.listen(port,()=>{
    console.log("Cooking!🫡")
})

app.get('/', (req, res) => {
  res.json('Hello World!');
});
