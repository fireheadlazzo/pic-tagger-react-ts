// *** objToUpdateString
// Takes in a generic object and a list of keys to pull
// returns a comma-delimited string with all available parameters
// "id=123,status=active,details='{stuff:true}'"
// ***

export function objToUpdateString(object: any, keys: string[]) {
    const validValues: string[] = keys.map((key: string) => {
        const value = object[key];
        const valueExists = value !== undefined && value !== null;
        if(!valueExists){
            return '';
        }
        return `${key}=${value}`;
    });
    console.log(`values = [${validValues}]`);
    return validValues.join(',');
}