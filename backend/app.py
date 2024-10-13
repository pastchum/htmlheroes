from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pdfminer.high_level import extract_text
import spacy
import joblib
import os
from difflib import SequenceMatcher

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000", "https://*.ngrok-free.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load spaCy NLP model
nlp = spacy.load("en_core_web_sm")

# Load the ML model
MODEL_PATH = "ml_models/skill_predictor.pkl"
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError("ML model not found. Train and save the model first.")
skill_predictor = joblib.load(MODEL_PATH)

# Job role database
JOB_DATABASE = {
    "Data Science": {
        "skills": [
            "Python", "Pandas", "SQL", "Machine Learning", "Data Analysis",
            "Numpy", "Visualization", "PyTorch", "TensorFlow", "CUDA", 
            "HuggingFace", "Deep Learning", "AI", "Data Wrangling", 
            "Statistical Modeling", "Jupyter", "Keras", "Scikit-Learn", 
            "Spark", "Databricks", "AWS SageMaker", "Google BigQuery"
        ],
        "certifications": [
            "Google Data Analytics", "IBM Data Science", "AWS Machine Learning", 
            "Microsoft Azure AI Engineer", "Coursera Machine Learning", 
            "TensorFlow Developer"
        ]
    },
    "Web Development": {
        "skills": [
            "HTML", "CSS", "JavaScript", "React", "Node.js", "Flask", 
            "API Development", "Bootstrap", "TypeScript", "Next.js", 
            "Angular", "Vue.js", "Django", "Tailwind CSS", "GraphQL", 
            "WebSockets", "RESTful APIs", "JWT", "MongoDB", "PostgreSQL"
        ],
        "certifications": [
            "Meta Front-End Developer", "Full-Stack Development", 
            "Coursera Web Development", "Google Mobile Web Specialist", 
            "JavaScript Algorithms Certification"
        ]
    },
    "Project Management": {
        "skills": [
            "Project Planning", "Agile", "Scrum", "Communication", 
            "Risk Management", "SQL", "Stakeholder Management", 
            "Budget Management", "Leadership", "Team Collaboration", 
            "Gantt Charts", "Kanban", "Trello", "JIRA", "MS Project"
        ],
        "certifications": [
            "PMP", "Scrum Master Certification", "Agile Project Management", 
            "Prince2", "Lean Six Sigma", "SAFe Certification"
        ]
    },
    "Teaching": {
        "skills": [
            "Curriculum Development", "Classroom Management", "Lesson Planning", 
            "Communication", "Assessment Strategies", "Online Teaching", 
            "Learning Management Systems (LMS)", "Pedagogy", "Training", 
            "Educational Technology", "Special Education", "Public Speaking"
        ],
        "certifications": [
            "Teaching English as a Foreign Language (TEFL)", 
            "Certified Educator", "Google Classroom Certification", 
            "Montessori Teaching Certification", "Special Education Certification"
        ]
    },
    "Cloud Computing": {
        "skills": [
            "AWS", "Azure", "Google Cloud Platform", "Kubernetes", 
            "Docker", "Terraform", "Serverless", "Cloud Security", 
            "Lambda", "EC2", "IAM", "CloudFormation", "Networking", 
            "Storage Solutions", "DevOps", "Continuous Integration", 
            "Continuous Deployment", "Jenkins", "Ansible"
        ],
        "certifications": [
            "AWS Certified Solutions Architect", "Microsoft Azure Administrator", 
            "Google Cloud Professional Cloud Architect", "HashiCorp Terraform Associate", 
            "Kubernetes Administrator Certification"
        ]
    },
    "Cybersecurity": {
        "skills": [
            "Network Security", "Penetration Testing", "Firewalls", 
            "Encryption", "Incident Response", "SIEM", "Vulnerability Management", 
            "OWASP", "NIST", "ISO 27001", "SOC Compliance", "Threat Hunting", 
            "Forensics", "Zero Trust Architecture", "Identity Management"
        ],
        "certifications": [
            "CompTIA Security+", "Certified Ethical Hacker (CEH)", 
            "CISSP", "Certified Information Security Manager (CISM)", 
            "ISO 27001 Lead Auditor"
        ]
    },
    "Finance and Accounting": {
        "skills": [
            "Financial Analysis", "Excel", "SQL", "Accounting", 
            "Forecasting", "Financial Modeling", "Budgeting", 
            "Risk Analysis", "Investment Analysis", "Auditing", 
            "Taxation", "QuickBooks", "SAP", "ERP", "Compliance"
        ],
        "certifications": [
            "Chartered Financial Analyst (CFA)", "Certified Public Accountant (CPA)", 
            "Financial Risk Manager (FRM)", "Advanced Excel Certification", 
            "SAP Financial Accounting Certification"
        ]
    },
    "Marketing": {
        "skills": [
            "SEO", "Google Analytics", "Content Marketing", "Social Media Management", 
            "Pay-Per-Click (PPC)", "Google Ads", "Facebook Ads", "Email Marketing", 
            "Brand Strategy", "Market Research", "CRM", "HubSpot", 
            "Conversion Rate Optimization (CRO)", "A/B Testing"
        ],
        "certifications": [
            "Google Analytics Certification", "HubSpot Inbound Marketing", 
            "Facebook Blueprint Certification", "Content Marketing Institute Certification"
        ]
    },
    "Human Resources": {
        "skills": [
            "Recruitment", "Performance Management", "HRIS", 
            "Onboarding", "Employee Engagement", "Compensation Management", 
            "Benefits Administration", "Payroll Management", 
            "Conflict Resolution", "Labor Laws", "Diversity and Inclusion"
        ],
        "certifications": [
            "Professional in Human Resources (PHR)", "SHRM Certified Professional (SHRM-CP)", 
            "Certified Compensation Professional (CCP)", "LinkedIn Talent Solutions Certification"
        ]
    },
    "Operations Management": {
        "skills": [
            "Supply Chain Management", "Lean Manufacturing", "Six Sigma", 
            "Inventory Management", "Logistics", "Operations Planning", 
            "Procurement", "Vendor Management", "Process Improvement", 
            "ERP Systems", "Demand Forecasting", "Warehouse Management"
        ],
        "certifications": [
            "APICS Certified Supply Chain Professional (CSCP)", 
            "Lean Six Sigma Certification", "Certified Operations Manager"
        ]
    },
    "Healthcare": {
        "skills": [
            "Electronic Medical Records (EMR)", "Clinical Data Management", 
            "Healthcare Compliance", "Medical Coding", "Patient Care", 
            "Telemedicine", "Pharmaceuticals", "Biostatistics", 
            "Healthcare Analytics", "Public Health"
        ],
        "certifications": [
            "Certified Medical Coder (CMC)", "Certified Healthcare Data Analyst (CHDA)", 
            "Healthcare Compliance Certification", "CPR Certification"
        ]
    },
    "Legal": {
        "skills": [
            "Contract Law", "Corporate Law", "Litigation", 
            "Legal Research", "Compliance", "Risk Management", 
            "Intellectual Property", "Mergers and Acquisitions", 
            "Document Review", "Case Management", "Negotiation"
        ],
        "certifications": [
            "Certified Paralegal", "Legal Research Certification", 
            "Compliance Officer Certification", "Contract Management Certification"
        ]
    }
}


def is_similar(skill, token, threshold=0.7):
    """Check similarity between two strings."""
    return SequenceMatcher(None, skill.lower(), token.lower()).ratio() >= threshold

def extract_skills(text):
    """Extract relevant skills using NLP."""
    doc = nlp(text.lower())
    extracted_skills = set()

    # Extract only nouns and proper nouns to reduce noise
    for token in doc:
        if token.pos_ in ["NOUN", "PROPN"]:
            for role, data in JOB_DATABASE.items():
                for skill in data["skills"]:
                    if is_similar(skill, token.text):
                        extracted_skills.add(skill)

    return list(extracted_skills)

def predict_job_role(extracted_skills):
    """Predict the most relevant job role based on extracted skills."""
    role_scores = {
        role: len(set(data["skills"]).intersection(extracted_skills))
        for role, data in JOB_DATABASE.items()
    }

    if not any(role_scores.values()):
        return "No Match Found", []

    best_match_role = max(role_scores, key=role_scores.get)
    potential_roles = [
        role for role, score in role_scores.items()
        if score == role_scores[best_match_role]
    ]
    return best_match_role, potential_roles

def recommend_skills_and_certifications(potential_roles, extracted_skills):
    """Recommend missing skills and certifications."""
    recommendations = []
    for role in potential_roles:
        missing_skills = set(JOB_DATABASE[role]["skills"]) - set(extracted_skills)
        recommendations.append({
            "role": role,
            "missing_skills": list(missing_skills),
            "certifications": JOB_DATABASE[role]["certifications"]
        })
    return recommendations

def ml_recommend_skills(extracted_skills):
    """Use ML model to recommend additional relevant skills."""
    skills_input = " ".join(extracted_skills)
    vectorized_input = skill_predictor["vectorizer"].transform([skills_input])
    predicted_skills = skill_predictor["model"].predict(vectorized_input)
    return predicted_skills[0].split(",")

def generate_no_match_response():
    """Generate a response when no relevant roles are found."""
    return {
        "extracted_skills": [],
        "predicted_job_role": "No Match Found",
        "potential_roles": [],
        "recommendations": [],
        "tailored_insights": {
            "advice": "No specific match found. Consider expanding your skillset.",
            "suggested_skills": ["Explore new certifications or fields."]
        }
    }

@app.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    """Handle PDF uploads and provide recommendations."""
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Unsupported file type. Please upload a PDF.")

    try:
        text = extract_text(file.file)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process the PDF: {str(e)}")

    extracted_skills = extract_skills(text)
    if not extracted_skills:
        return generate_no_match_response()

    best_match_role, potential_roles = predict_job_role(extracted_skills)
    recommendations = recommend_skills_and_certifications(potential_roles, extracted_skills)
    ml_predicted_skills = ml_recommend_skills(extracted_skills)

    insights = {
        "advice": "Consider working on these skills to improve your profile.",
        "suggested_skills": ml_predicted_skills,
    }

    return {
        "extracted_skills": extracted_skills,
        "predicted_job_role": best_match_role,
        "potential_roles": potential_roles,
        "recommendations": recommendations,
        "tailored_insights": insights,
    }

if __name__ == '__main__':
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port, reload=True)
