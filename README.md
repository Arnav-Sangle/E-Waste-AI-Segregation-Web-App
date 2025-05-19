# E-Waste-AI-Segregation-Web-App

> https://e-waste-ai-segregation-website.vercel.app/

> Developed with the aim to promote responsible e-waste recycling through AI suggestions.

## Overview

The **E-Waste AI Segregation Website** is a web-based application designed to assist in the classification and segregation of electronic waste (e-waste) using artificial intelligence. The platform aims to streamline the recycling process by accurately identifying and categorizing various types of e-waste, thereby promoting efficient recycling practices and environmental sustainability.

## Features

- 🔍 **AI-Powered Classification**: Utilizes API for Gemini 1.5 Flash model to identify and categorize different types of electronic waste.  
- 🖥️ **User-Friendly Interface**: Intuitive design for easy navigation and interaction.  
- ⚡ **Real-Time Predictions**: Instantaneous feedback on e-waste classification results.  
- 📱 **Responsive Design**: Compatible with various devices and screen sizes.  

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Python, Flask  
- **AI Model**: Gemini 1.5 Flash

## Installation

2. **Create a Virtual Environment**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Application**

   ```bash
   python app.py
   ```

5. **Access the Website**

   Open your browser and go to `http://localhost:5000`


## Usage

- Upload an image of an e-waste item via the web interface.
- The AI model processes the image and displays the predicted category.
- Based on the classification, the website may suggest disposal or recycling steps.


## Git commands

- List Remotes of Local Repository
   ```bash
   git remote -v 
   ```

- Add a 2nd remote repostitory
   ```bash
   git remote add <shortcut-name-of-second-remote> <url>
   ```

- Push to 2nd Remote
   ```bash
   git push <shortcut-name-of-second-remote> <branch-name>
   ```

- Set 2nd Remote as the push default branch
   ```bash
   git push --set-upstream <second> <master> 
   ```

- Modify Existing Remote URL
   ```bash
   git remote set-url <shortcut-name-of-remote> <NEW_GIT_URL_HERE>
   ```


## Contributing

We welcome contributions!

1. Fork the repository.  
2. Create a new branch: `git checkout -b feature/your-feature-name`  
3. Commit your changes: `git commit -m 'Add new feature'`  
4. Push to the branch: `git push origin feature/your-feature-name`  
5. Open a Pull Request  

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [TensorFlow](https://www.tensorflow.org/)  
- [Flask](https://flask.palletsprojects.com/)  
- [Bootstrap](https://getbootstrap.com/)  

