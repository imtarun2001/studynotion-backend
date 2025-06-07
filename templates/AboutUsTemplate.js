const messageReceived = (userName) => {
    return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
                    <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                        <tr>
                        <td style="text-align: center;">
                            <h2 style="color: #333;">Your feedback received</h2>
                            <p style="font-size: 16px; font-weight: bold; color: #2E86C1; margin: 20px 0;">Hello ${userName}, your feedback has been received successfully by our team. We appreciate your feedback and will surely look into it.</p>
                            <hr style="margin: 20px 0;"/>
                        </td>
                        </tr>
                    </table>
                    </body>
            </html>`;
};

module.exports = messageReceived;