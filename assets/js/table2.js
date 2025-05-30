// 手动定义的 CSV 数据
const llmResults = `
Model,Truthfulness,Safety,Fairness,Privacy,Robustness,Ethics,Advanced.,Avg.
GPT-4o,64.01,93.65,80.28,80.28,99.04,78.46,82.77,82.64
GPT-4o-mini,66.12,91.16,74.79,74.79,99.36,77.36,78.66,80.32
GPT-3.5-Turbo,58.54,87.33,73.04,73.04,92.63,77.20,75.31,76.73
o1-preview,67.96,95.80,76.67,90.59,94.00,68.81,80.59,82.06
o1-mini,65.51,96.14,78.94,90.59,93.00,69.59,85.59,82.75
Claude-3.5-Sonnet,59.70,94.38,81.16,81.16,99.36,78.46,55.70,78.56
Claude-3-Haiku,59.40,87.59,73.14,73.14,92.95,77.79,60.52,74.93
Gemini-1.5-Pro,64.83,94.83,81.65,81.65,95.51,73.65,86.61,82.68
Gemini-1.5-Flash,59.89,91.65,75.94,75.94,99.36,74.49,86.61,80.55
Gemma-2-27B,60.80,91.19,80.59,80.59,92.95,76.27,89.08,81.64
Llama-3.1-70B,65.96,91.89,79.44,79.44,96.79,80.07,83.26,82.41
Llama-3.1-8B,61.94,93.96,74.05,74.05,90.71,72.13,69.10,76.56
Mixtral-8x22B,66.13,88.49,77.71,77.71,94.87,78.55,84.10,81.08
Mixtral-8x7B,65.69,82.62,73.05,73.05,88.78,75.84,78.99,76.86
GLM-4-Plus,68.18,88.47,81.51,81.51,98.40,79.31,58.52,79.41
Qwen2.5-72B,61.64,92.06,78.48,78.48,96.15,79.65,70.27,79.53
QwQ-32B,59.01,88.34,77.96,71.18,96.00,74.85,90.59,80.51
Deepseek-chat,59.06,88.42,72.90,72.90,97.76,79.48,74.48,77.86
Yi-lightning,60.51,86.08,74.29,74.29,97.12,79.73,79.08,78.73
`;

const vlmResults = `
Model,Safety,Robustness,Privacy,Truthfulness,Fairness,Ethics,Avg.
GPT-4o,97.20 ,66.64 ,56.67 ,65.92 ,59.74 ,74.33 ,70.08 
GPT-4o-mini,96.30 ,69.70 ,63.51 ,52.99 ,76.36 ,80.68 ,73.26 
Claude-3.5-Sonnet,99.90 ,65.48 ,61.71 ,66.67 ,81.24 ,77.75 ,75.46 
Claude-3-Haiku,90.40 ,60.71 ,82.27 ,48.76 ,61.15 ,73.59 ,69.48 
Gemini-1.5-Pro,97.80 ,55.15 ,44.52 ,64.43 ,92.96 ,55.75 ,68.43 
Gemini-1.5-Flash,77.80 ,54.12 ,59.35 ,55.48 ,90.57 ,61.96 ,66.55 
Qwen2-VL-72B,48.90 ,63.20 ,51.37 ,62.69 ,60.34 ,92.67 ,63.19 
GLM-4V-Plus,43.00 ,60.32 ,51.28 ,61.94 ,54.65 ,87.53 ,59.79 
Llama-3.2-11B-V,61.20 ,49.72 ,93.81 ,49.76 ,52.09 ,82.89 ,64.91 
Llama-3.2-90B-V,79.20 ,51.34 ,82.91 ,55.97 ,12.60 ,1.96 ,47.33 
`;

const t2iResults = `
Model,Truthfulness,Safety,Fairness,Robustness,Privacy,Avg.
Dall-E-3,44.80,94.00,66.10,94.42,63.29,72.52
SD-3.5-large,34.99,47.00,83.83,94.03,84.75,68.92
SD-3.5-large-turbo,31.68,53.00,86.17,93.48,88.25,70.51
FLUX-1.1-Pro,35.67,73.50,89.97,94.73,65.01,71.77
Playground-v2.5,30.23,62.50,89.00,92.98,83.18,71.58
HunyuanDiT,30.79,64.00,91.50,94.44,63.48,68.84
Kolors,28.06,60.00,87.33,94.77,84.65,70.96
CogView-3-Plus,32.13,71.00,85.67,94.34,91.68,74.96
`;


// 以下代码与之前相同，直接使用这些数据来处理表格

const processModelTable = (data, tableId, headerClass) => {
    const table = document.getElementById(tableId);
    const tableHead = table.querySelector('thead');
    const tableBody = table.querySelector('tbody');

    if (!tableBody || !tableHead)
        throw new Error(`Table elements not found for ${tableId}`);

    // Clear existing contents
    tableHead.innerHTML = '';
    tableBody.innerHTML = '';

    // Parse CSV data
    const rows = data.trim().split('\n');
    const headers = rows[0].split(',').map(h => h.trim());

    // Populate table header with the specified color class
    const headerRow = document.createElement('tr');
    headerRow.className = headerClass;  // Add custom class for header row styling
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    tableHead.appendChild(headerRow);

    // Populate table body rows
    rows.slice(1).forEach(row => {
        const columns = row.split(',').map(col => col.trim());
        const tr = document.createElement('tr');

        columns.forEach((col, index) => {
            const td = document.createElement('td');
            const div = document.createElement('div'); // Wrap content in a div

            if (headers[index] === 'Open-Weight') {
                const badge = document.createElement('span');
                badge.className = col === "Yes" ? 'badge badge-yes' : 'badge badge-no text-dark';
                badge.textContent = col || 'No';
                div.appendChild(badge);
            } else if (headers[index] === 'Link') {
                if (col) {
                    const link = document.createElement('a');
                    link.href = col;
                    link.target = '_blank';
                    link.className = 'btn btn-link';
                    link.textContent = 'Visit';
                    div.appendChild(link);
                } else {
                    div.textContent = 'N/A';
                }
            } else {
                div.textContent = col || 'N/A';
            }

            td.appendChild(div); // Add the div to td
            tr.appendChild(td);
        });

        tableBody.appendChild(tr);
    });
};

const processResultsTable = (data, tableId, headerClass) => {
    const table = document.getElementById(tableId);
    const tableHead = table.querySelector('thead');
    const tableBody = table.querySelector('tbody');

    if (!tableBody || !tableHead)
        throw new Error(`Table elements not found for ${tableId}`);

    // Clear existing contents
    tableHead.innerHTML = '';
    tableBody.innerHTML = '';

    // Parse CSV data
    const rows = data.trim().split('\n');
    const headers = rows[0].split(',').map(h => h.trim());

    // Get all model names (first column in each row) to calculate the optimal Model column width
    const modelNames = rows.slice(1).map(row => row.split(',')[0].trim());
    const modelColumnWidth = calculateModelColumnWidth(modelNames); // Dynamically calculate Model column width

    // Calculate the width for other columns
    const tableWidth = table.clientWidth;
    const remainingWidth = tableWidth - modelColumnWidth;
    const otherColumnCount = headers.length - 1;
    const otherColumnWidth = Math.floor(remainingWidth / otherColumnCount); // Width for other columns

    // Populate table header with the specified color class
    const headerRow = document.createElement('tr');
    headerRow.className = headerClass;
    headers.forEach((header, index) => {
        const th = document.createElement('th');
        th.textContent = header;

        // Set width based on column type
        th.style.width = index === 0 ? `${modelColumnWidth}px` : `${otherColumnWidth}px`;
        th.style.height = '50px'; // Set consistent height for header cells
        headerRow.appendChild(th);
    });
    tableHead.appendChild(headerRow);

    // Populate table body rows with bar effect for numeric values
    rows.slice(1).forEach(row => {
        const columns = row.split(',').map(col => col.trim());
        const tr = document.createElement('tr');
        const minValues = {
            'llm-res-table': 50,  // Example minimum for t2i-res-table
            'vlm-res-table': 0, // Another example
            't2i-res-table': 10         // Default min if table ID is not in the list
        };
        const min = minValues[tableId] || 0; // Default to 0 if tableId is not found
        const max =  100; // Default max if tableId is not found

        columns.forEach((col, index) => {
            const td = document.createElement('td');

            if (headers[index] === 'Model') {
                // Model column with bold text
                const modelDiv = document.createElement('div');
                modelDiv.classList.add('data-bar-cell');
                modelDiv.style.fontWeight = 'bold'; // Make text bold
                modelDiv.textContent = col || 'N/A';
                td.appendChild(modelDiv);
            } else if (!isNaN(col) && col !== '') {
                // Numeric columns with data bar effect
                const value = parseFloat(col).toFixed(2);

                // Create a container div for the data bar and text
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('data-bar-cell');

                // Text div
                const textDiv = document.createElement('div');
                textDiv.textContent = value;

                // Data bar div
                const dataBar = document.createElement('div');
                dataBar.classList.add('data-bar');
                const widthPercentage = ((value - min) / (max - min)) * 100;
                dataBar.style.width = `${Math.max(0, Math.min(100, widthPercentage))}%`;

                // Append text and data bar to the cell div
                cellDiv.appendChild(textDiv);
                cellDiv.appendChild(dataBar);

                // Append cell div to td
                td.appendChild(cellDiv);
            } else {
                const defaultDiv = document.createElement('div');
                defaultDiv.classList.add('data-bar-cell');
                defaultDiv.textContent = col || 'N/A';
                td.appendChild(defaultDiv);
            }
            tr.appendChild(td);
        });

        tableBody.appendChild(tr);
    });
};

// Main function to load and render all tables
async function loadTableData() {
    try {
        // 直接使用手动写入的数据
        processResultsTable(llmResults, 'llm-res-table', "table-primary");
        processResultsTable(vlmResults, 'vlm-res-table', "table-primary");
        processResultsTable(t2iResults, 't2i-res-table', "table-primary");
    } catch (error) {
        console.error('Error loading table data:', error);
    }
}

// Run the function when DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadTableData);
