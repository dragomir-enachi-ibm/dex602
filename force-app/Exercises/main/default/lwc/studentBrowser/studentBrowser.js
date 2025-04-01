import { LightningElement, wire } from "lwc";
import getStudents from "@salesforce/apex/StudentBrowser.getStudents";

export default class StudentBrowser extends LightningElement {
	@wire(getStudents, { instructorId: "", courseDeliveryId: "" })
	students;

	constructor() {
		super();
		const studentNames = ["Rad", "Stuart", "Andres", "Rahul", "Amit", "Simon"];
	}
}
