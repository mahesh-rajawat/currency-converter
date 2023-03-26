export function formatCurrency (priceData, toCurrency) {
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: toCurrency,
    });
    delete priceData['query'];
    delete priceData['info'];
    priceData['formatted'] = (formatter.format(priceData.result))
    return priceData;
}