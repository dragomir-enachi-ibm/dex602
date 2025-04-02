public with sharing class CourseDeliveryLocations {
	public CourseDeliveryLocations() {
	}

	@AuraEnabled(cacheable=true)
	public static List<AggregateResult> getLocations() {
		return [SELECT Location__c, COUNT(Id) numDeliveries FROM Course_Delivery__c WHERE Location__c != NULL WITH SECURITY_ENFORCED GROUP BY Location__c];
	}
}
