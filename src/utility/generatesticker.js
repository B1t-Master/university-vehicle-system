// src/utils/stickerGenerator.js
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";

export const generateSticker = async (vehicle) => {
  try {
    const vehicleInfo = JSON.stringify({
      id: vehicle.id,
      issued: new Date(vehicle.createdAt?.toDate()).toISOString(),
    });

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');
          * { box-sizing: border-box; }
          body { 
            font-family: 'Roboto', sans-serif;
            margin: 0;
            padding: 20px;
            background: #f5f7fa;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }
          .card {
            width: 100%;
            max-width: 400px;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            text-align: center;
            padding: 30px;
          }
          .header {
            margin-bottom: 25px;
          }
          .header h1 {
            margin: 0;
            font-size: 20px;
            font-weight: 500;
            color: #333;
          }
          .qr-container {
            margin: 0 auto 25px;
            padding: 15px;
            background: white;
            border-radius: 8px;
            display: inline-block;
          }
          .qr-code {
            width: 220px;
            height: 220px;
          }
          .footer {
            margin-top: 25px;
            font-size: 12px;
            color: #666;
          }
          .issued-date {
            font-size: 13px;
            color: #555;
            margin-top: 15px;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>VEHICLE AUTHORIZATION</h1>
          </div>
          
          <div class="qr-container">
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=15&data=${encodeURIComponent(
                vehicleInfo
              )}" 
              class="qr-code"
              alt="Vehicle QR Code"
            />
          </div>
          
          <div class="issued-date">
            Issued: ${new Date(vehicle.createdAt?.toDate()).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            )}
          </div>
          
          <div class="footer">
            Scan QR code for verification<br>
            © ${new Date().getFullYear()} Vehicle System
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
        dialogTitle: "Save Vehicle QR Code",
        UTI: "com.adobe.pdf",
      });
    } else {
      Alert.alert(
        "Success",
        "Vehicle QR code PDF has been generated successfully!"
      );
    }
  } catch (error) {
    console.error("Error generating QR code:", error);
    Alert.alert("Error", "Failed to generate QR code. Please try again later.");
  }
};
