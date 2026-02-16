# 🛠️ SnapDev

**An AI-powered multi-agent coding assistant built with LangGraph**

SnapDev transforms natural language prompts into complete, working projects. For example, you give a prompt, and it builds a fully functional software application.

---

## 🏗️ Multi-Agent Architecture

SnapDev utilizes three distinct agents to manage the development lifecycle:

* **Planner Agent** – Analyzes your request and generates a detailed project plan.
* **Architect Agent** – Breaks the plan into specific engineering tasks with explicit context for each file.
* **Coder Agent** – Implements each task, writes directly into files, and uses available tools like a real developer.

* ![SnapDev Screenshot](resources/image/snapdev.png)


---

## 🚀 Getting Started

### Prerequisites

* **uv** – A fast Python package installer
* **Groq API Key** – Required for LLM inference

---

## ⚙️ Installation & Setup

* Initialize environment
* Install dependencies
* Configure environment by creating a `.env` file based on `.sample_env`
* Run the application

---

## 🧪 Example Prompts

* “Build a colorful modern todo app in HTML, CSS, and JS.”
* “Build a simple calculator web application.”

---
