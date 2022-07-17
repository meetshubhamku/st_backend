const Appointment = require("../model/Appointment");
const moment = require("moment");
const Service = require("../model/Service");
const Employee = require("../model/Employee");
const User = require("../model/User");
exports.addAppointment = async (req, res) => {
  try {
    const body = req.body;

    body.date = moment(body.date).format("YYYY-MM-DD");
    console.log("Appoint : ", body);
    // moment().format('LT');
    const newService = await Appointment.create(body);
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
exports.getAppointments = async (req, res) => {
  try {
    const AllServices = await Appointment.findAll({
      include: [
        { model: Service, required: true },
        { model: Employee, required: true },
        { model: User, required: true },
      ],
      order: [
        ["date", "ASC"],
        ["time", "ASC"],
      ],
    });
    return res.status(200).json({
      success: true,
      data: AllServices,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      error,
      message: error,
    });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const body = req.body;
    console.log("Appoint : ", body);
    //   const newService = await Service.create(body);
    //   return res.status(200).json({
    //     success: true,
    //     data: newService,
    //   });
  } catch (error) {
    return res.status(401).json({
      success: false,
      error,
      message: error,
    });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const body = req.body;
    console.log("Appoint : ", body);
    //   const newService = await Service.create(body);
    //   return res.status(200).json({
    //     success: true,
    //     data: newService,
    //   });
  } catch (error) {
    return res.status(401).json({
      success: false,
      error,
      message: error,
    });
  }
};
