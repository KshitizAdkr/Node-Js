class authController {
  register = (req, res, next) => {

    let data = req.body;
    data.image = req.file


    res.json({
      data: data,
      message: "Your account has been registered successfully",
      status: "SUCCESS",
    });
  };

  login = (req, res, next) => {
    res.json({
      data: "Login Request",
      message: "Log-In successful",
      status: "SUCCESS",
    });
  };

  activate = (req, res, next) => {
    res.json({
      data: {
        params: req.params,
      },
      message: "User account has been activated successfully",
      status: "OK",
    });
  };

  update = (req, res, next) => {
    res.json({
      data: {
        params: req.params,
      },
      message: "Update User",
      status: "SUCCESS",
    });
  };

  Logout = (req, res, next) => {
    res.json({
      data: null,
      message: "User has logged out successfully",
      status: "OK",
    });
  };
}

const authCtrl = new authController();

module.exports = authCtrl;
