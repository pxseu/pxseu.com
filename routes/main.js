const requestIp = require('request-ip');
const express = require("express");
const router = express.Router();

const ipList = JSON.parse(process.env.ipList);

router.get("/about", async (req, res, next) => {
    const clientIp = requestIp.getClientIp(req);
  
    if (ipList.some(ip => ip == clientIp)){
      return res.render("about.ejs", { hiddenText: JSON.parse(process.env.HiddenData) });
    };
    next();
});

module.exports = router;