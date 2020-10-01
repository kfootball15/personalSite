/** I killed this because creating an object based on the dom 
 * was overkill. I can just reference the underscored layer
 * names directly.
 * What WOULD be cool is if I named things better.may like query params
 *      m_onIf=rain+offIf=snow
 */
// const deconstruct = (svgDoc, prefix='m_') => {
//     /*
//         This line of code takes advantage of "substring matching attributes" (can't use regex in querySelector);
//             https://stackoverflow.com/questions/16791527/can-i-use-a-regular-expression-in-queryselectorall
//         We are grabbing all elements with an id that starts with "m_" (or otherwise specified), therefore 
//         all illustrator layers must have a prefix prior to export 
//     */
//     let elemArray = svgDoc.querySelectorAll(`[id^=${prefix}]`);
//     let obj = {};
//     elemArray.forEach(function(elem){
//         obj[_idToCamelCase(elem.id)] = elem;
//     })
//     return obj;
// }

// //-- Helper Functions --\\
// function _idToCamelCase (string) {
//     let test = string.split(/(-|_)/g); //splits strings by _ or -
//     let key = ''
//     test.forEach(function(str){
//         if (!str.includes('-') && !str.includes('_')) {
//             key +=  str.length > 1 ? str[0].toUpperCase() + str.slice(1 - str.length) : str
//         }
//     });
//     return key;
// }

// export { deconstruct }
