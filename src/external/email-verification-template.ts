type Props = {
  verification_code: string;
};

export const getEmailVerificationTemplate = (props: Props) => {
  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <style>
        @import url(https://fonts.googleapis.com/css2?family=Lato&display=swap);
        <!-- Styles for all clients -->
        center {
            font-family: Lato, Verdana, sans-serif;
        }

        <!-- Styles for WebKit clients -->
        @media screen and (-webkit-min-device-pixel-ratio:0) {
            center {
                font-family: Lato, Verdana, sans-serif !important;
            }
        }
    </style>
    <!--[if (gte mso 9)|(IE)]>
    <style type="text/css">
        table {border-collapse: collapse;}
    </style>
    <![endif]-->
</head>
<body style="padding:0; margin:0 !important">
    <center style="width: 100%;  fixed;">
        <div style="max-width: 600px; margin: 0 auto;">
        <h1>Verification Code</h1>
        <p> Email ini dibuat otomatis oleh Web App Monas E-Ticket </p>
         <p> Kode verifikasi email untuk pemesanan tiket anda adalah </p>
         <b>${props.verification_code}</b>
         
         </div>
         <br></br>
         <br></br>
         
        <footer>
        <a style="font-size: 14px; color:#696969" >
        Copyright © monumennasional.com
        <br></br>
        2023 
        </a>
        </footer>
    </center>
</body>
</html>  `;
};
