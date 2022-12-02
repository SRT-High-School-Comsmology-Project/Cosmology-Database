const app = require("./app/index");
const db = require("./data/db");
//const port = process.env.PORT || 6060;
const port = process.env.PORT || 6060;

app.listen(port, () => {
    console.log(`Express app listening to ${port}`);
})