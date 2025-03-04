const studentDetailsDiv = document.getElementById('studentDetails');
const selectedCountry = localStorage.getItem('selectedCountry');
const studentData = JSON.parse(localStorage.getItem('studentData'));

// Filter students by Citizenship Country (mapping "Domestic" to "USA")
const countryStudents = studentData.filter(student => {
  const country = student["Citizenship Country"] === "Domestic" ? "USA" : student["Citizenship Country"];
  return country === selectedCountry;
});

if (countryStudents && countryStudents.length > 0) {
  let detailsHTML = `<h2>Students from ${selectedCountry}</h2>`;
  countryStudents.forEach(student => {
    detailsHTML += `
      <div class="student">
        <strong>ID:</strong> ${student["Application ID"]}<br>
        <strong>Country:</strong> ${student["Citizenship Country"] || "N/A"}<br>
        <strong>Term:</strong> ${student["Intended Term"]}<br>
        <strong>Education:</strong><br>
        ${student["Education History"].map(edu => `
          - ${edu.Institution} (${edu.Degree}, ${edu["Subject Area"] || "N/A"}, GPA: ${edu.GPA || "N/A"})
        `).join('<br>')}<br>
        <strong>GRE:</strong> ${student["GRE Scores"] ? `V: ${student["GRE Scores"].Verbal}, Q: ${student["GRE Scores"].Quantitative}` : "N/A"}<br>
        <strong>English Proficiency:</strong> ${student["English Proficiency"] ? `${student["English Proficiency"].Test}: ${student["English Proficiency"].Score}` : "N/A"}
      </div>
    `;
  });
  studentDetailsDiv.innerHTML = detailsHTML;
} else {
  studentDetailsDiv.innerHTML = `<p>No student details available for ${selectedCountry}.</p>`;
}
