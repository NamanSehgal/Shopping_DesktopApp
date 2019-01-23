const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

// Looking for app to be ready
app.on('ready',function(){
    // Create New mainWindow
    mainWindow = new BrowserWindow({});
    // Load html to window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    //Quit app when closed
    mainWindow.on('closed',function(){
        app.quit();
    });

    // Build Menu from mainMenuTemplate
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
});

//Handle createAddWindow
function createAddWindow(){
    // Create New mainWindow
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add Shopping List Item'
    });
    // Load html to window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname,'addWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    //Garbage Collection handle
    addWindow.on('close', function(){
        addWindow = null;
    });

}

// Create menu Template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [{
            label: 'Add Item',
            click(){
                createAddWindow();
            }
        },
        {
            label: 'Remove Item'
        },
        {
            label: 'Quit',
            accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
            click(){
                app.quit();
            }
        }
    ]
    }
];

// if mac, Add empty object to Menu
if(process.platform== 'darwin'){
    mainMenuTemplate.unshift({});
}

// Add Developer tools item if not in production
if (process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}
