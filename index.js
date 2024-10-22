function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(employeeDataArray) {
    return employeeDataArray.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, dateTimeStamp) {
    const [date, hour] = dateTimeStamp.split(" ");
    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(hour), //expects time will always have zero minutes, not just hours
        date: date,
    }
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateTimeStamp) {
    const [date, time] = dateTimeStamp.split(" ");
    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(time),  // Assign the hour value
        date: date,  // Assign the date value
    }
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;

    return hoursWorked;
}

function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payOwed = hoursWorked * employeeRecord.payPerHour;
    return payOwed;
}

function allWagesFor(employeeRecord) {
    return employeeRecord.timeInEvents.reduce((allWages, timeInEvent) => {
        return wagesEarnedOnDate(employeeRecord, timeInEvent.date) + allWages
    }, 0)
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPaychecks, employeeRecord) => {
        return allWagesFor(employeeRecord) + totalPaychecks
    }, 0)
}
