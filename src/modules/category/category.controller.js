class categoryController {
    CategoryName = (req, res) => {
    res.json({
        data: "Example Category",
        message: "Category-Name",
        status: "SUCCESS"
    });
   }

   Details = (req, res) => {
    res.json({
        data: "Category system data",
        message: "Category-Info",
        status: "SUCCESS"
    });
   }
}

const categoryCtrl = new categoryController()

module.exports = categoryCtrl