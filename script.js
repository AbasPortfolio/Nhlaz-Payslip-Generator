let fieldCount = 6; // since 6 fields already exist
const maxFieldsPerRow = 2; // per row 2 fields

//function to add a new employee field
function addEmployeeField() {
  const row = document.querySelector('#employeeFields .row');

  const field = document.createElement('div');
  field.className = 'col-half field-row';
  field.style.position = 'relative'; 


   const editableLabel = document.createElement('input');
  editableLabel.type = 'text';
  editableLabel.value = 'New Field Label :';
  editableLabel.style.fontSize = '16px';
  editableLabel.style.width = '150px';
  editableLabel.style.border = 'none';
  editableLabel.style.background = 'transparent';
  editableLabel.style.outline = 'none';
  editableLabel.style.padding = '0';
  editableLabel.style.margin = '0';
  editableLabel.style.whiteSpace = 'nowrap';

  // Value input
  const valueInput = document.createElement('input');
  valueInput.type = 'text';
  valueInput.placeholder = 'Enter value';
  valueInput.style.flex = '2.5';

  // Delete button
  const deleteBtn = document.createElement('span');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = '🗑️';
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.title = "Delete Field";
  deleteBtn.style.position = 'absolute';
  deleteBtn.style.right = '5px';
  deleteBtn.style.top = '8px';
  deleteBtn.style.cursor = 'pointer';
  deleteBtn.onclick = () => field.remove();

  field.appendChild(editableLabel);
  field.appendChild(valueInput);
  field.appendChild(deleteBtn);

  row.appendChild(field);

  fieldCount++;
}

//function to add a new earning row
function addEarningRow() {
  const row = `<tr>
        <td><input type="text" class="earningType" value="Field Name" ></td>
        <td><input type="number" class="earningAmount" oninput="calculatePayable()" value=0 ></td>
         <td>
      <span class="delete-btn" title="Delete Row" onclick="this.closest('tr').remove()"> <i class="fas fa-trash"></i></span>
    </td>
      </tr>`;
  document.querySelector("#earningsTable tbody").insertAdjacentHTML('beforeend', row);
}

 //function to add a new Deduction row
function addDeductionRow() {
  const row = `<tr>
        <td><input type="text" class="deductionType" value="Field Name" ></td>
        <td><input type="number" class="deductionAmount" oninput="calculatePayable()" value=0  ></td>
         <td>
      <span class="delete-btn" title="Delete Row" onclick="this.closest('tr').remove()"> <i class="fas fa-trash"></i></span>
    </td>
      </tr>`;
  document.querySelector("#deductionsTable tbody").insertAdjacentHTML('beforeend', row);
}

// function to calculate total earnings, deductions, and net payable
// function calculatePayable() {
//   let totalEarnings = 0;
//   document.querySelectorAll('.earningAmount').forEach(input => {
//     totalEarnings += parseFloat(input.value) || 0;
//   });

//   let totalDeductions = 0;
//   document.querySelectorAll('.deductionAmount').forEach(input => {
//     totalDeductions += parseFloat(input.value) || 0;
//   });

//   // Get Paid Days and LOP Days
//   const paidDays = parseFloat(document.getElementById('paidDays')?.value) || 0;
//   const lopDays = parseFloat(document.getElementById('lopDays')?.value) || 0;
//   const totalDays = paidDays + lopDays;

//   // Calculate Per Day Salary and LOP Deduction
//   let perDaySalary = 0;
//   let lopDeduction = 0;
//   if (totalDays > 0 && lopDays > 0) {
//     perDaySalary = totalEarnings / totalDays;
//     lopDeduction = lopDays * perDaySalary;
//   }

//   // Add LOP deduction to total deductions
//   const totalDeductionsWithLOP = totalDeductions + lopDeduction;

//   document.getElementById('totalEarnings').innerText = totalEarnings.toFixed(2);
//   document.getElementById('inlineTotalEarnings').innerText = totalEarnings.toFixed(2);

//   document.getElementById('totalDeductions').innerText = totalDeductionsWithLOP.toFixed(2);
//   document.getElementById('inlineTotalDeductions').innerText = totalDeductionsWithLOP.toFixed(2);

//   document.getElementById('netPayable').innerText = (totalEarnings - totalDeductionsWithLOP).toFixed(2);
// }

function calculatePayable() {
  let totalEarnings = 0;

  // Sum up all earnings
  document.querySelectorAll('.earningAmount').forEach(input => {
    totalEarnings += parseFloat(input.value) || 0;
  });

  // Get Paid Days and LOP Days
  const paidDays = parseFloat(document.getElementById('paidDays')?.value) || 0;
  const lopDays = parseFloat(document.getElementById('lopDays')?.value) || 0;
  const totalDays = paidDays + lopDays;

  // Calculate Per Day Salary and LOP Deduction
  let perDaySalary = 0;
  let lopDeduction = 0;

  if (totalDays > 0 && totalEarnings > 0) {
    perDaySalary = totalEarnings / totalDays;
    lopDeduction = lopDays * perDaySalary;
  }

  // Store LOP Deduction separately in a hidden field or just display it if needed
  if (document.getElementById('lopAmount')) {
    document.getElementById('lopAmount').innerText = lopDeduction.toFixed(2);
  }

  // Now calculate other deductions
  let otherDeductions = 0;
  document.querySelectorAll('.deductionAmount').forEach(input => {
    otherDeductions += parseFloat(input.value) || 0;
  });

  const totalDeductionsWithLOP = otherDeductions + lopDeduction;

  // Output all calculations
  document.getElementById('totalEarnings').innerText = totalEarnings.toFixed(2);
  document.getElementById('inlineTotalEarnings').innerText = totalEarnings.toFixed(2);

  document.getElementById('totalDeductions').innerText = totalDeductionsWithLOP.toFixed(2);
  document.getElementById('inlineTotalDeductions').innerText = totalDeductionsWithLOP.toFixed(2);

  document.getElementById('netPayable').innerText = (totalEarnings - totalDeductionsWithLOP).toFixed(2);
}




// Insert static earning rows (without delete button)
document.querySelector("#earningsTable tbody").insertAdjacentHTML('beforeend', `
  <tr>
    <td><input type="text" class="earningType" value="Basic Income"></td>
    <td><input type="number" class="earningAmount" value="0" oninput="calculatePayable()"></td>
    <td></td>
  </tr>
  
`);

// Insert static deduction rows (without delete button)
document.querySelector("#deductionsTable tbody").insertAdjacentHTML('beforeend', `
  
  
`);

calculatePayable();


// function to trigger logo upload
function triggerLogoUpload() {
  document.getElementById('logoUpload').click();
}

// Event liastener for logo upload
document.getElementById('logoUpload').addEventListener('change', function (event) {
  const file = event.target.files[0];
  const preview = document.getElementById('logoPreview');
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});











//reset button 

function resetForm() {
  // Clear all input fields
  document.querySelectorAll('input[type="text"], input[type="number"], input[type="date"], input[type="month"]').forEach(input => {
    input.value = '';
  });

  // Reset logo
  const logo = document.getElementById('logoPreview');
  logo.src = '';
  logo.style.display = 'none';
  document.getElementById('logoUpload').value = '';

  // Remove dynamically added employee fields
  const employeeFieldRows = document.querySelectorAll('#employeeFields .row .col-half.field-row');
  const defaultFieldCount = 6;
  if (employeeFieldRows.length > defaultFieldCount) {
    const row = document.querySelector('#employeeFields .row');
    while (row.children.length > defaultFieldCount) {
      row.removeChild(row.lastChild);
    }
  }

  // Reset LOP and calculated values if they exist
  const lopDays = document.getElementById('lopDays');
  if (lopDays) lopDays.value = 0;

  const lopAmount = document.getElementById('lopAmount');
  if (lopAmount) lopAmount.innerText = '0.00';

  const perDaySalary = document.getElementById('perDaySalary');
  if (perDaySalary) perDaySalary.value = 0;

  // Reset Earnings Table
  document.querySelector("#earningsTable tbody").innerHTML = '';
  addEarningRow();
  addEarningRow();
  document.querySelectorAll('.earningType')[0].value = 'Basic Pay';
  document.querySelectorAll('.earningAmount')[0].value = 0;
  document.querySelectorAll('.earningType')[1].value = 'House Rent Allowance';
  document.querySelectorAll('.earningAmount')[1].value = 0;

  // Reset Deductions Table
  document.querySelector("#deductionsTable tbody").innerHTML = '';
  addDeductionRow();
  addDeductionRow();
  document.querySelectorAll('.deductionType')[0].value = 'Income Tax';
  document.querySelectorAll('.deductionAmount')[0].value = 0;
  document.querySelectorAll('.deductionType')[1].value = 'Provident Fund';
  document.querySelectorAll('.deductionAmount')[1].value = 0;

  // Recalculate Payable
  calculatePayable();
}


//Print payslip function
function printPayslip() {
  const companyName = document.getElementById("companyName").value.trim();
  const companyAddress = document.getElementById("companyAddress").value.trim();
  const empName = document.getElementById("empName").value.trim();
  const empId = document.getElementById("empId").value.trim();
  const payPeriod = document.getElementById("payPeriod").value;
  const paidDays = document.getElementById("paidDays").value.trim();
  const payDate = document.getElementById("payDate").value;

  // Validate required fields
  if (!companyName || !companyAddress || !empName || !empId || !payPeriod || !paidDays || !payDate) {
    alert("Please fill in all the required fields before printing the payslip.");
    return;
  }

  // Validate earnings > 0
  const earningAmounts = document.querySelectorAll(".earningAmount");
  for (let i = 0; i < earningAmounts.length; i++) {
    const amount = parseFloat(earningAmounts[i].value);
    if (isNaN(amount) || amount <= 0) {
      alert("All earning amounts must be greater than 0.");
      earningAmounts[i].style.border = "2px solid red";
      return;
    } else {
      earningAmounts[i].style.border = "";
    }
  }

  // Validate deductions > 0
  const deductionAmounts = document.querySelectorAll(".deductionAmount");
  for (let i = 0; i < deductionAmounts.length; i++) {
    const amount = parseFloat(deductionAmounts[i].value);
    if (isNaN(amount) || amount <= 0) {
      alert("All deduction amounts must be greater than 0.");
      deductionAmounts[i].style.border = "2px solid red";
      return;
    } else {
      deductionAmounts[i].style.border = "";
    }
  }

  // If all validations pass, proceed to print
  window.print();
}

document.querySelectorAll('input').forEach(input => {
  if (input.required && !input.value.trim()) {
    input.style.border = "1px solid red";
  } else {
    input.style.border = "";
  }
});




