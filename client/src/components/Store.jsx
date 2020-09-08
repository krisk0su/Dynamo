import { createContext } from "react";
import { observable, computed, action, decorate } from "mobx";
import axios from "axios";

export class Store {
  records = [];
  selectedRecords = [];
  selectedRecordsForDelete = [];
  rerender = false;
  error = {};

  async getAll() {
    const result = await axios.get("https://localhost:44344/api/all");
    this.records = result.data;
  }
  async delete(id) {
    const res = await axios.delete(`https://localhost:44344/api/${id}`, {});
    this.records = res.data;
  }
  async patch(record) {
    const res = await axios.patch(
      "https://localhost:44344/api/PatchOne",
      record
    );
    this.records = res.data;
  }
  async massEdit() {
    const res = await axios.patch(
      "https://localhost:44344/api/MassPatch",
      this.selectedRecords
    );
    this.records = res.data;
    this.rerender = !this.rerender;
  }
  async massDelete() {
    const res = await axios.post(
      "https://localhost:44344/api/MassDelete",
      this.selectedRecordsForDelete
    );
    this.records = res.data;
  }
  async Create(record) {
    const res = await axios.post("https://localhost:44344/api/Create", record);
    this.records = res.data;
  }
  areSelected() {
    if (this.selectedRecords.length > 1) return false;
    return true;
  }
  get hasError() {
    return this.error?.msg == "" ? false : true;
  }
}
decorate(Store, {
  records: observable,
  selectedRecords: observable,
  areSelected: observable,
  selectedRecordsForDelete: observable,
  massDelete: action,
  massEdit: action,
  Create: action,
  tick: action,
  rerender: observable,
  error: observable,
  hasError: computed,
});
export const recordContext = createContext(new Store());
