### TO DO
#### Save Model - Complete
#### Import and Test Model - Complete
#### Create 2 CSV Files
#### CSV1 - New List of Schools that have all the data available for the machine learning 
Fields - 'UNITID', 'ADM_RATE_ALL', 'AVGFACSAL','RET_FT4', 'CDR3','AGE_ENTRY', 'UGDS_MEN'
#### CSV2 - Create Metadata for the 994 schools that contains display data for the dashboard

## How to Deploy The Model
in app.py
import pickle
import joblib

import the model
create a predict route with the method post
