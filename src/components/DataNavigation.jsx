const DataNavigation = () =>{
    const currentDate = new Date ();
    return(
        <div className='date-navigation'>
        <button>prev</button>
        <span>{currentDate.toLocaleDateString("it-IT",{
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        })}</span>
        <button>next</button>
      </div> 
    )
}
export default DataNavigation