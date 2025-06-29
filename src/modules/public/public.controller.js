class publicController {

   LandPage =  (req, res ) => {
    res.json({
        data : "any",
        message: "Home Page",
        status: "SUCCESS"
    })
    }

   AboutUs =  (req, res ) => {
    res.json({
        data: "About us data",
        message: "About Us Page",
        status: "SUCCESS"
    })
    }
}

const publicCtrl = new publicController()

module.exports = publicCtrl