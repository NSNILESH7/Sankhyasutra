# Project Name


## Description  
**AI-Powered Math Calculator** is an innovative web application that combines the power of artificial intelligence and modern web technologies to solve mathematical equations.  
- **Draw Equations**: Users can draw equations directly on the interface, making it intuitive and user-friendly.  
- **Backend**: Built with **FastAPI**, a high-performance Python framework, to process and solve equations efficiently.  
- **Frontend**: Developed using **React**, offering a dynamic and responsive user experience.  

This project leverages AI models to interpret handwritten equations, solve them accurately, and provide instant results. Perfect for students, educators, and anyone needing quick math solutions!

---

## Project Structure
- **Frontend**: Built using React.
- **Backend**: Powered by FastAPI.

---

## Setup Instructions

### Frontend
1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm run dev
    ```
4. The application will run at `http://localhost:5173` by default.

---

### Backend
1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2. Create and activate a virtual environment:
    - On Windows:
      ```bash
      python -m venv venv
      venv\Scripts\activate
      ```
    - On macOS/Linux:
      ```bash
      python3 -m venv venv
      source venv/bin/activate
      ```
3. Create a `.env` file in the `backend` directory and add the following configuration:
    ```env
    DATABASE_URL=your_database_url
    GEMINI_API_KEY=your_gemini_api_key
    ```
4. Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```
5. Run the backend server:
    ```bash
    python main.py
    ```
6. The backend server will start running on `http://localhost:8000` by default.

---

## Additional Notes
- Ensure you have the necessary tools installed:
  - **Node.js** (for the frontend)
  - **Python 3.8+** (for the backend)
- Replace `your_database_url` and `your_gemini_api_key` in the `.env` file with valid values.
- Both frontend and backend should run simultaneously for the application to work seamlessly.

---

## License
MIT
