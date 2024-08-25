import os
import joblib

# Define the path to the model file
model_path = os.path.join('SmartFarmapp', 'notebooks', 'models', 'Randomforest.pkl')

# Load the model
random_forest_model = joblib.load(model_path)

# Function to make predictions
def predict(input_data):
    """
    This function accepts input data in the form of a dictionary
    and returns the predicted crop name.
    """
    # Extract the input features in the required order
    input_features = [
        input_data.get('nitrogen'),
        input_data.get('phosphorous'),
        input_data.get('potassium'),
        input_data.get('temperature'),
        input_data.get('humidity'),
        input_data.get('rainfall'),
        input_data.get('ph') 
    ]
    
    # Convert input_features to a 2D array (list of lists) as expected by the model
    input_features = [input_features]
    
    # Make prediction
    prediction = random_forest_model.predict(input_features)
    
    # Return the predicted crop name
    return prediction[0]
