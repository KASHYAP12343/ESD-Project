#!/bin/bash

# Script to load data into MySQL database
# Usage: ./load_data.sh

echo "Loading data into esd_project database..."
mysql -u root -p9426134175 esd_project < data.sql

if [ $? -eq 0 ]; then
    echo "Data loaded successfully!"
else
    echo "Error loading data. Please check your MySQL connection and database."
fi

