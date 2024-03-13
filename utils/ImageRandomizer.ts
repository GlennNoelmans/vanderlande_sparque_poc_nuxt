export function randomizeItemImage(maxAmount: number, assetName: string) {
    const randomNumber = Math.floor(Math.random() * maxAmount) + 1;
    return '/images/' + assetName + 's/' + assetName + randomNumber + '.jpg';
}