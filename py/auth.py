# email libs
from email.message import EmailMessage
import ssl
import smtplib
import secrets

#data passing lib
import sys

def authenticate(receiver_in):
    # Email Verification
    gmail_user = 'auth.group2@gmail.com'
    gmail_password = 'tinidqskatqnlllh'
    receiver = receiver_in

    verification_code = secrets.token_hex(3)
    
    subject = 'Verification Code'

    body = "Your Verification Code is: " + str(verification_code)

    em = EmailMessage()
    em['From'] = "EMAIL VERIFICATION"
    em['To'] = receiver
    em['Subject'] = subject
    em.set_content(body)

    context = ssl.create_default_context()



    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
            smtp.login(gmail_user, gmail_password)
            smtp.sendmail(gmail_user, receiver, em.as_string())
    except:
        return "INVALID EMAIL"
    
    return verification_code  

inpt = " ".join(sys.argv[1:])


print(authenticate(inpt))