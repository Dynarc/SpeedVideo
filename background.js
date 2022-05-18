// background.js

// ---------- WIP ----------

// chrome.runtime.onInstalled.addListener(() => {
//     chrome.contextMenus.create({
//         title: 'Changer la vitesse de lecture',
//         id: 'changeSpeed',
//         contexts: ['video']
//     });

//     chrome.contextMenus.create({
//         title: 'x0.5',
//         id: '0.5',
//         contexts: ['video'],
//         parentId: 'changeSpeed',
//         type: 'radio'
//     });

//     chrome.contextMenus.create({
//         title: 'x1',
//         id: '1',
//         contexts: ['video'],
//         parentId: 'changeSpeed',
//         type: 'radio',
//         checked: true
//     });

//     chrome.contextMenus.create({
//         title: 'x1.5',
//         id: '1.5',
//         contexts: ['video'],
//         parentId: 'changeSpeed',
//         type: 'radio'
//     });

//     chrome.contextMenus.create({
//         title: 'x2',
//         id: '2',
//         contexts: ['video'],
//         parentId: 'changeSpeed',
//         type: 'radio'
//     });

//     chrome.contextMenus.onClicked.addListener(
//         (info, tab) => {
//             console.log(info);
//             console.log(tab);
//         }
//     )
// });

