(() => {
  // Extract the entire page source
  const source = document.documentElement.outerHTML;

  // Function to find all instances of "options" and "inventory_quantity"
  function findInventory() {
    const optionsRegex = /"options":\s*\["(.*?)"]/g;
    const quantityRegex = /"inventory_quantity":\s*(\d+)/g;

    const optionsMatches = [...source.matchAll(optionsRegex)];
    const quantityMatches = [...source.matchAll(quantityRegex)];

    const options = optionsMatches.flatMap(match => match[1].split(',')).map(option => option.trim().replace(/"/g, ''));
    const quantities = quantityMatches.map(match => parseInt(match[1], 10));

    const results = [];
    for (let i = 0; i < options.length && i < quantities.length; i++) {
      const option = options[i] || "Unknown Option";
      const quantity = quantities[i] !== undefined ? quantities[i] : 0;
      results.push(`${option} : ${quantity}`);
    }

    console.log("Options and Quantities Found:", results);
    return results;
  }

  // Return inventory data
  return findInventory();
})();
