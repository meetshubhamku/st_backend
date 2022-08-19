const Appointment = require("../model/Appointment");
const moment = require("moment");
const Service = require("../model/Service");
const Employee = require("../model/Employee");
const User = require("../model/User");
const { Op, Sequelize } = require("sequelize");
exports.addAppointment = async (req, res) => {
  try {
    const body = req.body;

    body.date = moment(body.date).format("YYYY-MM-DD");
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
        ["status", "ASC"],
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

exports.getAppointmentByOpenStatus = async (req, res) => {
  try {
    const resdata = await Appointment.findAll({
      attributes: [
        "status",
        "date",
        [Sequelize.fn("COUNT", Sequelize.col("status")), "count"],
      ],
      where: {
        status: "Open",
      },
      group: "status",
    });
    return res.status(200).json({
      success: true,
      data: resdata,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      error,
      message: error,
    });
  }
};

exports.getAppointmentsByUser = async (req, res) => {
  try {
    const { id } = req.body;
    const AllServices = await Appointment.findAll({
      where: {
        user_id: id,
      },
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

exports.getAppointmentsByDate = async (req, res) => {
  try {
    let { startDate, endDate } = req.body;
    startDate = startDate.toString();
    endDate = endDate.toString();

    const resdata = await Appointment.findAll({
      attributes: [
        "status",
        "date",
        [Sequelize.fn("COUNT", Sequelize.col("status")), "count"],
      ],
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      group: "status",
    });

    return res.status(200).json({
      success: true,
      data: resdata,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      error,
      message: error,
    });
  }
};

exports.getAppointmentsByMonth = async (req, res) => {
  try {
    let { startDate, endDate } = req.body;
    startDate = startDate.toString();
    endDate = endDate.toString();

    const resdata = await Appointment.findAll({
      attributes: [
        "status",
        "date",
        [Sequelize.fn("COUNT", Sequelize.col("status")), "count"],
      ],
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      group: ["date", "status"],
    });
    return res.status(200).json({
      success: true,
      data: resdata,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      error,
      message: error,
    });
  }
};

exports.getAppointmentsByServiceCount = async (req, res) => {
  try {
    let { startDate, endDate } = req.body;
    startDate = startDate.toString();
    endDate = endDate.toString();

    const resdata = await Appointment.findAll({
      attributes: [
        "service_id",
        "date",
        [Sequelize.fn("COUNT", Sequelize.col("service_id")), "count"],
      ],
      include: [{ model: Service, required: true }],
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      group: "service_id",
    });
    return res.status(200).json({
      success: true,
      data: resdata,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      error,
      message: error,
    });
  }
};

exports.getAppointmentsByServiceAndDate = async (req, res) => {
  try {
    let { startDate, endDate } = req.body;
    startDate = startDate.toString();
    endDate = endDate.toString();

    const resdata = await Appointment.findAll({
      attributes: [
        "status",
        "date",
        [Sequelize.fn("COUNT", Sequelize.col("status")), "count"],
      ],
      include: [{ model: Service, required: true }],
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      group: ["date", "status"],
    });
    return res.status(200).json({
      success: true,
      data: resdata,
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
    body.date = moment(body.date).format("YYYY-MM-DD");
    const newService = await Appointment.update(body, {
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

exports.cancelAppointment = async (req, res) => {
  try {
    const { ids } = req.body;
    let data = [];
    ids.map((item) => {
      data.push(
        Appointment.update(
          {
            status: "Closed",
          },
          {
            where: {
              id: item,
            },
          }
        )
      );
    });
    return res.status(200).json({
      success: true,
      data,
    });
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
    const output = await Appointment.destroy({
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
      error,
      message: error,
    });
  }
};
