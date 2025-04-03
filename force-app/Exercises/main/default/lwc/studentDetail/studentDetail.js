import { LightningElement, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import FIELD_Name from "@salesforce/schema/Contact.Name";
import FIELD_Description from "@salesforce/schema/Contact.Description";
import FIELD_Email from "@salesforce/schema/Contact.Email";
import FIELD_Phone from "@salesforce/schema/Contact.Phone";
import { subscribe, unsubscribe, MessageContext } from "lightning/messageService";
import SELECTED_STUDENT_CHANNEL from "@salesforce/messageChannel/SelectedStudentChannel__c";
import Utils from "c/utils";

const fields = [FIELD_Email, FIELD_Phone, FIELD_Description, FIELD_Name];

export default class StudentDetail extends LightningElement {
	studentId;
	subscription;

	@wire(getRecord, { recordId: "$studentId", fields })
	wiredStudent;

	@wire(MessageContext) messageContext;

	connectedCallback() {
		if (this.subscription) {
			return;
		}
		this.subscription = subscribe(this.messageContext, SELECTED_STUDENT_CHANNEL, (message) => {
			this.handleStudentChange(message);
		});
	}

	disconnectedCallback() {
		unsubscribe(this.subscription);
		this.subscription = null;
	}

	handleStudentChange(message) {
		this.studentId = message.studentId;
	}

	get name() {
		return Utils.getDisplayValue(this.wiredStudent.data, FIELD_Name);
	}

	get description() {
		return Utils.getDisplayValue(this.wiredStudent.data, FIELD_Description);
	}

	get phone() {
		return Utils.getDisplayValue(this.wiredStudent.data, FIELD_Phone);
	}

	get email() {
		return Utils.getDisplayValue(this.wiredStudent.data, FIELD_Email);
	}

	get cardTitle() {
		let title = "Please select a student";
		if (this.wiredStudent.data) {
			title = this.name;
		} else if (this.wiredStudent.error) {
			title = "Something went wrong...";
		}
		return title;
	}
}
