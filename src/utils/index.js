/**
 * Convert monthlyVisits string to a comparable number
 * @param {string} visits - The monthlyVisits string (e.g. "27.4万")
 * @returns {number} - The converted number
 */
function convertVisitsToNumber(visits) {
    // Handle null, undefined, empty string, or non-string types
    if (!visits || typeof visits !== 'string') return 0;
    
    // Handle special case of '0' string
    if (visits === '0') return 0;
    
    // Remove any whitespace
    const cleanVisits = visits.trim();
    
    const num = parseFloat(cleanVisits);
    if (isNaN(num)) return 0;

    if (cleanVisits.includes('亿')) {
        return num * 100000000;
    } else if (cleanVisits.includes('万')) {
        return num * 10000;
    } else if (cleanVisits.includes('千')) {
        return num * 1000;
    }
    return num;
}

/**
 * Sort data by monthlyVisits in descending order
 * @param {Object} data - The data object to sort
 * @returns {Object} - The sorted data object
 */
function sortByMonthlyVisits(data) {
    // Handle invalid input
    if (!data || typeof data !== 'object') {
        return {};
    }

    const result = {};

    // Process each category in the input data
    Object.entries(data).forEach(([category, items]) => {
        // Handle invalid category data
        if (!items || typeof items !== 'object') {
            result[category] = items;
            return;
        }

        // Sort items within each category
        const sortedItems = Object.entries(items)
            .sort(([keyA, a], [keyB, b]) => {
                // Handle invalid item structure
                if (!a || !b) {
                    if (!a && !b) return 0;
                    if (!a) return 1;
                    if (!b) return -1;
                }

                const visitsA = convertVisitsToNumber(a.monthlyVisits);
                const visitsB = convertVisitsToNumber(b.monthlyVisits);
                
                // Primary sort: by visits (descending)
                const visitsDiff = visitsB - visitsA;
                if (visitsDiff !== 0) {
                    return visitsDiff;
                }
                
                // Secondary sort: by key (ascending) for stability
                return keyA.localeCompare(keyB);
            });

        // Create new category object with sorted items
        result[category] = {};
        sortedItems.forEach(([key, value]) => {
            result[category][key] = value;
        });
    });

    return result;
}

module.exports = {
    sortByMonthlyVisits
};
