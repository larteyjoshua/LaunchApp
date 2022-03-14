import os
from fastapi import HTTPException, UploadFile, File
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont
from werkzeug.utils import secure_filename
from utils.s3BucketHelpers import upload_file_to_s3, create_presigned_url
from utils.config import settings

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower()\
                               in ('png', 'jpg', 'jpeg')

async def handle_file_upload(file, fileName: str):
    if file.filename == '':
        raise HTTPException(status_code=406, detail="Only .jpeg or .png  files allowed")
    
    elif file and allowed_file(file.filename):
            file_name = secure_filename(file.filename)
            # file_path = '{}/{}'.format( fileName, file_name)
            im = Image.open(file.file, mode='r')
            width, height = im.size
            draw = ImageDraw.Draw(im)
            text = "LunchApp"
            font = ImageFont.truetype('arial.ttf', 36)
            textwidth, textheight = draw.textsize(text, font)

            # calculate the x,y coordinates of the text
            margin = 10
            x = width - textwidth - margin
            y = height - textheight - margin

            # draw watermark in the bottom right corner
            draw.text((x, y), text, font=font)

            # create a BytesIO object
            im_io = BytesIO() 
            # save image to BytesIO object
            im.save(im_io, 'JPEG', quality=30) 
            # create a django-friendly Files object
            new_file = im_io.getvalue()

            upload_file_to_s3(file_name,  BytesIO(new_file), settings.BUCKET_NAME)
            return file_name