import { Component } from '@angular/core';
import { Plugins, FilesystemDirectory, FilesystemEncoding, Capacitor } from '@capacitor/core';

const { Filesystem, Share } = Plugins;

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  logUrl: string;

  constructor() { }

  async createFile() {
    try {

      // Inicializamos el fichero con la fecha de creacion arriba del todo
      const result = await Filesystem.writeFile({
        path: "sample.txt",
        data: `hello\n`,
        directory: FilesystemDirectory.Cache,
        encoding: FilesystemEncoding.UTF8,
        recursive: true
      })
      this.logUrl = result.uri

      console.log(`createFile=${JSON.stringify(this.logUrl)}`);

    } catch (e) {
      console.error('Unable to write file', e);
    }
  }

  async share() {
    await this.createFile()

    let shareRet = await Share.share({
      title: "Title share",
      url: this.logUrl,
      dialogTitle: "Dialog title share"
    });
  }

}
