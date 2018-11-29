# _#_ coding:utf-8 _*_
"""
Django settings for roeops project.

Generated by 'django-admin startproject' using Django 1.11.14.

"""

import os
import sys
import djcelery
from celery import  platforms
from kombu import Queue,Exchange

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

print BASE_DIR

sys.path.insert(0, os.path.join(BASE_DIR, 'apps'))
sys.path.insert(0, os.path.join(BASE_DIR, 'extra_apps'))

#celery有三部分，1消息中间件，2任务执行者，3结果存储
#消息中间人负责存放消息 也就是这类的broker 指定了redis
#任务执行者，就是我们后台启动的

''' celery config '''
djcelery.setup_loader()
BROKER_URL = 'redis://127.0.0.1:6379/4'  #这是消息中间件队列
CELERY_RESULT_BACKEND = 'djcelery.backends.database.DatabaseBackend'   #使用后台数据库作为存储结果
CELERY_RESULT_SERIALIZER = 'json' #这是结果格式
CELERY_TASK_SERIALIZER='pickle'
CELERY_ACCEPT_CONTENT = ['pickle','json']
CELERYBEAT_SCHEDULER = 'djcelery.schedulers.DatabaseScheduler' # 这是使用了django-celery默认的数据库调度模型，任务执行周期被存在你指定的orm数据库中
CELERY_TASK_RESULT_EXPIRES = 60 * 60 * 24
CELERYD_MAX_TASKS_PER_CHILD = 400 #每个worker 执行了多少个人物就会死掉
CELERYD_CONCURRENCY = 20 #celery worker 并发数，也是命令行-c指定的数目，事实上并不是月多月号
CELERY_TRACK_STARTED = True
CELERY_ENABLE_UTC = False
CELERY_TIMEZONE='Asia/Shanghai'
platforms.C_FORCE_ROOT = True  #允许root启动

#celery导入所有的任务模块
CELERY_IMPORTS = ("tasks.assets","tasks.ansible",
                  "tasks.cron","tasks.deploy",
                  "tasks.sql","tasks.sched","MysqlOps.tasks","CMDB.tasks")
CELERY_QUEUES = (
    Queue('default',Exchange('default'),routing_key='default'),  #指定队列
    Queue('ansible',Exchange('ansible'),routing_key='ansible'),  #指定ansible队列
    Queue('database',Exchange('database'),routing_key='database'),  #指定database队列
)
#exchange 交换机，决定了消息路由规则，交换机 有一个路由key
#下面定义路由规则，task.sql ,会执行database 这个队列
# assets,cron,sched 下面的任务走 队列  default,队列，并且按照routerkey 打头
CELERY_ROUTES = {
    'tasks.sql.*':{'queue':'database','routing_key':'database'},
    'CMDB.tasks.*':{'queue':'default','routing_key':'default'},
    'MysqlOps.tasks.*':{'queue':'database','routing_key':'database'},
    'tasks.assets.*':{'queue':'default','routing_key':'default'},
    'tasks.cron.*':{'queue':'default','routing_key':'default'},
    'tasks.sched.*':{'queue':'default','routing_key':'default'},
    'tasks.ansible.AnsibleScripts':{'queue':'ansible','routing_key':'ansible'},
    'tasks.ansible.AnsiblePlayBook':{'queue':'ansible','routing_key':'ansible'},
}
CELERY_DEFAULT_QUEUE = 'default'
#交换机的作用
CELERY_DEFAULT_EXCHANGE_TYPE = 'topic'
CELERY_DEFAULT_ROUTING_KEY = 'default'

REDSI_KWARGS_LPUSH = {"host":'127.0.0.1','port':6379,'db':3}       #redis 的后台ansble 命令，参数传入
REDSI_LPUSH_POOL = None

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.11/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '=a0@3os*_j6fhulx2(s)_40rwa)q5faa#ep*z)-dkp9oy!z-2m'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']




# Channels settings  实时通信的通道
CHANNEL_LAYERS = {
    "default": {
       "BACKEND": "asgi_redis.RedisChannelLayer",  # use redis backend
       "CONFIG": {
            "hosts": [("localhost", 6379)],
            "channel_capacity": {
                                   "http.request": 1000,
                                   "websocket.send*": 10000,
                                },
            "capacity": 10000,
           },
       "ROUTING": "roeops.routing.channel_routing",  # load routing from our routing.py file
       },
}








# Application definition



INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken', #s使用token认证
    'crispy_forms',
    'corsheaders',
    'mptt', #树
    'djcelery',#定时任务
    'channels',#时时通道
    'api',
    'Orders',
    'CMDB',
    'system',
     'CodeOps',
    'MysqlOps',
      'OpsControl',
    'OracleOps',
    'wiki',
    'test',



]



# AUTHENTICATION_BACKENDS = (
#     'rest_framework.authentication.TokenAuthentication',
#     'django.contrib.auth.backends.ModelBackend',
# )
import  datetime
JWT_AUTH = {
    'JWT_ENCODE_HANDLER':
        'rest_framework_jwt.utils.jwt_encode_handler',

    'JWT_DECODE_HANDLER':
        'rest_framework_jwt.utils.jwt_decode_handler',

    'JWT_PAYLOAD_HANDLER':
        'rest_framework_jwt.utils.jwt_payload_handler',

    'JWT_PAYLOAD_GET_USER_ID_HANDLER':
        'rest_framework_jwt.utils.jwt_get_user_id_from_payload_handler',

    'JWT_RESPONSE_PAYLOAD_HANDLER':
        'rest_framework_jwt.utils.jwt_response_payload_handler',

    'JWT_SECRET_KEY': SECRET_KEY,
    'JWT_GET_USER_SECRET_KEY': None,
    'JWT_PUBLIC_KEY': None,
    'JWT_PRIVATE_KEY': None,
    'JWT_ALGORITHM': 'HS256',
    'JWT_VERIFY': True,
    'JWT_VERIFY_EXPIRATION': True,
    'JWT_LEEWAY': 0,
    'JWT_EXPIRATION_DELTA': datetime.timedelta(seconds=3000),
    'JWT_AUDIENCE': None,
    'JWT_ISSUER': None,

    'JWT_ALLOW_REFRESH': False,
    'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=7),

    'JWT_AUTH_HEADER_PREFIX': 'JWT',
    'JWT_AUTH_COOKIE': None,

}

#
# CORS_ALLOW_METHODS = (
#     'DELETE',
#     'GET',
#     'OPTIONS',
#     'POST',
#     'PUT',
# )


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware', #  api 异步加载有问题

    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


#全剧授权
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
        'rest_framework.permissions.IsAuthenticated',
        # 'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly', #适用于添加身份认证之后

    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',#前后段分离的比较少用
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ),
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',

    ),
    # 'DEFAULT_PARSER_CLASSES': (
    #     'rest_framework.parsers.JSONParser',
    # )

}
CORS_ORIGIN_ALLOW_ALL = True
CSRF_ORIGIN_ALLOW_ALL = True
ROOT_URLCONF = 'roeops.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')]
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'roeops.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'roeops',
        'USER': 'roeops',
        'PASSWORD': 'roeops123',
        'HOST': '127.0.0.1',
        'PORT': '3306',
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
        },
    }
}


# Password validation
# https://docs.djangoproject.com/en/1.11/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/1.11/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Shanghai'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static').replace('\\', '/'),
)

MEDIA_ROOT = os.path.join(BASE_DIR,'upload/')
MEDIA_URL = '/upload/'



#这个是代码发布用的本地存放目录
WORKSPACES = '/data/roeops/workspaces/'