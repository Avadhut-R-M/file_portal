#!/bin/bash
python3.10 -m venv venv
source venv/bin/activate
pip install -r requrements.txt
python manage.py migrate
cd frontend
npm install