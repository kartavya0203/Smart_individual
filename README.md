# Agro Predict

### A Machine Learning-Based Crop Prediction System with Cart Functionality

**Agro Predict** is a machine learning-powered platform that helps farmers make data-driven decisions about crop selection. The platform provides crop recommendations based on environmental factors such as soil composition, weather conditions, and rainfall, with an easy-to-use form for input. Additionally, the platform features a cart system for managing selected products, although payment functionality is not yet integrated.

## Features
1. **Crop Yield Prediction**: Predicts the best crops based on user input such as soil nutrients and weather data.
2. **User-Friendly Interface**: Farmers can easily input data through a web form, without needing direct API interaction.
3. **Pre-trained Models**: Utilizes machine learning models such as Random Forest, Decision Trees, and XGBoost to provide accurate crop recommendations.
4. **Cart System**: Users can browse and add farming-related products to their cart, managing items before proceeding to checkout.
5. **Pending Payment Integration**: The platform currently lacks payment gateway integration, but the cart system is fully functional.

## Project Overview
Agro Predict was developed to assist farmers with crop recommendations based on environmental data, simplifying the process of making optimal farming decisions. The cart system allows users to add products like seeds, fertilizers, and other farming essentials to their cart for future purchase, though payment integration is still a work in progress.

### Core Responsibilities
1. **Backend Development**: Managed the prediction models and cart system using **Django** and **Django Rest Framework**.
2. **Form-based Input**: Developed a form on the frontend where users can input their data to get crop predictions.
3. **Cart Management**: Integrated a cart system allowing users to add products, manage cart items, and track totals.
4. **Frontend Interface**: Built an intuitive user interface using **React**, simplifying the user experience.
5. **Model Integration**: Implemented machine learning models for accurate crop predictions.

## Tech Stack
- **Backend**: Django, Django Rest Framework (DRF)
- **Frontend**: React.js
- **Machine Learning Models**: Random Forest, XGBoost, Decision Tree, Naive Bayes, SVM
- **Data Handling**: pandas, NumPy, scikit-learn
- **Database**: PostgreSQL
- **Authentication**: JWT Authentication (using `rest_framework_simplejwt` package)
- **Cart System**: Django for backend handling of cart functionality
- **Deployment**: Deployed on a cloud platform (e.g., Heroku)

## Models Used
- **Random Forest**: Used for crop prediction based on environmental factors.
- **Decision Tree**: Provides crop recommendations based on classification tasks.
- **XGBoost**: A high-performance model for precise yield prediction.
- **Naive Bayes**: Provides probabilistic crop recommendations.
- **SVM**: Classifies crops based on given inputs.

## Installation and Setup

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/agro-predict.git
   ```
2. **Create a virtual environment**:
   ```bash
   python -m venv venv
   ```
3. **Activate the virtual environment**:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
4. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
5. **Set up the database**:
   - Configure PostgreSQL in `settings.py`.
   - Run migrations:
     ```bash
     python manage.py migrate
     ```
6. **Run the server**:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to the frontend directory** (if your frontend is in a separate folder called `frontend`):
   ```bash
   cd frontend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the frontend server**:
   ```bash
   npm start
   ```
   This will launch the React development server at `http://localhost:3000`.

4. **Environment Variables**: Ensure that the frontend API calls are correctly pointing to the backend server URL. You can configure the API URL in the environment file or directly in the React components as needed.

## Usage
1. **User Input Through Form**: Farmers can input data such as nitrogen, phosphorous, potassium levels, temperature, humidity, rainfall, and pH via a web form.
2. **Crop Predictions**: After submitting the form, users receive a crop recommendation based on the input data.
3. **Cart Functionality**: Users can add farming products to their cart, modify quantities, and manage their selections, although payment functionality is pending integration.

## License
This project is open-source and available under the MIT License.

