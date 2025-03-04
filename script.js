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
  "Zimbabwe": { latitude: -19.0154, longitude: 29.1549 },
  "Domestic": { latitude: 37.0902, longitude: -95.7129 }, // USA centroid
  "USA": { latitude: 37.0902, longitude: -95.7129 } // Alias for Domestic
};

fetch(GIST_URL)
  .then(res => res.json())
  .then(data => {
    studentData = data;
    localStorage.setItem('studentData', JSON.stringify(studentData));
    console.log("Student Data Loaded:", studentData);

    // Aggregate students by country, treating "Domestic" as "USA"
    const countryData = studentData.reduce((acc, student) => {
      let country = student["Citizenship Country"] || "Unknown";
      // Map "Domestic" to "USA"
      if (country === "Domestic") {
        country = "USA";
      }
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
        el.onclick = () => {
          localStorage.setItem('selectedCountry', d.country);
          window.location.href = 'details.html';
        };
        return el;
      });

    // Populate Sidebar
    const sidebar = document.getElementById('sidebar');
    countryArray.forEach(country => {
      const button = document.createElement('button');
      button.textContent = `${country.country} (${country.studentCount} TTU Students)`;
      button.addEventListener('click', () => {
        localStorage.setItem('selectedCountry', country.country);
        window.location.href = 'details.html';
      });
      sidebar.appendChild(button);
    });
  })
  .catch(error => console.error("Error loading student data:", error));
