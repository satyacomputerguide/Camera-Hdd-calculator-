// Constants
const BASE_BITRATE = 4; // Mbps per 1MP at reference conditions

function calculateStorage() {
    // Get input values
    const cameras = parseInt(document.getElementById('cameras').value) || 0;
    const days = parseInt(document.getElementById('days').value) || 0;
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const fps = parseInt(document.getElementById('fps').value) || 0;
    
    // Get factors from dropdowns
    const codecFactor = parseFloat(document.getElementById('format').value);
    const resolution = parseFloat(document.getElementById('resolution').value);
    const qualityFactor = parseFloat(document.getElementById('quality').value);
    const sceneFactor = parseFloat(document.getElementById('activity').value);

    // Calculate bitrate (Mbps per camera)
    const bitrate = BASE_BITRATE * 
                   resolution * 
                   qualityFactor * 
                   sceneFactor * 
                   (fps / 30) * 
                   codecFactor;

    // Calculate total storage in GB
    const storagePerCamera = bitrate * 0.45 * hours; // 0.45 = conversion factor (Mbps to GB/h)
    const totalStorageGB = storagePerCamera * days * cameras;

    // Format and display results
    displayResults(totalStorageGB);
}

function displayResults(totalGB) {
    const storageResult = document.getElementById('storageResult');
    const hddRecommendation = document.getElementById('hddRecommendation');
    
    // Format storage result
    const totalTB = totalGB / 1000;
    storageResult.textContent = `Total Storage Required: ${totalTB.toFixed(2)} TB (${totalGB.toFixed(2)} GB)`;

    // Calculate HDD recommendations
    const hddSizes = [1, 2, 4, 6, 8, 10, 12, 16, 20]; // In TB
    let recommendedHDD = '';
    
    for (let size of hddSizes.sort((a,b) => b-a)) {
        if (totalTB <= size) {
            recommendedHDD = `1x ${size}TB HDD`;
            break;
        }
    }
    
    if (!recommendedHDD) {
        const count = Math.ceil(totalTB / 20);
        recommendedHDD = `${count}x 20TB HDDs`;
    }

    hddRecommendation.textContent = `Recommended HDD Configuration: ${recommendedHDD}`;
}

// Initial calculation on page load
calculateStorage();
