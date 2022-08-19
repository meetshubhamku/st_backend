const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuid } = require("uuid");
const Payment = require("../model/Payment");

exports.makePayment = (req, res) => {
  const { product, token } = req.body;
  const idempotencyKey = uuid();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
      name: product.user.name,
      address: {
        line1: "510 Townsend St",
        postal_code: "98140",
        city: "San Francisco",
        state: "CA",
        country: "US",
      },
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: product.price * 100,
            currency: "inr",
            customer: customer.id,
            description: product.name,
          },
          { idempotencyKey }
        )
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((error) => {
          console.error("Error from payment : ", error);
        });
    });
};

exports.savePayment = async (req, res) => {
  try {
    const { data, appointment_id } = req.body;
    const ress = await Payment.create({
      transaction_id: data.id,
      amount: data.amount,
      receipt_url: data.receipt_url,
      status: data.status,
      email: data.billing_details.name,
      appointment_id: appointment_id,
    });
    console.log("In save payment : ", ress);
    return res.status(200).json({
      success: true,
      data: ress,
    });
  } catch (error) {
    return res.status(401).json({
      error,
      success: false,
      message: error,
    });
  }
};

exports.getPayment = async (req, res) => {
  try {
    const ress = await Payment.findAll({
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json({
      success: true,
      data: ress,
    });
  } catch (error) {
    return res.status(401).json({
      error,
      success: false,
      message: error,
    });
  }
};
