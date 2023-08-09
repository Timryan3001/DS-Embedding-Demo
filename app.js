console.log('hello b2s')

let viz;

// 1. Create a variable to store the vizContainer

const vizContainer = document.getElementById("vizContainer");

// 2. Create a variable to store the dashboard options

const options = {
    device: "desktop",
    height: "800px",
    width: "1100px"
};

// 3. create a variable to store the URL

const url = 'https://public.tableau.com/views/EmbeddingWorkbookProfitsAcrossME-Asia/OfficeSupplyProfitsacrossMEandAsia';


// 4. creating functionality to build the viz

function initViz() {
    viz = new tableau.Viz(vizContainer, url, options);
}

// 5. actually control loading the viz when the page opens

document.addEventListener("DOMContentLoaded", initViz);

// 6. adding extra functionality like a PDF export button

document.addEventListener("DOMContentLoaded", function () {
    const exportPdfButton = document.getElementById("exportPdf");

    exportPdfButton.addEventListener("click", exportPdfFunction);

    function exportPdfFunction() {
        viz.showExportPDFDialog();
    }
});

// 7. adding extra functionality like a PPT export button

document.addEventListener("DOMContentLoaded", function () {
    const exportPdfButton = document.getElementById("exportPpt");

    exportPdfButton.addEventListener("click", exportPptFunction);

    function exportPptFunction() {
        viz.showExportPowerPointDialog();
    }
});

//8. setup filtering for the worksheet

// 10. set up filter interactions

document.addEventListener("DOMContentLoaded", function () {
    function getRangeValues() {
        const minValue = document.getElementById("minValue").value;
        const maxValue = document.getElementById("maxValue").value;
        console.log(minValue, maxValue);
        const workbook = viz.getWorkbook();
        const activeSheet = workbook.getActiveSheet();
        const sheets = activeSheet.getWorksheets();
        //inspect the sheets you need to filter
        console.log(sheets);
        const sheetToFilter = sheets[0];
        // do the actual filtering
        sheetToFilter
            .applyRangeFilterAsync("SUM(Sales)", { min: minValue, max: maxValue })
            .then(alert("Viz filtered! 🐵"));
    }

    // 11. trigger function on filter button click
    const filterButton = document.getElementById("filterButton");

    filterButton.addEventListener("click", getRangeValues);
});