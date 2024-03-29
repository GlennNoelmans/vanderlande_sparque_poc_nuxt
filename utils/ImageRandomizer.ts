export function randomizeItemImage(maxAmount: number, assetName: string) {
    if (maxAmount === undefined || assetName === undefined) {
        return;
    }
    const randomNumber = Math.floor(Math.random() * maxAmount) + 1;
    return '/images/' + assetName + 's/' + assetName + randomNumber + '.jpg';
}