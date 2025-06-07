import plotly.graph_objects as go
import plotly.express as px
from flask import Flask, render_template, request, redirect, session
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Database connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="yourpassword",
    database="health_management"
)
cursor = db.cursor()

@app.route('/')
def landing():
    return render_template('landing.html')
@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = generate_password_hash(request.form['password'])
        email = request.form['email']
        query = "INSERT INTO users (username, password, email) VALUES (%s, %s, %s)"
        cursor.execute(query, (username, password, email))
        db.commit()
        return render_template('login.html')
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        query = "SELECT id, password FROM users WHERE username = %s"
        cursor.execute(query, (username,))
        result = cursor.fetchone()
        if result and check_password_hash(result[1], password):
            session['user_id'] = result[0]  # Store user_id in session
            return render_template('home.html')
        else:
            return "Invalid username or password"
    return render_template('login.html')

@app.route('/bmi', methods=['GET', 'POST'])
def bmi():
    bmi = None
    bmi_history = []
    error_message = None

    # Get the user_id from session (Assume user is logged in)
    user_id = session.get('user_id')

    if not user_id:
        error_message = "Please log in to view your BMI history and calculate new BMI."

    if request.method == 'POST' and user_id:
        try:
            weight = float(request.form['weight'])
            height = float(request.form['height'])

            # Ensure positive values for weight and height
            if weight <= 0 or height <= 0:
                error_message = "Weight and Height must be positive values."
            else:
                # Calculate BMI
                bmi = weight / (height ** 2)
                bmi = round(bmi, 2)  # Round BMI to 2 decimal points

                try:
                    # Store the BMI in the database in the user_bmi table
                    query = "INSERT INTO user_bmi (user_id, bmi) VALUES (%s, %s)"
                    cursor.execute(query, (user_id, bmi))
                    db.commit()

                    # Fetch BMI history for the current user (including new BMI)
                    query_history = "SELECT bmi, timestamp FROM user_bmi WHERE user_id = %s ORDER BY timestamp ASC"
                    cursor.execute(query_history, (user_id,))
                    bmi_history = cursor.fetchall()

                except mysql.connector.Error as err:
                    error_message = f"Error while storing BMI: {err}"

        except ValueError:
            error_message = "Invalid input. Please enter valid numbers for weight and height."

    # Fetch BMI history if not already retrieved
    if user_id and not bmi_history:
        try:
            query_history = "SELECT bmi, timestamp FROM user_bmi WHERE user_id = %s ORDER BY timestamp ASC"
            cursor.execute(query_history, (user_id,))
            bmi_history = cursor.fetchall()

        except mysql.connector.Error as err:
            error_message = f"Error while fetching BMI history: {err}"

    # Prepare data for the graph if BMI history exists
    if bmi_history:
        timestamps = [record[1] for record in bmi_history]
        bmis = [record[0] for record in bmi_history]

        # Create a Plotly graph for BMI history
        fig = go.Figure()
        fig.add_trace(go.Scatter(x=timestamps, y=bmis, mode='lines+markers', name='BMI'))
        fig.update_layout(title='BMI History', xaxis_title='Date', yaxis_title='BMI')
        graph_html = fig.to_html(full_html=False)
    else:
        graph_html = None

    return render_template('bmi.html', bmi=bmi, graph_html=graph_html, error_message=error_message)


@app.route('/bp', methods=['GET', 'POST'])
def bp():
    systolic = diastolic = None
    user_id = session.get('user_id')  # Get user_id from session

    if request.method == 'POST':
        systolic = int(request.form['systolic'])
        diastolic = int(request.form['diastolic'])

        # Store BP data in the user_blood_pressure table
        if user_id:
            try:
                # Insert BP data into the user_blood_pressure table
                query = "INSERT INTO user_blood_pressure (user_id, systolic, diastolic) VALUES (%s, %s, %s)"
                cursor.execute(query, (user_id, systolic, diastolic))
                db.commit()
            except mysql.connector.Error as err:
                print(f"Error: {err}")

    # Retrieve BP history for the user
    query = "SELECT systolic, diastolic, timestamp FROM user_blood_pressure WHERE user_id = %s ORDER BY timestamp DESC LIMIT 10"
    cursor.execute(query, (user_id,))
    bp_history = cursor.fetchall()

    # Create a Plotly graph for BP history
    timestamps = [str(record[2]) for record in bp_history]
    systolic_values = [record[0] for record in bp_history]
    diastolic_values = [record[1] for record in bp_history]

    fig = go.Figure()
    fig.add_trace(go.Scatter(x=timestamps, y=systolic_values, mode='lines+markers', name='Systolic'))
    fig.add_trace(go.Scatter(x=timestamps, y=diastolic_values, mode='lines+markers', name='Diastolic'))

    fig.update_layout(title='Blood Pressure History',
                      xaxis_title='Timestamp',
                      yaxis_title='Pressure (mmHg)')

    graph_html = fig.to_html(full_html=False)  # Convert to HTML for embedding

    return render_template('bp.html', systolic=systolic, diastolic=diastolic, graph_html=graph_html)

@app.route('/pulse', methods=['GET', 'POST'])
def pulse():
    pulse_rate = None
    pulse_history = []
    interpretation = None

    if request.method == 'POST':
        pulse_rate = int(request.form['pulse_rate'])

        # Interpret pulse rate
        if pulse_rate < 60:
            interpretation = "Low"
        elif 60 <= pulse_rate <= 100:
            interpretation = "Normal"
        else:
            interpretation = "High"

        # Get user_id from session
        user_id = session.get('user_id')

        if user_id:
            try:
                # Store pulse rate in the database
                query = "INSERT INTO user_pulse (user_id, pulse_rate) VALUES (%s, %s)"
                cursor.execute(query, (user_id, pulse_rate))
                db.commit()
                
                # Fetch pulse rate history for the current user
                query_history = "SELECT pulse_rate, timestamp FROM user_pulse WHERE user_id = %s ORDER BY timestamp ASC"
                cursor.execute(query_history, (user_id,))
                pulse_history = cursor.fetchall()
                
            except mysql.connector.Error as err:
                print(f"Error: {err}")  # Print any database errors to the console

    # Prepare data for the graph
    if pulse_history:
        timestamps = [record[1] for record in pulse_history]
        pulse_rates = [record[0] for record in pulse_history]

        # Create a Plotly graph for pulse rate history
        fig = go.Figure()
        fig.add_trace(go.Scatter(x=timestamps, y=pulse_rates, mode='lines+markers', name='Pulse Rate'))
        fig.update_layout(title='Pulse Rate History', xaxis_title='Date', yaxis_title='Pulse Rate')
        graph_html = fig.to_html(full_html=False)
    else:
        graph_html = None

    return render_template('pulse.html', pulse_rate=pulse_rate, graph_html=graph_html, interpretation=interpretation)



if __name__ == '__main__':
    app.run(debug=True)
