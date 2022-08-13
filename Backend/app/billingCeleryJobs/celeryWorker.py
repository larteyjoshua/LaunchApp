from celery import Celery
from celery.utils.log import get_task_logger
from celery.schedules import crontab


celery = Celery('app.celeryJobs',
    broker="pyamqp://guest@localhost//",
      include=['app.billingCeleryJobs.tasks']
    )

celery.conf.update(
    task_serializer='json',
    result_serializer='json',
    timezone='UTC',
    enable_utc=True,
)

celery_log = get_task_logger(__name__)


celery.conf.beat_schedule = {
    'sum_number': {
        'task': 'app.billingCeleryJobs.tasks.sum_number',
        'schedule': 1200.0,
        'args': (16, 16)
    },
      'bill_creation': {
        'task': 'app.billingCeleryJobs.tasks.bill_creation',
        'schedule': crontab(minute=0,hour='12,13,14,15,16,17,18,19,20, 21, 22, 23, 0, 1'),
    },
}
#
# crontab(minute=0,hour='12,13,14,15,16,17,18,19,20, 21, 22, 23, 0, 1'),
# if __name__ == '__main__':
#     celery.start()
