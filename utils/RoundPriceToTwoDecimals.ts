export function roundPriceToTwoDecimalsBehindComma(priceString: string) {
    if (!priceString || priceString.trim() === '') {
        return '';
    }
    let price = parseFloat(priceString.replace('€', '').replace(',', '.'));
    let roundedPrice = (Math.round(price * 100) / 100).toFixed(2);
    let formattedPrice = '€ ' + roundedPrice.replace('.', ',');

    return formattedPrice;
}