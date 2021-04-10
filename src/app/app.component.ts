import { Component } from "@angular/core";
import { AppService } from "./app.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "grocery-helper";
  groceryLists: {
    id: number;
    item: string;
    price: string;
    category: string;
  }[] = [];

  updateIDItem: boolean = false;
  showForm: boolean = false;

  grocery: Grocery = new Grocery();
  copyGroceryList: {
    id: number;
    item: string;
    price: string;
    category: string;
  }[];

  constructor(private dataService: AppService) {
    this.getSampleJson();
  }

  getSampleJson() {
    this.dataService.getSampleJson().subscribe(
      (
        data: {
          id: number;
          item: string;
          price: string;
          category: string;
        }[]
      ) => {
        this.groceryLists = data;
        this.copyGroceryList = data.slice();
      },
      (error) => {
        // display error at views
      }
    );
  }

  updateItem(item) {
    this.showForm = true;
    this.updateIDItem = true;
    this.grocery = { ...item };
  }

  createItem() {
    this.showForm = true;
    this.updateIDItem = false;
    this.grocery.id = undefined;
  }

  deleItem(id) {
    this.dataService.deleteGrocery(id).subscribe(
      (data) => {
        // display error on front end saying that item deleted
        this.getSampleJson();
      },
      (error) => {
        // display error at views
      }
    );
  }

  submitGrocery() {
    if (this.grocery.id) {
      this.dataService.updateGrocery(this.grocery).subscribe(
        (data) => {
          this.getSampleJson();
          this.grocery = new Grocery();
        },
        (error) => {
          // display error at views
        }
      );
    } else {
      this.dataService.createGrocery(this.grocery).subscribe(
        (data) => {
          this.getSampleJson();
          this.grocery = new Grocery();
        },
        (error) => {
          // display error at views
        }
      );
    }
  }

  searchCategory(event) {
    let enterValue = event.target.value;
    if (!enterValue) {
      this.groceryLists = this.copyGroceryList.slice();
    } else {
      let copyList = this.copyGroceryList.slice();
      this.groceryLists = copyList.filter((item) => {
        return item.category.includes(enterValue);
      });
    }
  }
}

export class Grocery {
  id: number;
  item: string;
  price: string;
  category: string;
}
