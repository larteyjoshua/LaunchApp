from app.utils import sendEmailHelper

header ="""<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title></title>
  <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet">
  <!-- CSS Reset Start -->
  <style>
    html,
    body {
      margin: 0 auto !important;
      padding: 0 !important;
      height: 100% !important;
      width: 100% !important;
      background: #f1f1f1;
    }
    * {
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }
    div[style*="margin:16px 0"] {
      margin: 0 !important;
    }
    table,
    td {
      mso-table-lspace: 0pt !important;
      mso-table-rspace: 0pt !important;
    }
    table {
      border-spacing: 0 !important;
      border-collapse: collapse !important;
      table-layout: fixed !important;
      margin: 0 auto !important;
    }
  </style>
  
    .icon {
      text-align: center;
    }
  </style>
</head>
<body width="100%" style="margin: 0;padding: 0 !important;mso-line-height-rule:exactly; background-color: #222222;">
  <center style="width: 100%;background-color: #f1f1f1;">
    <div>
      &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
      &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
      &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
      &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
    </div>
    <div style="max-width: 800px;margin: 0 auto;" class="email-container">
      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
        style="margin: auto;">"""
        
body = """<tr>
          <td valign="middle" class="hero bg_dark"
            style="background-image: url(img/bg_1.jpg); background-size: cover;height: 300px;">
            <div class="overlay"></div>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td>
                  <div class="text" style="padding: 0 3em; text-align: center;">
                     <p  style="padding: 0 3em;text-align: left;"> Hi {},</p> 
                     <p  style="padding: 0 3em;text-align: left;">Thank you for doing business with us.</p>
                     <p  style="padding: 0 3em;text-align: left;" >Find an attachement of your bills or invoce for the Month.</p>
                     <p  style="padding: 0 3em;text-align: left;" >Esi Dadaa Saa, </P>
                     <p  style="padding: 0 3em;text-align: left;" >Manager, </p>
                     <p  style="padding: 0 3em;text-align: left;" >Lunchapp Food Services LTD. </p>
                  </div>
                  <div class="icon">
                    <a href="#">
                      <img src="img/002-play-button.png" alt=""
                        style="width: 60px;max-width: 600px;height: auto;margin: auto;display: block;">
                    </a>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr> """
              
footer = """ <tr>
                <td valign="top" class="bg_white" style="padding: 1em 2.5em;">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td width="40%" class="logo" style="text-align: center;">
                        <p>Lunchapp, Always at Your Services</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
        </tr> 
      </table>
    </div>
  </center>
</body>
</html>"""

def getEmailMessage(userName: str, month: str, amount: float):
    return ''.join([ header, body.format(userName), footer])

def sendBilling(userEmail:str, userName: str, month: str, amount: str, location =None, orders = None, invoiceNo =None):
    subject:str = F"LunchApp: Food Invoice  For {month}"
    message = getEmailMessage(userName, month, amount)
    return sendEmailHelper.sendMail(userEmail, message, subject, userName, location, orders, invoiceNo)
    