// LocalStorage madhun data ghene kiva empty array set karne
let colleges = JSON.parse(localStorage.getItem('edulizer_colleges')) || [];

// Page load zalyavar table update karne
document.addEventListener('DOMContentLoaded', () => {
    renderTable();
});

// Form Submit Event
document.getElementById('collegeForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('colName').value;
    const branch = document.getElementById('colBranch').value;
    const code = document.getElementById('colCode').value;
    const fee = document.getElementById('colFee').value;
    const fileInput = document.getElementById('colFile');
    
    // File cha naav ghene (Sadhya storage sathi fakt naav vaparu)
    const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : "No File";

    const newCollege = {
        id: Date.now(), // Unique ID sathi
        name,
        branch,
        code,
        fee,
        fileName
    };

    colleges.push(newCollege);
    saveAndRefresh();
    
    // Form clear karne
    this.reset();
    alert('कॉलेज यशस्वीरित्या जोडले गेले!');
});

// Data save ani Table refresh karne
function saveAndRefresh() {
    localStorage.setItem('edulizer_colleges', JSON.stringify(colleges));
    renderTable();
}

// Table madhe data dakhavne
function renderTable() {
    const tableBody = document.getElementById('collegeTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    colleges.forEach((col) => {
        const row = `
            <tr>
                <td><strong style="color: var(--primary);">${col.code}</strong></td>
                <td>
                    <div style="font-weight: 600;">${col.name}</div>
                    <div style="font-size: 0.8rem; color: var(--secondary);">${col.branch}</div>
                </td>
                <td>₹${col.fee || 'N/A'}</td>
                <td>
                    <span class="status-tag" style="background: #e0f2fe; color: #0369a1;">
                        <i class="fas fa-file-alt"></i> ${col.fileName}
                    </span>
                </td>
                <td>
                    <div class="action-btns">
                        <button onclick="deleteCollege(${col.id})" class="btn-sm" style="background: #fee2e2; color: #b91c1c; border:none; cursor:pointer;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// College delete karne
function deleteCollege(id) {
    if(confirm('तुम्हाला हे कॉलेज लिस्ट मधून काढून टाकायचे आहे का?')) {
        colleges = colleges.filter(col => col.id !== id);
        saveAndRefresh();
    }
                                                         }
