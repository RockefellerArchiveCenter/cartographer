#!/bin/bash

./wait-for-it.sh db:5432 -- echo "Creating config file"

if [ ! -f manage.py ]; then
  cd cartographer
fi

if [ ! -f cartographer/config.py ]; then
    cp cartographer/config.py.example cartographer/config.py
fi

echo "Apply database migrations"
python manage.py makemigrations && python manage.py migrate

#Start server
echo "Starting server"
python manage.py runserver 0.0.0.0:8000
