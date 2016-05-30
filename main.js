// @Author: Amar Prakash Pandey
// @Date:   2016-05-30
// @Email:  amar.om1994@gmail.com  
// @Github username: @amarlearning
// MIT License. You can find a copy of the License
// @http://amarlearning.mit-license.org

const {app, Tray, Menu, BrowserWindow} = require('electron');
const path = require('path');

var isOnline = require('is-online');

const iconPathWork = path.join(__dirname, 'images\\day-19.png');
const iconPathNotWork = path.join(__dirname, 'images\\sunset-19.png');

let appIcon = null;
let win = null;

app.on('ready', function(){

  win = new BrowserWindow({show:false});

  appIcon = new Tray(iconPathWork);

  setInterval(function () {

      isOnline(function(err, online) {

      if(!online) {
        
        appIcon.destroy()
        appIcon = new Tray(iconPathNotWork);
      } else {
        
        appIcon.destroy()
        appIcon = new Tray(iconPathWork);
      }
      
    });

  },500)

  appIcon.setToolTip('Pingetron');

});

app.on('window-all-closed', () => {
  app.quit()
})
