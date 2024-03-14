export function randomizeItemImage(maxAmount: number, assetName: string) {
    const randomNumber = Math.floor(Math.random() * maxAmount) + 1;
    return '/images/' + assetName.toLowerCase() + 's/' + assetName.toLowerCase() + randomNumber + '.jpg';
}