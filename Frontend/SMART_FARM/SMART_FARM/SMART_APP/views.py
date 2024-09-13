from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import pickle
from sklearn.metrics import accuracy_score
from sklearn.linear_model import LogisticRegression

# Create your views here.
def home_view(request):
    return render(request, 'main/home.html')

def shop_view(request):
    return render(request, 'main/shop.html')

def yield_analysis_view(request):
    return render(request, 'main/yield_analysis.html')

def cart_view(request):
    return render(request, 'main/cart.html')

def sign_in_view(request):
    return render(request, 'main/sign_in.html')

def sign_out_view(request):
    # You would typically handle sign-out logic here
    return HttpResponse("You have been signed out.")

def load_model(filename):
    """Load a machine learning model from a file."""
    with open(filename, 'rb') as file:
        return pickle.load(file)

def predict_with_model(request):
    # react to do with input#
    """Predict using multiple models and return their accuracies."""
    # Load all models
    decision_tree = load_model('DecisionTree.pkl')
    nb_classifier = load_model('NBClassifier.pkl')
    random_forest = load_model('RandomForest.pkl')
    svm_classifier = load_model('SVMClassifier.pkl')
    xgboost = load_model('XGBoost.pkl')

    # Assuming Xtest is your test data
    Xtest = ... # react to do with input# Load or prepare your test data here

    # Predictions
    dt_predictions = decision_tree.predict(Xtest)
    # Repeat for other models...

    # Accuracy calculations
    Ytest = ...  # Load or prepare your true labels here
    dt_accuracy = accuracy_score(Ytest, dt_predictions)
    # Repeat for other models...

    return JsonResponse({
        'Decision Tree Accuracy': dt_accuracy,
        'nb_classifier' : nb_classifier,
        "random_forest" : random_forest,
        "svm_classifier": svm_classifier,
        "xgboost Accuracy": xgboost        
    })

def predict(request):
    """Train a Logistic Regression model and make predictions."""
    # Assuming Xtrain and Ytrain are your training data
    Xtrain = ...  # Load or prepare your training data here
    Ytrain = ...  # Load or prepare your training labels here

    # Train Logistic Regression model
    log_reg = LogisticRegression(random_state=2)
    log_reg.fit(Xtrain, Ytrain)

    # Predict using the trained model
    Xtest = ...  # Load or prepare your test data here
    predictions = log_reg.predict(Xtest)

    # You might want to pass predictions to the template
    context = {
        'predictions': predictions,
    }

    return render(request, 'predict.html', context=context)
