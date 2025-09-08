import { stringToObject } from "../helpers/stringToObject.js";

export const webhookJotform = async (req, res) => {
  try {
    const jotformData = req.body.pretty;
    const jotformDataObject = stringToObject(jotformData);

    // If jotform data not found
    if (!jotformDataObject) {
      console.warn(`[${new Date().toISOString()}] No data received from Jotform`);
      return res.status(404).json({
        message: "Data from Jotform not found!",
      });
    }

    console.log(
      `[${new Date().toISOString()}] Received data from Jotform:`,
      jotformDataObject
    );

    const CRM_CONTACT_ADD = "/crm.contact.add.json";

    // Send request to bitrix
    const response = await fetch(
      `${process.env.BITRIX_INBOUND_WEBHOOK_URL}${CRM_CONTACT_ADD}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: {
            NAME: jotformDataObject["Name"],
            PHONE: [
              {
                VALUE: jotformDataObject["Phone Number"],
                VALUE_TYPE: "WORK",
              },
            ],
            EMAIL: [
              {
                VALUE: jotformDataObject["Email"],
                VALUE_TYPE: "WORK",
              },
            ],
          },
        }),
      }
    );

    const result = await response.json();

    if (!response.ok || result.error) {
      throw new Error(result.error_description || "Failed to create contact");
    }

    console.log(
      `[${new Date().toISOString()}] Successfully sent data to Bitrix24. Contact ID: ${result.result}`
    );

    return res.status(200).json({
      message: "Form data successfully sent to Bitrix24!",
      bitrixContactId: result.result,
    });
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Error sending data to Bitrix24:`,
      error.message
    );
    return res.status(500).json({
      message: "Internal Server Error!",
      error: error.message,
    });
  }
};
