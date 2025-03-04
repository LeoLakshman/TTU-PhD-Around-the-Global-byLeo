Description
Project Title: TTU PhD Applicants Globe Visualization
Author: Lakshman Pukhraj
Date: March 2025  
Overview
This project is an interactive web-based visualization tool that displays Texas Tech University (TTU) PhD applicants in Computer Science on a 3D globe. It uses data from a JSON file (PhD_Applications.json) containing applicant details such as Application ID, Citizenship Country, Intended Term, Education History, GRE Scores, and English Proficiency. The visualization aggregates applicants by their citizenship country, plots them on a globe with approximate geographic coordinates, and provides a sidebar for navigation. Clicking a country on the globe or sidebar reveals detailed information about each applicant in a popup panel.
Features
Globe Visualization: Powered by Globe.gl, it renders a 3D Earth with night-time imagery, marking countries with applicant counts using colored labels (red for higher counts, orange for lower).

Sidebar: Lists countries with the number of TTU applicants, allowing users to click and view detailed student data.

Details Panel: Displays comprehensive applicant information, including education history, GRE scores, and English proficiency, in a scrollable popup.

Data-Driven: Fetches data from a JSON file, aggregates it by country, and dynamically updates the UI.

Purpose
The tool aims to provide an engaging way to explore the geographic distribution of TTU PhD applicants, offering insights into applicant demographics and academic backgrounds. It’s designed for educational use, recruitment analysis, or showcasing TTU’s global reach.
Technologies Used
HTML/CSS: Structure and styling of the interface.

JavaScript: Core logic, data fetching, and interaction handling.

Globe.gl: 3D globe rendering library.

JSON: Data storage format for applicant details.

Data Requirements
The JSON file (PhD_Applications.json) must contain applicant records with fields like Citizenship Country, Education History, etc., as provided in your dataset. Approximate latitude/longitude coordinates are hardcoded for visualization.
Future Enhancements
Add precise geolocation data for countries.

Include filters (e.g., by term, GRE scores) in the sidebar.

Export detailed views as PDF or CSV.


markdown

# TTU PhD Applicants Globe Visualization

![Globe Visualization](https://via.placeholder.com/600x300.png?text=TTU+Globe+Viz+Screenshot)  
*Screenshot placeholder - replace with an actual image of your visualization*

## Overview
This project visualizes Texas Tech University (TTU) PhD applicants in Computer Science on an interactive 3D globe. It aggregates applicant data by `Citizenship Country`, displays counts on a globe, and provides detailed student information on demand. Built with HTML, CSS, JavaScript, and Globe.gl, it’s a tool for exploring TTU’s global applicant pool.

## Features
- **3D Globe:** Displays countries with TTU applicants, using red (>5 students) or orange (≤5 students) labels.
- **Sidebar:** Lists countries with clickable buttons to view applicant details.
- **Details Panel:** Shows full student info (ID, country, term, education, GRE, English proficiency) in a scrollable popup.
- **Dynamic Data:** Fetches and processes applicant data from a JSON file.

## Prerequisites
- A modern web browser (e.g., Chrome, Firefox).
- Internet access to load `Globe.gl` from CDN and fetch the JSON data.
- A hosted `PhD_Applications.json` file (e.g., via GitHub Gist).

## Installation
1. **Clone or Download:**
   ```bash
   git clone <repository-url>
   cd ttu-phd-globe-viz

   Or download the ZIP and extract it.
Host JSON Data:
Upload PhD_Applications.json to a public URL (e.g., GitHub Gist).

Update const GIST_URL in script.js with the correct URL.

Serve the Project:
Use a local server (e.g., VS Code Live Server, or python -m http.server 8000).

Open index.html in your browser via the server (e.g., http://localhost:8000).

Project Structure

ttu-phd-globe-viz/
├── index.html       # Main HTML file with globe, sidebar, and details panel
├── script.js        # JavaScript logic for data fetching, globe rendering, and interactions
├── PhD_Applications.json  # Sample JSON data (host separately)
└── README.md        # This file

Usage
Open index.html in a browser via a local server.

The globe loads with country markers showing applicant counts.

Click a country marker or sidebar button to view detailed applicant info in the popup.

Scroll the details panel if multiple students are listed.

Data Format
The PhD_Applications.json file should follow this structure:
json

[
  {
    "Application ID": "A-0146369",
    "Intended Term": "Summer 2025",
    "Citizenship Country": "Bangladesh",
    "Education History": [
      {
        "Institution": "United International University",
        "GPA": 3.29,
        "Degree": "Bachelor of Engineering",
        "Subject Area": "Computer Science and Engineering"
      }
    ],
    "GRE Scores": null,
    "English Proficiency": { "Test": "IELTS", "Score": 6.5 }
  }
  // More entries...
]

Required field: Citizenship Country.

Optional fields: Education History, GRE Scores, English Proficiency.

Customization
Country Coordinates: Edit countryCoordinates in script.js for more accurate lat/long values.

Styling: Modify CSS in index.html (e.g., colors, sizes).

Thresholds: Adjust studentCount > 5 in script.js for color coding.

Limitations
Uses approximate country centroids for visualization (not city-level precision).

Requires manual coordinate updates for new countries.

No filtering beyond country selection (yet).

Future Enhancements
Integrate a full country geolocation dataset (e.g., GeoJSON).

Add filters for Intended Term, GPA, or GRE scores.

Enable data export functionality.

Contributing
Feel free to fork this project, submit issues, or send pull requests. Contributions to improve accuracy, add features, or enhance UX are welcome!

