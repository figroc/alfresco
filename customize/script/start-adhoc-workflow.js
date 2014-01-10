function workflowPriority(taskPriority) {
    if (taskPriority === "High") {
        taskPriority = "1";
    } else if (taskPriority === "Normal") {
        taskPriority = "2";
    } else if (taskPriority === "Low") {
        taskPriority = "3";
    } else if (taskPriority > 3 || taskPriority < 1) {
        taskPriority = "3";
    } 
    return taskPriority;
}

function main() {
    var person = document.assocs["dl:taskAssignee"];
    if (person != null) {
        person = person[0];
    }
    if (person != null) {
        var status = document.properties["dl:taskStatus"];
        if (status != "Complete") {
            var username = person.properties["cm:userName"];
            var workflow = actions.create("start-workflow");
            workflow.parameters.workflowName = "activiti$activitiAdhoc";
            workflow.parameters["bpm:workflowDescription"] = document.properties.title;
            workflow.parameters["bpm:assignee"] = people.getPerson(username);
            workflow.parameters["bpm:workflowDueDate"] = document.properties["dl:ganttEndDate"]; 
            workflow.parameters["bpm:workflowPriority"] = workflowPriority(document.properties["dl:taskPriority"]);
            workflow.parameters["bpm:sendEMailNotifications"] = true;
            workflow.execute(document);
        }
    } 
}

main();