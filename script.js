const GIST_URL = 'PhD_Applications.json'; // Replace with your actual GIST URL

let studentData;

// Country coordinates (approximate centroids for visualization)
const countryCoordinates = {
  "Bangladesh": { latitude: 23.685, longitude: 90.3563 },
  "China": { latitude: 35.8617, longitude: 104.1954 },
  "Nepal": { latitude: 28.3949, longitude: 84.124 },
  "Vietnam": { latitude: 14.0583, longitude: 108.2772 },
  "India": { latitude: 20.5937, longitude: 78.9629 },
  "Liberia": { latitude: 6.4281, longitude: -9.4295 },
  "Ireland": { latitude: 53.1424, longitude: -7.6921 },
  "Iran": { latitude: 32.4279, longitude: 53.688 },
  "Nigeria": { latitude: 9.082, longitude: 8.6753 },
  "Pakistan": { latitude: 30.3753, longitude: 69.3451 },
  "Sri Lanka": { latitude: 7.8731, longitude: 80.7718 },
  "Ghana": { latitude: 7.9465, longitude: -1.0232 },
  "Afghanistan": { latitude: 33.9391, longitude: 67.71 },
  "Cameroon": { latitude: 7.3697, longitude: 12.3547 },
  "Zimbabwe": { latitude: -19.0154, longitude: 29.1549 }
  // Add more countries as needed from your data
};

fetch(GIST_URL)
  .then(res => res.json())
  .then(data => {
    studentData = data;
    localStorage.setItem('studentData', JSON.stringify(studentData));
    console.log("Student Data Loaded:", studentData);

    // Aggregate students by country
    const countryData = studentData.reduce((acc, student) => {
      const country = student["Citizenship Country"] || "Unknown";
      if (!acc[country]) {
        acc[country] = {
          country,
          studentCount: 0,
          students: [],
          latitude: countryCoordinates[country]?.latitude || 0,
          longitude: countryCoordinates[country]?.longitude || 0
        };
      }
      acc[country].studentCount++;
      acc[country].students.push(student);
      return acc;
    }, {});

    const countryArray = Object.values(countryData);

    // Initialize Globe
    const globe = new Globe(document.getElementById('globeViz'))
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .htmlElementsData(countryArray)
      .htmlLat('latitude')
      .htmlLng('longitude')
      .htmlElement(d => {
        const el = document.createElement('div');
        el.textContent = `${d.country} (${d.studentCount} TTU Students)`;
        el.style.color = d.studentCount > 5 ? 'red' : 'orange'; // Adjust threshold as needed
        el.style.fontSize = '16px';
        el.style.background = 'rgba(0, 0, 0, 0.7)';
        el.style.padding = '8px 12px';
        el.style.borderRadius = '5px';
        el.style.whiteSpace = 'nowrap';
        el.style.cursor = 'pointer';
        el.onclick = () => showStudentDetails(d.students);
        return el;
      });

    // Populate Sidebar
    const sidebar = document.getElementById('sidebar');
    countryArray.forEach(country => {
      const button = document.createElement('button');
      button.textContent = `${country.country} (${country.studentCount} TTU Students)`;
      button.addEventListener('click', () => showStudentDetails(country.students));
      sidebar.appendChild(button);
    });

    // Function to display student details
    function showStudentDetails(students) {
      const detailsDiv = document.getElementById('studentDetails');
      detailsDiv.innerHTML = ''; // Clear previous content
      detailsDiv.style.display = 'block';

      students.forEach(student => {
        const studentInfo = document.createElement('div');
        studentInfo.style.marginBottom = '10px';
        studentInfo.innerHTML = `
          <strong>ID:</strong> ${student["Application ID"]}<br>
          <strong>Country:</strong> ${student["Citizenship Country"] || "N/A"}<br>
          <strong>Term:</strong> ${student["Intended Term"]}<br>
          <strong>Education:</strong><br>
          ${student["Education History"].map(edu => `
            - ${edu.Institution} (${edu.Degree}, ${edu["Subject Area"] || "N/A"}, GPA: ${edu.GPA || "N/A"})
          `).join('<br>')}<br>
          <strong>GRE:</strong> ${student["GRE Scores"] ? `V: ${student["GRE Scores"].Verbal}, Q: ${student["GRE Scores"].Quantitative}` : "N/A"}<br>
          <strong>English Proficiency:</strong> ${student["English Proficiency"] ? `${student["English Proficiency"].Test}: ${student["English Proficiency"].Score}` : "N/A"}
        `;
        detailsDiv.appendChild(studentInfo);
      });
    }
  })
  .catch(error => console.error("Error loading student data:", error));
