import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class AppService {
  httpOptions = {
    headers: new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
    }),
  };

  constructor(private http: HttpClient) {}

  getSampleJson() {
    return this.http.get("../assets/sample.json");
    //return this.http.get("http://localhost:8081//api/v1/groceries");
  }

  deleteGrocery(id) {
    return this.http.delete("http://localhost:8081//api/v1/grocery/" + id);
  }

  updateGrocery(body) {
    return this.http.put(
      "http://localhost:8081//api/v1/grocery/" + body.id,
      body
    );
  }

  createGrocery(body) {
    return this.http.post("http://localhost:8081//api/v1/add-grocery/", body);
  }
}
