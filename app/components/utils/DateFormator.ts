const DateFormator = (props:Date, sys: string)=>{

    const monthArray =['Jan', 'Feb', 'Mar', 'Apr', "May", "Jun", 'Jul', 'Aug', "Sep", "Oct", "Nov "]

    const dob = new Date(props)
    const date = dob.getDate()
    const month  = dob.getMonth()
    const year = dob.getFullYear()

    let formattedTime = dob.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true // Set to true for 12-hour format with AM/PM
    });
    if(sys==="full"){
      return `${date}-${month+1}-${year}, ${formattedTime}`
    }else{
      return `${date}, ${monthArray[month]} ${year}, ${formattedTime}`
    } 
}

export default DateFormator
