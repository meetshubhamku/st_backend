const Offer = require("../model/Offer");

exports.getOffer = async (req, res) => {
  try {
    const AllServices = await Offer.findAll();
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

exports.addOffer = async (req, res) => {
  try {
    const body = req.body;
    const newService = await Offer.create(body);
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

exports.updateOffer = async (req, res) => {
  try {
    const body = req.body;
    const newService = await Offer.update(body, {
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

exports.deleteOffer = async (req, res) => {
  try {
    const output = await Offer.destroy({
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
