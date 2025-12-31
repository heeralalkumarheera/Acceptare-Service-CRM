// MOCK PAYMENT SERVICE (Razorpay-style)

const createOrder = async ({ amount, currency = "INR" }) => {
  return {
    orderId: "order_" + Date.now(),
    amount,
    currency,
    status: "created",
  };
};

const verifyPayment = async ({ orderId, paymentId }) => {
  // In real case: Razorpay signature verification
  return {
    success: true,
    orderId,
    paymentId,
  };
};

module.exports = {
  createOrder,
  verifyPayment,
};
