import sendgrid
import os
import base64
from sendgrid.helpers.mail import Mail, Email, To, Content,Attachment, FileContent, FileName, FileType, Disposition
from app.utils.config import settings
from app.utils import pdfGeneratorHelper

def sendMail(emails:str, message: str, subject: str, companyName = None, location =None,  orders = None, invoiceNo =None):
    pdfDoc = pdfGeneratorHelper.generateInvoice(companyName, location, emails, orders, invoiceNo)
    
    from_email = Email("larteyjoshua@gmail.com")  # Change to your verified sender
    to_email = To(emails)  # Change to your recipient
    content = Content("text/html", message)
    mail = Mail(from_email, to_email, subject, content)
    # Get a JSON-ready representation of the Mail object
   
    # Send an HTTP POST request to /mail/send

    encoded_file = base64.b64encode(pdfDoc).decode()

    attachedFile = Attachment(
    FileContent(encoded_file),
    FileName('invoice.pdf'),
    FileType('application/pdf'),
    Disposition('attachment')
)
    mail.attachment = attachedFile
    mail_json = mail.get()
    sg = sendgrid.SendGridAPIClient(api_key=settings.SENDGRID_APIKEY)
    response = sg.client.mail.send.post(request_body=mail_json)
    status =response.status_code
    return  { "statusCode": status }


def sendNormalEmail(emails:str, message: str, subject: str):
    from_email = Email("larteyjoshua@gmail.com")  # Change to your verified sender
    to_email = To(emails)  # Change to your recipient
    content = Content("text/html", message)
    mail = Mail(from_email, to_email, subject, content)
    mail_json = mail.get()
    sg = sendgrid.SendGridAPIClient(api_key=settings.SENDGRID_APIKEY)
    response = sg.client.mail.send.post(request_body=mail_json)
    status =response.status_code
    return  { "statusCode": status }