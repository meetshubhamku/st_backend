const Service = require("../model/Service");
const ServiceCategory = require("../model/ServiceCategory");
exports.addService = async (req, res) => {
  try {
    const body = req.body;
    const newService = await Service.create(body);
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
exports.updateService = async (req, res) => {
  try {
    const body = req.body;
    const newService = await Service.update(body, {
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

exports.getAllServices = async (req, res) => {
  try {
    const AllServices = await Service.findAll({
      include: { model: ServiceCategory, required: true },
    });
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

exports.deleteService = async (req, res) => {
  try {
    const output = await Service.destroy({
      where: {
        id: req.body.id,
      },
    });
    return res.status(200).json({
      success: true,
      data: output,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: true,
      message: error,
    });
  }
};
