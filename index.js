let createEmployeeRecord = function(array) {
    return Object.assign(
        { firstName : array[0] }, 
        { familyName : array[1] }, 
        { title : array[2] }, 
        { payPerHour : array[3] }, 
        { timeInEvents : [] }, //date, hour, type
        { timeOutEvents : [] } //date, hour, type
    )
}

let createEmployeeRecords = function(array) {
    return array.map(employeeAttributes => createEmployeeRecord(employeeAttributes))
}

let createTimeInEvent = function(employee, dateStamp){
    let date = dateStamp.split(' ')[0]
    let hour = parseInt(dateStamp.split(' ')[1], 10)
    let type = "TimeIn"

    employee.timeInEvents.push({ date, hour, type })

    return employee
}

let createTimeOutEvent = function(employee, dateStamp){
    let date = dateStamp.split(' ')[0]
    let hour = parseInt(dateStamp.split(' ')[1], 10)
    let type = "TimeOut"

    employee.timeOutEvents.push({ date, hour, type })

    return employee
}

let hoursWorkedOnDate = function(employee, dateStamp) {
    // find timeInEvents array from given date
    let timeIn = employee.timeInEvents.find(function(element){
        return element.date === dateStamp
    })
    // find timeOutEvents array from given date  
    let timeOut = employee.timeOutEvents.find(function(element){
        return element.date === dateStamp
    })
    // get the hour, subtract, and divide to put into hours
    return (timeOut.hour - timeIn.hour) / 100
}


let wagesEarnedOnDate = function(employee, dateStamp) {
    let wage = hoursWorkedOnDate(employee, dateStamp) * employee.payPerHour
    return Number.parseFloat(wage)
}

// copied
let allWagesFor = function(employee) {
    //create a new array of dates
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })
    // use reduce to make date array equal a value based on the above
    let payable = eligibleDates.reduce(function(total, day){
        return total + wagesEarnedOnDate(employee, day)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(function(employee) {
        return employee.firstName === firstName
    })
}

let calculatePayroll = function(employees) {        
   let allWages = employees.reduce(function(total, employee){
        return allWagesFor(employee) + total     
    }, 0)

return allWages
}