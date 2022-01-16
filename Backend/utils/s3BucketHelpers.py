from utils.config import settings
from botocore.client import Config
import boto3
import logging
from botocore.exceptions import ClientError

client = boto3.client('s3',
                      aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                      aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                      config=Config(region_name = settings.REGION_NAME,
                                    signature_version=settings.SIGNATURE_VERSION))

def upload_file_to_s3(s3_file_path, file, bucket_name):
    client.upload_fileobj(
            file,
            bucket_name,
            s3_file_path,
            
    )
    
def create_presigned_url(bucket_name, object_name, expiration=8600):
        try:
            response = client.generate_presigned_url(
                                        'get_object',
                                        Params={
                                            'Bucket': bucket_name,
                                            'Key': object_name
                                        },
                                        ExpiresIn=expiration)
        except ClientError as exc:
            logging.error(exc)
            return None

    # The response contains the presigned URL
        return response
    
def delete_file_from_s3(bucket_name, s3_file_path):
        try:
         client.delete_object(Bucket=bucket_name, Key=s3_file_path)
        except ClientError as exc:
            logging.error(exc)
        return None