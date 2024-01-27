export const passwordResetEmail = (
  resetLink: string
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
                      Reset Your Password
                  </p>
                  <p style="font-size:14px; line-height:24px; margin:0 0 40px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif; color:#aaaaaa">
                      You have requested a password reset for your ${process.env.APPLICATION_NAME} account. To proceed, click the button below.
                  </p>
                  <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
                      style="margin:0 0 40px">
                      <tbody>
                          <tr>
                              <td>
                                  <a href="${resetLink}"
                                      style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif; background-color:#ffffff; border-radius:8px; color:#0b0b0f; font-size:14px; font-weight:600; text-decoration:none; text-align:center; width:200px; padding:16px 20px 16px 20px; line-height:100%; display:inline-block; max-width:100%"
                                      target="_blank"
                                  >
                                      <span></span><span style="max-width:100%; display:inline-block; line-height:120%">
                                          Reset Password
                                      </span><span></span>
                                  </a>
                              </td>
                          </tr>
                      </tbody>
                  </table>
                  <p style="font-size:14px; line-height:24px; margin:0 0 40px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif; color:#aaaaaa">
                      ${process.env.APPLICATION_ADDRESS}
                  </p>
              </td>
          </tr>
      </tbody>
  </table>
  </div>`;
