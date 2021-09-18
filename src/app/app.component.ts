import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    '../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  ],
})
export class AppComponent {
  // fields specified in component classes are available in according html
  title = 'Shopping List:';
  shopping_list_items = [];

  constructor() {
    this.makeRequest();
  }

  // performs a request to /shopping_list which is forwarded to the express server at localhost:3000/shopping_list (cf. proxy.conf.json)
  public async makeRequest() {
    this.shopping_list_items = await fetch('/shopping_list').then((response) =>
      response.json()
    );
  }

  //other fetch-requests
  public async postData(data: { name: string }) {
    const response = await fetch('/listitem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  public async deleteData(id: string) {
    const response = await fetch('/listitem/' + id, {
      method: 'DELETE',
    });
    return response.json();
  }

  // Eventhandler
  async addItem(value: string) {
    this.postData({ name: value }).then((response) => {
      this.makeRequest();
    });
  }

  async deleteItem(id: string) {
    this.deleteData(id).then((response) => {
      this.makeRequest();
    });
  }
}
