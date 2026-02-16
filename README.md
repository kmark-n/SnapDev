🛠️ SnapDev
An AI-powered multi-agent coding assistant built with LangGraph.

SnapDev transforms natural language prompts into complete, working projects by simulating a real-world engineering workflow. Unlike simple chat models, SnapDev acts as a coordinated team of specialized agents to architect and write code file-by-file.

🏗️ The Multi-Agent Architecture
SnapDev utilizes three distinct agents to handle the development lifecycle:
Planner Agent – Analyzes your request and generates a detailed project plan. 
Architect Agent – Breaks down the plan into specific engineering tasks with explicit context for each file. 
Coder Agent – Implements each task, writes directly into files, and uses available tools like a real developer.

🚀 Getting Started
Prerequisites
uv: A fast Python package installer. .

Groq API Key: Required for the LLM inference. .

⚙️ Installation & Setup
Initialize Environment

Install Dependencies

Configure Environment
Create a .env file based on .sample_env:

Run the Application

🧪 Example Prompts
"Build a colorful modern todo app in HTML, CSS, and JS."

"Create a Python script that scrapes weather data and saves it to a CSV."

"Build a simple calculator web application."
