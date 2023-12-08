import React, { useState } from "react";
import { ExcelRenderer, OutTable } from "react-excel-renderer";

const ExcelRequestsImport = () => {
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);

  const uploadHandler = (data) => {
    console.log(data)
  };
  
  const uploadFile = (event) => {
    let fileObj = event.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        const { cols, rows } = resp;
        console.log(cols, rows)
        setCols(cols);
        setRows(rows);
        const data = [...rows];
        data.shift();
        uploadHandler(data);
      }
    });
  };

  

//   let dataExcel;
//   if (typeof rows[1] !== "undefined") {
//     dataExcel = rows[1];
//   } else {
//     dataExcel = {
//       1: "Γεώργιε, ξέχασες να ανεβάσεις κάποιο αρχείο!",
//     };
//   }

//   function findOption(option) {
//     if (option === "" || option === "Not found") {
//       return `<span></span>`;
//     } else {
//       return `<li>${option}</li>`;
//     }
//   }

//   let description;
//   if (typeof rows[1] !== "undefined") {
//     description = `<p>${dataExcel["40"]}</p><ul>
//     ${findOption(dataExcel["42"])}
//     ${findOption(dataExcel["43"])}
//     ${findOption(dataExcel["44"])}
//     ${findOption(dataExcel["45"])}
//     ${findOption(dataExcel["46"])}
//     ${findOption(dataExcel["47"])}
//     ${findOption(dataExcel["48"])}
//     ${findOption(dataExcel["49"])}
//     ${findOption(dataExcel["51"])}
//     ${findOption(dataExcel["52"])}
//     ${findOption(dataExcel["53"])}
//     </ul>`;
//   } else {
//     description = "";
//   }


  return (
    <>
      <div className="excel-import-container">
        <div className="file-upload">
          <label>Upload File</label>
          <input type="file" onChange={uploadFile} />
          <button>+</button>
        </div>
        <div className="excel-table-wrapper">
          <OutTable data={rows} columns={cols} tableClassName="excel-table" />
        </div>
      </div>
    </>
  );
};

export default ExcelRequestsImport;
