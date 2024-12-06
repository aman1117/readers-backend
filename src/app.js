const express = require('express');


const app = express();
const PORT = 1708;

// request handler
app.use("/test", (req, res) => {
  res.send("Hello");
})

app.use((req, res) => {
  res.send("Hello biro");
})



app.listen(PORT, () => {
  console.log(`server listening on port:${PORT}...`);
});

