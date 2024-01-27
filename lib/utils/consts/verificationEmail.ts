export const verificationEmail = (
  confirmLink: string
) => `<div style="background-color:#000000; margin:0 auto">
<table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
    style="max-width:480px; border-radius:5px; margin:0 auto 40px; padding:20px">
    <tbody>
        <tr style="width:100%">
            <td>
                <img alt="${process.env.APPLICATION_NAME}" height="64"
                    src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1412446893.1705132800&semt=sph"
                    style="display:block; outline:none; border:none; text-decoration:none; margin:64px 0 56px" width="64"
                    class="CToWUd" data-bit="iit">
                <p style="font-size:24px; line-height:40px; margin:0 0 20px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif; color:#ffffff; font-weight:600">
                    Confirm your account
                </p>
                <p style="font-size:14px; line-height:24px; margin:0 0 40px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif; color:#aaaaaa">
                    Thank you for signing up for ${process.env.APPLICATION_NAME}. To confirm your account, please follow the button below.
                </p>
                <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
                    style="margin:0 0 40px">
                    <tbody>
                        <tr>
                            <td>
                                <a href="${confirmLink}"
                                    style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif; background-color:#ffffff; border-radius:8px; color:#0b0b0f; font-size:14px; font-weight:600; text-decoration:none; text-align:center; width:200px; padding:16px 20px 16px 20px; line-height:100%; display:inline-block; max-width:100%"
                                    target="_blank"
                                >
                                    <span></span><span style="max-width:100%; display:inline-block; line-height:120%">
                                        Confirm Account
                                    </span><span></span>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p style="font-size:14px; line-height:24px; margin:0 0 40px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif; color:#aaaaaa">
                    ${process.env.APPLICATION_ADDRESS}
                </p>
                <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
                    style="margin:40px 0">
                    <tbody>
                        <tr>
                            <td>
                                <a href="https://github.com/ZivFisher" style="color:#067df7; text-decoration:none"
                                    target="_blank"
                                >
                                    <img alt="GitHub" height="24"
                                        src="https://ci3.googleusercontent.com/meips/ADKq_NZtXQCUF7NirlrMfe_WMdo5dNIWtQ5p8jKoE8To7O6BKQONIsoer9aSaZ7G5Bx54xkdfFmF7VsvfCli_4ZAyQCPt3vnL25z4w=s0-d-e1-ft#https://resend-emails.vercel.app/static/github.png"
                                        style="display:inline-block; outline:none; border:none; text-decoration:none; margin-right:8px"
                                        width="24" class="CToWUd" data-bit="iit">
                                        </a>
                                        <a href="https://www.linkedin.com/in/ziv-fisher"
                                            style="color:#067df7; text-decoration:none" target="_blank"
                                        >
                                            <img alt="LinkedIn" height="24"
                                                src="https://ci3.googleusercontent.com/meips/ADKq_NZF82qtFtLeGD15eCqbTqIauGeJPyYUEM9llkdivRxHWt1WsWDhgPSbLIQFoMmPYj9XPw_bzBdvmu3qEXvwGdWvmFnlUTMcGJ8R=s0-d-e1-ft#https://resend-emails.vercel.app/static/linkedin.png"
                                                style="display:inline-block; outline:none; border:none; text-decoration:none; margin-right:8px"
                                                width="24" class="CToWUd" data-bit="iit">
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    
`;
