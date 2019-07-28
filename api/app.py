import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'static','db','studentloans.sqlite')
engine = create_engine('sqlite:///' + os.path.join(basedir, 'static','db','studentloans.sqlite')+ "?check_same_thread=False")

#################################################
# Database Setup
#################################################


# Set up Database Model
app.config["SEND_FILE_MAX_AGE_DEFAULT"] = 0
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# ^ This is to turn off caching on static files for development.. 
db = SQLAlchemy(app)
db.init_app(app)
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
Institutions = Base.classes.inst_price
Student_Debt_Income = Base.classes.Student_Debt_Income
college_worth_it = Base.classes.college_worth_it
age_student_debt = Base.classes.age_student_debt
val_roi = Base.classes.val_roi
id_and_name = Base.classes.instid
# Create our session (link) from Python to the DB
session = Session(engine)
# Set up Home index Route

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/tabledata")
def tabledata():
    """Returns the JS Table Template"""
    return render_template("tabledata.html")

@app.route("/schoolmap")
def map():
    """Returns the JS map Template"""
    return render_template("map.html")

@app.route("/university_roi")
def table2():
    """Returns the JS Table Template"""
    return render_template("table2.html")

@app.route("/machineLearning")
def machineLearning():
    """Returns the JS Table Template"""
    return render_template("machineLearning.html")


# API DATA GOES HERE
#################################################
# Flask Routes
#################################################


@app.route("/api")
def welcome():
    """List all available api routes."""
    return (
        f"<center>"
        f"<b>Available Routes:</b><br/>"
        f'<a href="/api/institutions.json">/api/institutions.json</a><br/>'
        f'<a href="/api/id_and_name.json">/api/id_and_name.json</a><br/>'
        f'<a href="/api/Student_Debt_Income.json">/api/Student_Debt_Income.json</a><br/>'
        f'<a href="/api/college_worth_it.json">/api/college_worth_it.json</a><br/>'
        f'<a href="/api/age_student_debt.json">/api/age_student_debt.json</a><br/>'
         f'<a href="/api/val_roi.json">/api/val_roi.json</a><br/>'
         f'<a href="/api/metadata.json">/api/metadata.json</a><br/>'
        f"</center>"
    )

#################################################
# Institutions
#################################################

@app.route("/api/institutions.json")
def names():
    """Return a list of institutions names."""
    data = session.query(Institutions.street,
                         Institutions.institution_name,
                         Institutions.state,
                         Institutions.zipcode,
                         Institutions.website,
                         Institutions.city,
                         Institutions.tuition)
    inst_list = []
    for street, institution_name, state, zipcode, website, city, tuition in data:
        inst_dict = {}
        inst_dict['street'] = street
        inst_dict['institution_name'] = institution_name
        inst_dict['state'] = state
        inst_dict['zipcode'] = zipcode
        inst_dict['website'] = website
        inst_dict['city'] = city
        inst_dict['tuition'] = tuition


        inst_list.append(inst_dict)

    # Return a list of the column names (sample names)
    return jsonify(inst_list)

#################################################
# Institution ID and Name
#################################################

@app.route("/api/id_and_name.json")
def idname():
    """Return a list of institutions names and IDs."""
    data = session.query(id_and_name.UNITID,
                         id_and_name.INSTNM)
    id_list = []
    for UNITID, INSTNM in data:
        id_dict = {}
        id_dict['UNITID'] = UNITID
        id_dict['INSTNM'] = INSTNM
        id_list.append(id_dict)

    # Return a list of the column names (sample names)
    return jsonify(id_list)


#################################################
# College Metadata
#################################################

@app.route("/api/metadata.json")
def metadata():
    """Return a list of institutions names."""
    data = session.query(Institutions.street,
                         Institutions.institution_name,
                         Institutions.state,
                         Institutions.zipcode,
                         Institutions.website,
                         Institutions.city,
                         Institutions.tuition)
                    
    college_list = []
    for street, institution_name, state, zipcode, website, city, tuition in data:
        college_dict = {}
        college_dict['street'] = street
        college_dict['institution_name'] = institution_name
        college_dict['state'] = state
        college_dict['zipcode'] = zipcode
        college_dict['website'] = website
        college_dict['city'] = city
        college_dict['tuition'] = tuition


        college_list.append(college_dict)

    # Return a list of the column names (sample names)
    return jsonify(college_list)


#################################################
# Chris Student_Debt_Income
#################################################

@app.route("/api/Student_Debt_Income.json")
def studentdebtincome():
    """Return a list."""
    data = session.query(Student_Debt_Income.subject,
                         Student_Debt_Income.student_borrowing,
                         Student_Debt_Income.male_pay,
                         Student_Debt_Income.female_pay)
    Student_Debt_Income_list = []
    for subject, student_borrowing, male_pay, female_pay in data:
        Student_Debt_Income_dict = {}
        Student_Debt_Income_dict['subject'] = subject
        Student_Debt_Income_dict['student_borrowing'] = student_borrowing
        Student_Debt_Income_dict['male_pay'] = male_pay
        Student_Debt_Income_dict['female_pay'] = female_pay


        Student_Debt_Income_list.append(Student_Debt_Income_dict)

    # Return a list of the column names (sample names)
    return jsonify(Student_Debt_Income_list)

#################################################
# Chris college_worth_it
#################################################

@app.route("/api/college_worth_it.json")
def collegeworthit():
    """Return a list."""
    data = session.query(college_worth_it.educational_attainment,
                         college_worth_it.unemployment_rate,
                         college_worth_it.median_pay)
    college_worth_it_list = []
    for educational_attainment, unemployment_rate, median_pay in data:
        college_worth_it_dict = {}
        college_worth_it_dict['educational_attainment'] = educational_attainment
        college_worth_it_dict['unemployment_rate'] = unemployment_rate
        college_worth_it_dict['median_pay'] = median_pay


        college_worth_it_list.append(college_worth_it_dict)

    # Return a list of the column names (sample names)
    return jsonify(college_worth_it_list)

#################################################
# Chris college_worth_it
#################################################

@app.route("/api/age_student_debt.json")
def agestudentdebt():
    """Return a list."""
    data = session.query(age_student_debt.year,
                         age_student_debt.under_30,
                         age_student_debt.from_30_to_39,
                         age_student_debt.from_40_to_49,
                         age_student_debt.from_50_to_59,
                         age_student_debt.Over_60)
    age_student_debt_list = []
    for year, under_30, from_30_to_39, from_40_to_49, from_50_to_59, Over_60 in data:
        age_student_debt_dict = {}
        age_student_debt_dict['year'] = year
        age_student_debt_dict['under_30'] = under_30
        age_student_debt_dict['from_30_to_39'] = from_30_to_39
        age_student_debt_dict['from_40_to_49'] = from_40_to_49
        age_student_debt_dict['from_50_to_59'] = from_50_to_59
        age_student_debt_dict['Over_60'] = Over_60


        age_student_debt_list.append(age_student_debt_dict)

    # Return a list of the column names (sample names)
    return jsonify(age_student_debt_list)

#################################################
# Chris ROI
#################################################

@app.route("/api/val_roi.json")
def name2():
    """Return a list."""
    data = session.query(val_roi.rank,
                         val_roi.school_name,
                         val_roi.net_roi_20_year,
                         val_roi.total_4_year_cost_usd,
                         val_roi.typical_years_to_graduate)
    val_roi_list = []

    for rank, school_name, net_roi_20_year, total_4_year_cost_usd, typical_years_to_graduate in data:
        val_roi_dict = {}
        val_roi_dict['rank'] = rank
        val_roi_dict['school_name'] = school_name
        val_roi_dict['net_roi_20_year'] = net_roi_20_year
        val_roi_dict['total_4_year_cost_usd'] = total_4_year_cost_usd
        val_roi_dict['typical_years_to_graduate'] = typical_years_to_graduate

        val_roi_list.append(val_roi_dict)

    # Return a list of the column names (sample names)
    return jsonify(val_roi_list)

# Run Server
if __name__ == '__main__':
    app.run(debug=True)