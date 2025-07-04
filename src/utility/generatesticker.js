// src/utils/stickerGenerator.js
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";

export const generateSticker = async (vehicle) => {
  try {
    const vehicleImageHtml = vehicle.imageBase64
      ? `
      <div style="
        margin: 20px 0; 
        text-align: center;
        background: #f8f8f8;
        padding: 10px;
        border-radius: 8px;
      ">
        <img 
          src="data:image/jpeg;base64,${vehicle.imageBase64}" 
          style="
            max-width: 100%;
            max-height: 200px;
            border-radius: 5px;
            object-fit: contain;
          "
          alt="Vehicle Image"
        />
      </div>
    `
      : "";

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
          body { font-family: 'Roboto', sans-serif; }
        </style>
      </head>
      <body>
        <div style="
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          padding: 30px;
          background: white;
          border: 15px solid #0782F9;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          position: relative;
          overflow: hidden;
        ">
          <div style="position: relative; z-index: 1;">
            <div style="
              display: flex; 
              align-items: center; 
              justify-content: center; 
              margin-bottom: 20px;
            ">
              <h1 style="
                color: #0782F9;
                margin: 0;
                font-size: 28px;
                text-transform: uppercase;
                letter-spacing: 2px;
                font-weight: 700;
              ">
                Vehicle Pass
              </h1>
            </div>
            <hr style="
              border: 0;
              height: 1px;
              background: linear-gradient(to right, transparent, #0782F9, transparent);
              margin: 20px 0;
            ">
            ${vehicleImageHtml}
            <div style="
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              margin: 25px 0;
            ">
              <div style="
                background: #f8f8f8; 
                padding: 12px; 
                border-radius: 5px;
                border-left: 4px solid #0782F9;
              ">
                <strong style="
                  display: block; 
                  color: #666; 
                  font-size: 12px;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                ">Make</strong>
                <span style="
                  font-size: 18px; 
                  font-weight: 500;
                ">${vehicle.vehicleMake || "N/A"}</span>
              </div>
              
              <div style="
                background: #f8f8f8; 
                padding: 12px; 
                border-radius: 5px;
                border-left: 4px solid #0782F9;
              ">
                <strong style="
                  display: block; 
                  color: #666; 
                  font-size: 12px;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                ">Model</strong>
                <span style="
                  font-size: 18px; 
                  font-weight: 500;
                ">${vehicle.vehicleModel || "N/A"}</span>
              </div>
              
              <div style="
                background: #f8f8f8; 
                padding: 12px; 
                border-radius: 5px;
                border-left: 4px solid #0782F9;
              ">
                <strong style="
                  display: block; 
                  color: #666; 
                  font-size: 12px;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                ">License Plate</strong>
                <span style="
                  font-size: 18px; 
                  font-weight: bold; 
                  color: #0782F9;
                ">${vehicle.numberPlate || "N/A"}</span>
              </div>
            </div>

            <div style="
              margin-top: 30px;
              padding-top: 15px;
              border-top: 1px dashed #ccc;
              display: flex;
              justify-content: space-between;
              font-size: 12px;
              color: #666;
            ">
              <div>
                <strong>Issued:</strong> ${new Date(
                  vehicle.createdAt?.toDate()
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div>
                <strong>ID:</strong> ${vehicle.id.slice(0, 8).toUpperCase()}
              </div>
            </div>
            <div style="
              margin-top: 20px;
              text-align: center;
              font-size: 10px;
              color: #999;
            ">
              <p>Valid only with Starthmore ID</p>
              <p>© ${new Date().getFullYear()} Vehicle Authorization System</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({
      html,
      width: 612,
      height: 792,
      base64: false,
    });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri, {
        mimeType: "application/pdf",
        dialogTitle: "Save Vehicle Sticker",
        UTI: "com.adobe.pdf",
      });
    } else {
      Alert.alert(
        "Success",
        "Vehicle sticker PDF has been generated successfully!"
      );
    }
  } catch (error) {
    console.error("Error generating sticker:", error);
    Alert.alert("Error", "Failed to generate sticker. Please try again later.");
  }
};
