export const sendWhatsAppMessage = (
  productName: string,
  productImage: string
) => {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const phoneNumber = "2347016027618";
    const message =
      `*New Order Inquiry*\n\n` +
      `I would like to order: *${productName}*\n\n` +
      `You can view the product at:\n${productImage}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
    return true;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return false;
  }
};
