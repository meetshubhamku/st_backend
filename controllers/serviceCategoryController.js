const ServiceCategory = require("../model/ServiceCategory");

exports.addServiceCategory = async (req, res) => {
  try {
    const body = req.body;
    const newService = await ServiceCategory.create(body);
    return res.status(200).json({
      success: true,
      data: newService,
    });
  } catch (error) {
    return res.status(401).json({
      error,
      success: false,
      message: error,
    });
  }
};

exports.getAllServicesCategory = async (req, res) => {
  try {
    const AllServices = await ServiceCategory.findAll();
    return res.status(200).json({
      success: true,
      data: AllServices,
    });
  } catch (error) {
    return res.status(401).json({
      error: true,
      message: error,
      sucess: false,
    });
  }
};

exports.updateServiceCategory = async (req, res) => {
  try {
    const body = req.body;
    const newService = await ServiceCategory.update(body, {
      where: {
        id: body.id,
      },
    });
    return res.status(200).json({
      success: true,
      data: newService,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      error,
      message: error,
    });
  }
};

exports.deleteServiceCategory = async (req, res) => {
  try {
    const data = await ServiceCategory.destroy({
      where: {
        id: req.body.id,
      },
    });
    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: true,
      message: error,
    });
  }
};
