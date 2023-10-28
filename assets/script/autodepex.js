let SHEET_ID = '1x6IU1mjr48XjZPyEs8MHgLNHj6sR2A2bhXTjE6AyWlU';
let SHEET_TITLE = '1472083773';
let SHEET_RANGE = 'A8:L';

let FULL_URL = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE)

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  return JSON.parse((await response.text()).substr(47).slice(0,-2));
}

postData(FULL_URL).then((data) => {
  let value = data.table.rows.reverse();
  let lenght = value.length;
  const tbody = document.getElementById("values");

  for(let i = 0; i<lenght;i++){
      try{
        let azienda = value[i].c[3].v;
        let dipendente = value[i].c[4].v;
        let timestamp = value[i].c[0].f;
        
        const row = document.createElement("tr");
        
        const cell1 = document.createElement("td");
        cell1.textContent = azienda;
        const cell2 = document.createElement("td");
        cell2.textContent = dipendente;
        const cell3 = document.createElement("td");
        cell3.textContent = timestamp;
        
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);

        tbody.appendChild(row);
      } catch(TypeError) {
        
      }
  }
});

async function searchTable() {
  var input, filter, table, tr, td, i, j, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td");
    for (j = 0; j < td.length; j++) {
      txtValue = td[j].textContent || td[j].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
        break;
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
