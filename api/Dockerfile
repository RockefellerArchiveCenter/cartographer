FROM python:3.6

ENV PYTHONUNBUFFERED 1
WORKDIR /code/api/
ADD requirements.txt /code/api/
RUN pip install --upgrade pip && pip install -r requirements.txt
ADD . /code/api/
