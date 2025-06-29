class brandController {

   BrandName =  (req, res ) => {
    res.json({
        data : "any",
        message: "Brand-Name",
        status: "SUCCESS"
    })
    }

   About =  (req, res ) => {
    res.json({
        data: "Brand system data",
        message: "Brand-Info",
        status: "SUCCESS"
    })
    }
}

const brandCtrl = new brandController()

module.exports = brandCtrl