
exports.tokenLink = (url,validity) => {
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
                            <h2 style="color: #333;">Your Link to Reset Password</h2>
                            <p style="font-size: 16px; color: #555;">Use the link below to proceed:</p>
                            <p style="font-size: 10px; font-weight: bold; color:rgb(4, 7, 206); margin: 20px 0;">${url}</p>
                            <p style="font-size: 14px; color: #777;">This OTP is valid for the next ${validity} minutes.</p>
                            <hr style="margin: 20px 0;"/>
                        </td>
                        </tr>
                    </table>
                    </body>
            </html>`;
};

exports.congratulation = (username) => {
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
                            <h2 style="color: #333;">Password updated</h2>
                            <p style="font-size: 15px; font-weight: bold; color: #000000; margin: 20px 0;">congratulations ${username} 🎉, your password has been updated successfully</p>
                            <hr style="margin: 20px 0;"/>
                            <p style="font-size: 12px; color: #aaa;">If you didn't request this, please ignore this email.</p>
                        </td>
                        </tr>
                    </table>
                    </body>
            </html>`;
}